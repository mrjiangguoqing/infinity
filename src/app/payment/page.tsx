// app/payment/page.tsx
import PaymentLayout from "./layout"
import { PaymentMethodSelector } from '@/app/components/payment/PaymentMethods';
import { OrderDetails } from "../components/payment/OrderDetails"; 

export default function PaymentPage() {
    return (
      <div className="space-y-8">
        {/* 订单信息 */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">订单信息</h2>
          <OrderDetails />
        </section>
  
        {/* 支付方式 */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <PaymentMethodSelector />
        </section>
  
        {/* 支付按钮 */}
        <div className="flex justify-end">
          <button className="
            bg-blue-500 text-white px-8 py-3 rounded-lg
            hover:bg-blue-600 transition-colors
          ">
            立即支付
          </button>
        </div>
      </div>
    );
  }
  