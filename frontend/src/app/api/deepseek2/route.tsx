'use server';
import { logger } from '../../../../utils/logger';

import { deepseek } from '@ai-sdk/deepseek';


import {
    type Message,
    streamText,
  } from 'ai';


  interface CompletionResult {
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

export async function POST(request: Request) {
  logger.info('开始处理新的请求');

    const {
        id,
        messages,
        modelId,
      }: { id: string; messages: Array<Message>; modelId: string } =
        await request.json();

const  result  = streamText({
  model: deepseek('deepseek-chat'),
  prompt: 'this is a test.',
  onFinish: async (result) => {
    logger.info('Usage:', {
      promptTokens: result.usage.promptTokens,
      completionTokens: result.usage.completionTokens,
      totalTokens: result.usage.totalTokens
    });
  }
});

return result.toDataStreamResponse();

}

