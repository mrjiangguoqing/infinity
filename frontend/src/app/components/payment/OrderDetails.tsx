// src/components/payment/OrderDetails.tsx
'use client';

import { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetailsProps {
  // 如果需要从父组件传入props可以在这里定义
}

export function OrderDetails({}: OrderDetailsProps) {
  // 模拟订单数据，实际应该从API获取
  const [orderData] = useState<{
    orderNo: string;
    items: OrderItem[];
    totalAmount: number;
    createTime: string;
  }>({
    orderNo: 'ORD' + Date.now().toString().slice(-8),
    items: [
      {
        id: '1',
        name: '商品名称示例',
        price: 299.00,
        quantity: 1
      }
    ],
    totalAmount: 299.00,
    createTime: new Date().toLocaleString()
  });

  return (
    <div className="space-y-4">
      {/* 订单基本信息 */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>订单编号：{orderData.orderNo}</span>
        <span>下单时间：{orderData.createTime}</span>
      </div>

      {/* 商品列表 */}
      <div className="border-t border-gray-200 pt-4">
        {orderData.items.map(item => (
          <div key={item.id} className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-4">
              {/* 商品图片 */}
              <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">数量：{item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">¥{item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 订单总计 */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">商品总计</span>
          <span className="font-medium">¥{orderData.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500">运费</span>
          <span className="font-medium">¥0.00</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-lg">
          <span className="font-medium">应付总额</span>
          <span className="font-semibold text-red-500">¥{orderData.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}