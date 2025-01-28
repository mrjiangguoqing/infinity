'use server';
import { logger } from '../../../../utils/logger';
import { deepseek } from '@ai-sdk/deepseek';
import { type Message, streamText } from 'ai';
import { NextResponse } from 'next/server';

interface CompletionResult {
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function POST(request: Request) {
  try {
    logger.info('开始处理新的请求');

    const {
      id,
      messages,
      modelId,
    }: { id: string; messages: Array<Message>; modelId: string } =
      await request.json();

    // 检查余额
    try {
      logger.info('Checking balance for user', { userId: id });
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const host = request.headers.get('host') || 'localhost:3000';
      const balanceResponse = await fetch(`${protocol}://${host}/api/token?userId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!balanceResponse.ok) {
        const errorText = await balanceResponse.text();
        throw new Error(`Failed to check balance: ${balanceResponse.status} ${errorText}`);
      }

      const balanceData = await balanceResponse.json();
      logger.info('Balance check result', { balanceData });
      
      // 检查余额是否充足（假设每次请求至少需要100 tokens）
      const minimumRequired = 100;
      if (balanceData.balance < minimumRequired) {
        logger.warn('Insufficient balance', { 
          userId: id, 
          balance: balanceData.balance,
          required: minimumRequired 
        });
        return NextResponse.json(
          { 
            error: 'Insufficient balance',
            balance: balanceData.balance,
            required: minimumRequired
          },
          { status: 402 }
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      logger.error('Error checking balance', { 
        error: errorMessage,
        stack: errorStack,
        userId: id
      });
      // 如果余额检查失败，我们仍然继续处理请求
    }

    const result = streamText({
      model: deepseek('deepseek-chat'),
      prompt: 'this is a test.',
      onFinish: async (result) => {
        try {
          logger.info('Usage:', {
            promptTokens: result.usage.promptTokens,
            completionTokens: result.usage.completionTokens,
            totalTokens: result.usage.totalTokens
          });

          // 记录token使用
          const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
          const host = request.headers.get('host') || 'localhost:3000';
          const tokenResponse = await fetch(`${protocol}://${host}/api/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: id,
              modelId: modelId,
              tokens: result.usage.totalTokens
            })
          });

          if (!tokenResponse.ok) {
            throw new Error('Failed to record token usage');
          }

          logger.info('Token usage recorded successfully', {
            userId: id,
            modelId: modelId,
            tokens: result.usage.totalTokens
          });
        } catch (error) {
          logger.error('Error recording token usage', { error });
          // 即使token记录失败，我们也不中断响应
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    logger.error('Error processing request', { error });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
