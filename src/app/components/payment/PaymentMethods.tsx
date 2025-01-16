'use client';
import { useState } from 'react';

const paymentMethods = [
  { id: 'alipay', name: '支付宝', icon: '/icons/alipay.svg' },
  { id: 'wechat', name: '微信支付', icon: '/icons/wechat.svg' },
  { id: 'unionpay', name: '银联', icon: '/icons/unionpay.svg' },
];

export function PaymentMethodSelector() {
  const [selected, setSelected] = useState<string>('alipay');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">选择支付方式</h3>
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`
              flex items-center p-4 border rounded-lg cursor-pointer
              ${selected === method.id ? 'border-blue-500 bg-blue-50' : ''}
            `}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={(e) => setSelected(e.target.value)}
              className="hidden"
            />
            <img src={method.icon} alt={method.name} className="w-8 h-8" />
            <span className="ml-3">{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}