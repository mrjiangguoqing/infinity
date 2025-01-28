package billing

import (
	"github.com/gin-gonic/gin"
)

// TokenRequest 接收token记录请求的结构
type TokenRequest struct {
	UserID  string `json:"user_id"`
	ModelID string `json:"model_id"`
	Tokens  int    `json:"tokens"`
}

// RecordToken 记录token使用
func RecordToken(c *gin.Context) {
	var req TokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	if req.UserID == "" || req.ModelID == "" || req.Tokens <= 0 {
		c.JSON(400, gin.H{"error": "Invalid request parameters"})
		return
	}

	// 获取TokenService实例
	tokenService := c.MustGet("tokenService").(*TokenService)
	
	err := tokenService.RecordUsage(req.UserID, req.ModelID, req.Tokens)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"success": true})
}

// GetTokenUsage 获取token使用记录
func GetTokenUsage(c *gin.Context) {
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(400, gin.H{"error": "User ID is required"})
		return
	}

	// 获取TokenService实例
	tokenService := c.MustGet("tokenService").(*TokenService)

	usages, err := tokenService.GetUserUsage(userID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, usages)
}

// 设置路由
func SetupRoutes(r *gin.Engine, tokenService *TokenService) {
	// 添加tokenService到上下文
	r.Use(func(c *gin.Context) {
		c.Set("tokenService", tokenService)
		c.Next()
	})

	// 记录token使用
	r.POST("/api/v1/token/record", RecordToken)

	// 获取token使用记录
	r.GET("/api/v1/token/usage", GetTokenUsage)
}
