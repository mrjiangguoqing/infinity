package api

import (
	"example.com/m/payment/core"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func SetupRouter(service core.PaymentService) *gin.Engine {
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	handler := NewPaymentHandler(service, logger)

	router := gin.Default()

	// 支付相关路由
	paymentGroup := router.Group("/api/payment")
	{
		paymentGroup.POST("/create", handler.CreatePayment)
		paymentGroup.GET("/query/:paymentNo", handler.QueryPayment)
		paymentGroup.POST("/refund", handler.RefundPayment)
	}

	return router
}
