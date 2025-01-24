// components/payment/OrderSummary.tsx
export function OrderSummary() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">订单摘要</h2>
        
        {/* 商品列表 */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>商品总价</span>
            <span>¥299.00</span>
          </div>
          <div className="flex justify-between">
            <span>运费</span>
            <span>¥10.00</span>
          </div>
          <div className="flex justify-between">
            <span>优惠</span>
            <span className="text-red-500">-¥30.00</span>
          </div>
        </div>
        
        {/* 分隔线 */}
        <div className="border-t my-4" />
        
        {/* 总计 */}
        <div className="flex justify-between font-semibold text-lg">
          <span>应付总额</span>
          <span className="text-red-500">¥279.00</span>
        </div>
      </div>
    );
  }
  