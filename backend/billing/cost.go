//模型交互是不是可以直接通过前端进行而不需要后端，这样可能只需要复制一份数据。

// sql记录下用户每次调用模型所产生的费用就行。
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 全局队列配置
const (
	MaxQueueSize = 10000
	WorkerNum    = 50
)

var (
	taskQueue   = make(chan BillingTask, MaxQueueSize)
	stopChan    = make(chan struct{})
	wg          sync.WaitGroup
	db          *gorm.DB
	batchBuffer []BillingRecord
	batchMutex  sync.Mutex
)

const (
	batchSize          = 100
	batchFlushInterval = 30 * time.Second
)

// BillingRecord 定义计费记录结构
type BillingRecord struct {
	gorm.Model
	UserID    string  `gorm:"index"`
	ModelName string  `gorm:"size:100;column:model"` // 重命名解决冲突
	Cost      float64 `gorm:"type:decimal(10,6)"`
	Timestamp time.Time
}

// BillingTask 定义计费任务结构
type BillingTask struct {
	UserID           string
	Model            string `gorm:"size:100"`
	PromptTokens     int
	CompletionTokens int
	TotalTokens      int
	Timestamp        time.Time
}

// processTask 处理计费任务的核心逻辑
func processTask(task BillingTask) {
	cost := calculateCost(task)
	record := BillingRecord{
		UserID:    task.UserID,
		ModelName: task.Model,
		Cost:      cost,
		Timestamp: time.Now(),
	}

	batchMutex.Lock()
	batchBuffer = append(batchBuffer, record)
	if len(batchBuffer) >= batchSize {
		if err := flushBatch(); err != nil {
			log.Printf("批量写入失败: %v", err)
		}
	}
	batchMutex.Unlock()
}

// InitWorkers 初始化工作协程池
func InitWorkers() {
	for i := 0; i < WorkerNum; i++ {
		wg.Add(1)
		go worker()
	}
}

func worker() {
	defer wg.Done()
	for {
		select {
		case task := <-taskQueue:
			processTask(task)
		case <-stopChan:
			return
		}
	}
}

func calculateCost(task BillingTask) float64 {
	// 根据模型类型获取定价
	var rate struct {
		Prompt     float64
		Completion float64
	}

	switch task.Model {
	case "gpt-4":
		rate.Prompt = 0.03
		rate.Completion = 0.06
	case "deepseek":
		rate.Prompt = 0.01
		rate.Completion = 0.02
	default:
		rate.Prompt = 0.02
		rate.Completion = 0.04
	}

	return (float64(task.PromptTokens)/1000)*rate.Prompt +
		(float64(task.CompletionTokens)/1000)*rate.Completion
}

// ModelResponse 定义模型返回的数据结构
type ModelResponse struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	RequestID string `json:"request_id"`
	Object    string `json:"object"`
	Created   int    `json:"created"`
	Model     string `json:"model"`
	Usage     struct {
		PromptTokens     int `json:"prompt_tokens"`
		CompletionTokens int `json:"completion_tokens"`
		TotalTokens      int `json:"total_tokens"`
	} `json:"usage"`
	Choices []struct {
		Message struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"message"`
		FinishReason string `json:"finish_reason"`
		Index        int    `json:"index"`
	} `json:"choices"`
}

// CalculateCostFromJSON 从 JSON 数据中解析 usage 并计算费用
func CalculateCostFromJSON(jsonData string, pricePerThousandTokens float64, promptPricePerThousandTokens float64, completionPricePerThousandTokens float64) {
	// 解析 JSON 数据
	var response ModelResponse
	err := json.Unmarshal([]byte(jsonData), &response)
	if err != nil {
		fmt.Println("解析 JSON 失败:", err)
		return
	}

	// 计算费用（按总 token 计算）
	totalCost := (float64(response.Usage.TotalTokens) / 1000) * pricePerThousandTokens
	fmt.Printf("总费用（按总 token 计算）: $%.6f\n", totalCost)

	// 计算费用（区分输入和输出 token 计算）
	promptCost := (float64(response.Usage.PromptTokens) / 1000) * promptPricePerThousandTokens
	completionCost := (float64(response.Usage.CompletionTokens) / 1000) * completionPricePerThousandTokens
	detailedCost := promptCost + completionCost
	fmt.Printf("总费用（区分输入和输出 token 计算）: $%.6f\n", detailedCost)
}

func flushBatch() error {
	batchMutex.Lock()
	defer batchMutex.Unlock()

	if len(batchBuffer) == 0 {
		return nil
	}

	if err := db.Create(&batchBuffer).Error; err != nil {
		return err
	}

	// 清空缓冲区但保持底层数组避免重复分配
	batchBuffer = batchBuffer[:0]
	return nil
}

func main() {
	// 初始化数据库连接
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"))

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	// 自动迁移数据库表
	if err := db.AutoMigrate(&BillingTask{}, &BillingRecord{}); err != nil {
		log.Fatalf("数据库迁移失败: %v", err)
	}

	// 启动定时刷新任务
	go func() {
		ticker := time.NewTicker(batchFlushInterval)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				batchMutex.Lock()
				if len(batchBuffer) > 0 {
					if err := flushBatch(); err != nil {
						log.Printf("定时批量写入失败: %v", err)
					}
				}
				batchMutex.Unlock()
			case <-stopChan:
				return
			}
		}
	}()

	// 初始化工作池
	InitWorkers()

	// 设置优雅关闭
	server := &http.Server{
		Addr:    ":8080",
		Handler: nil,
	}

	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM)
		<-sigint

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		close(stopChan)
		wg.Wait()

		if err := server.Shutdown(ctx); err != nil {
			log.Printf("HTTP服务器关闭错误: %v", err)
		}
	}()

	log.Println("服务启动，监听端口 8080...")
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("HTTP服务器错误: %v", err)
	}
}
