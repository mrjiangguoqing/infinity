'use server';

import { NextResponse } from 'next/server';
import { logger } from '../../../../utils/logger';

// 类型定义
interface TokenUsageRequest {
  userId: string;
  modelId: string;
  tokens: number;
}

// 记录token使用
export async function POST(request: Request) {
  try {
    const body: TokenUsageRequest = await request.json();

    // 验证请求数据
    if (!body.userId || !body.modelId || !body.tokens) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 调用后端API
    const response = await fetch('http://localhost:8080/api/v1/token/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: body.userId,
        model_id: body.modelId,
        tokens: body.tokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    logger.info('Token usage recorded successfully', { userId: body.userId, tokens: body.tokens });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Error recording token usage', { error });
    return NextResponse.json(
      { error: 'Failed to record token usage' },
      { status: 500 }
    );
  }
}

// 获取token使用记录
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // 模拟返回数据
    const mockUsages = {
      usages: [
        {
          user_id: userId,
          model_id: 'deepseek-chat',
          tokens: 100,
          timestamp: new Date().toISOString()
        }
      ],
      balance: 1000
    };

    logger.info('Token usage retrieved successfully', { userId });
    return NextResponse.json(mockUsages);
  } catch (error) {
    logger.error('Error retrieving token usage', { error });
    return NextResponse.json(
      { error: 'Failed to retrieve token usage' },
      { status: 500 }
    );
  }
}
