'use client';

interface PaymentSuccessProps {
  orderId: string;
}

export function PaymentSuccess({ orderId }: PaymentSuccessProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-semibold">支付成功</h2>
        <p className="mt-2 text-gray-600">
          您的订单 {orderId} 已支付成功
        </p>
        <div className="mt-6">
          <a
            href="/orders"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            查看订单详情
          </a>
        </div>
      </div>
    </div>
  );
}
