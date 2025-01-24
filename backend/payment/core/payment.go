package core

import (
	"context"
	"errors"
)

// PaymentRequest 支付请求参数
type PaymentRequest struct {
	Amount      int64  // 支付金额（分）
	OrderNo     string // 订单号
	Channel     string // 支付渠道
	Description string // 商品描述
	ClientIP    string // 客户端IP
	NotifyURL   string // 回调地址
}

// PaymentResponse 支付响应
type PaymentResponse struct {
	PaymentNo string // 支付单号
	PayURL    string // 支付链接（用于扫码支付）
	QRCode    string // 二维码内容
}

// PaymentService 支付服务接口
type PaymentService interface {
	Pay(ctx context.Context, req *PaymentRequest) (*PaymentResponse, error)
	Query(ctx context.Context, paymentNo string) (*PaymentStatus, error)
	Refund(ctx context.Context, req *RefundRequest) error
}

// PaymentStatus 支付状态
type PaymentStatus struct {
	PaymentNo string
	Status    string
	PaidAt    int64
}

// RefundRequest 退款请求
type RefundRequest struct {
	PaymentNo string
	Amount    int64
	Reason    string
}

var (
	ErrInvalidAmount     = errors.New("invalid payment amount")
	ErrChannelNotSupport = errors.New("payment channel not support")
)
