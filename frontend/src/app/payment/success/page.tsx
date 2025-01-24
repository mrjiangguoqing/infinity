import { Suspense } from 'react';
import { PaymentSuccess } from '@/app/components/payment/PaymentSuccess';

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const orderId = searchParams.orderId as string;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Suspense fallback={<div>加载中...</div>}>
        <PaymentSuccess orderId={orderId} />
      </Suspense>
    </div>
  );
}
