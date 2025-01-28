package billing

import (
	"time"

	"gorm.io/gorm"
)

// TokenUsage 记录token使用情况的数据结构
type TokenUsage struct {
	ID        uint      `gorm:"primarykey"`
	UserID    string    `gorm:"index"`
	ModelID   string    
	Tokens    int       
	CreatedAt time.Time
}

// TokenService 处理token使用记录的服务
type TokenService struct {
	db *gorm.DB
}

// NewTokenService 创建TokenService实例
func NewTokenService(db *gorm.DB) *TokenService {
	return &TokenService{
		db: db,
	}
}

// RecordUsage 记录token使用情况
func (s *TokenService) RecordUsage(userID string, modelID string, tokens int) error {
	usage := &TokenUsage{
		UserID:    userID,
		ModelID:   modelID,
		Tokens:    tokens,
		CreatedAt: time.Now(),
	}
	return s.db.Create(usage).Error
}

// GetUserUsage 获取用户的token使用情况
func (s *TokenService) GetUserUsage(userID string) ([]TokenUsage, error) {
	var usages []TokenUsage
	err := s.db.Where("user_id = ?", userID).Find(&usages).Error
	return usages, err
}
