package alipay

import (
	"context"

	"example.com/m/payment/core"

	"github.com/smartwalle/alipay/v3"
)

type AliPay struct {
	client *alipay.Client
	config *core.ChannelConfig
}

func NewAliPay(config *core.ChannelConfig) (*AliPay, error) {
	client, err := alipay.New(config.AppID, config.Key, true) // 暂时固定为调试模式
	if err != nil {
		return nil, err
	}

	// 加载证书
	if err := client.LoadAppPublicCertFromFile(config.CertPath); err != nil {
		return nil, err
	}

	return &AliPay{
		client: client,
		config: config,
	}, nil
}

func (a *AliPay) Pay(ctx context.Context, req *core.PaymentRequest) (*core.PaymentResponse, error) {
	// TODO: 实现支付宝支付逻辑
	return &core.PaymentResponse{}, nil
}

func (a *AliPay) Query(ctx context.Context, paymentNo string) (*core.PaymentStatus, error) {
	// TODO: 实现支付宝查询逻辑
	return &core.PaymentStatus{}, nil
}

func (a *AliPay) Refund(ctx context.Context, req *core.RefundRequest) error {
	// TODO: 实现支付宝退款逻辑
	return nil
}
