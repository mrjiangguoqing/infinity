import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { orderId, paymentMethod, amount } = await request.json();

  try {
    // 调用后端支付接口
    const backendResponse = await fetch('http://localhost:8080/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        paymentMethod,
        amount,
      }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || '支付失败' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: '支付请求失败，请稍后重试' },
      { status: 500 }
    );
  }
}
