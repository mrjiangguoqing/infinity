package core

import (
	"time"
)

// PaymentConfig 支付配置
type PaymentConfig struct {
	AppID       string          // 应用ID
	MchID       string          // 商户号
	Key         string          // 加密密钥
	CertPath    string          // 证书路径
	NotifyURL   string          // 回调地址
	Timeout     time.Duration   // 支付超时时间
	Debug       bool            // 调试模式
	ChannelCfgs []ChannelConfig // 渠道配置
}

// ChannelConfig 支付渠道配置
type ChannelConfig struct {
	Channel   string // 支付渠道
	AppID     string // 渠道应用ID
	MchID     string // 渠道商户号
	Key       string // 渠道密钥
	CertPath  string // 渠道证书路径
	NotifyURL string // 渠道回调地址
	Enabled   bool   // 是否启用
}

// LoadConfig 加载支付配置
func LoadConfig(path string) (*PaymentConfig, error) {
	// TODO: 实现配置加载逻辑
	return &PaymentConfig{}, nil
}
