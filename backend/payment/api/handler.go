package api

import (
	"example.com/m/payment/core"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type PaymentHandler struct {
	service core.PaymentService
	logger  *zap.Logger
}

func NewPaymentHandler(service core.PaymentService, logger *zap.Logger) *PaymentHandler {
	return &PaymentHandler{
		service: service,
		logger:  logger,
	}
}

// CreatePayment 创建支付订单
func (h *PaymentHandler) CreatePayment(c *gin.Context) {
	var req core.PaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Warn("invalid request", zap.Error(err))
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	resp, err := h.service.Pay(c.Request.Context(), &core.PaymentRequest{
		Amount:      int64(req.Amount * 100),
		OrderNo:     req.OrderNo,
		Channel:     req.Channel,
		Description: req.Description,
	})
	if err != nil {
		h.logger.Error("create payment failed", zap.Error(err))
		c.JSON(500, gin.H{"error": "internal error"})
		return
	}

	c.JSON(200, resp)
}

// QueryPayment 查询支付状态
func (h *PaymentHandler) QueryPayment(c *gin.Context) {
	paymentNo := c.Param("paymentNo")
	if paymentNo == "" {
		c.JSON(400, gin.H{"error": "paymentNo is required"})
		return
	}

	status, err := h.service.Query(c.Request.Context(), paymentNo)
	if err != nil {
		h.logger.Error("query payment failed",
			zap.String("paymentNo", paymentNo),
			zap.Error(err))
		c.JSON(500, gin.H{"error": "internal error"})
		return
	}

	c.JSON(200, status)
}

// RefundPayment 发起退款
func (h *PaymentHandler) RefundPayment(c *gin.Context) {
	var req core.RefundRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Warn("invalid refund request", zap.Error(err))
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	err := h.service.Refund(c.Request.Context(), &core.RefundRequest{
		PaymentNo: req.PaymentNo,
		Amount:    int64(req.Amount * 100),
		Reason:    req.Reason,
	})
	if err != nil {
		h.logger.Error("refund payment failed",
			zap.String("paymentNo", req.PaymentNo),
			zap.Error(err))
		c.JSON(500, gin.H{"error": "internal error"})
		return
	}

	c.JSON(200, gin.H{"message": "refund request accepted"})
}
