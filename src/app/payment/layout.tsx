
import { Logo } from '@/app/components/common/Logo';
import { PaymentSteps } from '@/app/components/payment/PaymentSteps';
import { OrderSummary } from '@/app/components/payment/OrderSummary';
import { SecurityBadges } from '@/app/components/payment/SecurityBadges';
import { PaymentMethodSelector } from '@/app/components/payment/PaymentMethods';

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center">
          <Logo />
          <div className="ml-auto">
            <PaymentSteps currentStep={1} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-grow max-w-2xl">
            {children}
          </div>
          
          <div className="w-80 flex-shrink-0">
            <OrderSummary />
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t bg-white">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
          <SecurityBadges />
          <PaymentMethodSelector />
        </div>
      </footer>
    </div>
  );
}