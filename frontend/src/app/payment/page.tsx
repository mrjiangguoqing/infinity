// app/payment/page.tsx
'use client';
import { useState } from 'react';
import { PaymentMethodSelector } from '@/app/components/payment/PaymentMethods';
import { OrderDetails } from "../components/payment/OrderDetails";
import { PaymentSteps } from '../components/payment/PaymentSteps';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: '12345', // TODO: 替换为实际订单ID
          paymentMethod: 'alipay', // TODO: 替换为选择的支付方式
          amount: 100.00 // TODO: 替换为实际金额
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '支付失败');
      }

      setCurrentStep(3);
      router.push(`/payment/success?orderId=${data.orderId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('支付过程中发生未知错误');
      }
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 支付步骤 */}
      <PaymentSteps currentStep={currentStep} />

      {/* 订单信息 */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">订单信息</h2>
        <OrderDetails />
      </section>

      {/* 支付方式 */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <PaymentMethodSelector />
      </section>

      {/* 错误信息 */}
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      {/* 支付按钮 */}
      <div className="flex justify-end">
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className={`
            bg-blue-500 text-white px-8 py-3 rounded-lg
            hover:bg-blue-600 transition-colors
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? '支付中...' : '立即支付'}
        </button>
      </div>
    </div>
    );
  }
