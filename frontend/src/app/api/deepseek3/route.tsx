import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

try {
  const openaiResponse = await streamText({
    model: deepseek('deepseek-chat'),
    prompt: 'Tell a joke',
    onFinish(event) {
      console.log('onFinish', event.usage);
    },
  });
  for await (const chunk of openaiResponse.fullStream) {
  }
} catch (e) {
  console.error(e);
}