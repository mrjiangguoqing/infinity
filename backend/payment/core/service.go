package core

import (
	"context"
	"sync"
)

type paymentService struct {
	config   *PaymentConfig
	channels map[string]PaymentChannel
	mu       sync.RWMutex
}

// NewPaymentService 创建支付服务实例
func NewPaymentService(config *PaymentConfig) PaymentService {
	return &paymentService{
		config:   config,
		channels: make(map[string]PaymentChannel),
	}
}

func (s *paymentService) Pay(ctx context.Context, req *PaymentRequest) (*PaymentResponse, error) {
	s.mu.RLock()
	channel, ok := s.channels[req.Channel]
	s.mu.RUnlock()

	if !ok {
		return nil, ErrChannelNotSupport
	}

	return channel.Pay(ctx, req)
}

func (s *paymentService) Query(ctx context.Context, paymentNo string) (*PaymentStatus, error) {
	// TODO: 实现支付查询逻辑
	return &PaymentStatus{}, nil
}

func (s *paymentService) Refund(ctx context.Context, req *RefundRequest) error {
	// TODO: 实现退款逻辑
	return nil
}

// RegisterChannel 注册支付渠道
func (s *paymentService) RegisterChannel(channel string, impl PaymentChannel) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.channels[channel] = impl
}

// PaymentChannel 支付渠道接口
type PaymentChannel interface {
	Pay(ctx context.Context, req *PaymentRequest) (*PaymentResponse, error)
	Query(ctx context.Context, paymentNo string) (*PaymentStatus, error)
	Refund(ctx context.Context, req *RefundRequest) error
}
