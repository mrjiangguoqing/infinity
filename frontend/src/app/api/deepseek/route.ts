import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek('deepseek-chat'),
    messages,
  });

  return result.toDataStreamResponse();
  
}









//可以参考的代码段
/*
const input = {
  model: google("gemini-1.5-flash", {}),
  system: prompt,
  messages: convertToCoreMessages(messages),
  onFinish: async (data: any) => {
    console.log("onFinish", data)
    const message = await prisma.message.create({
      data: {
        content: await data.text,
        chatId,
        role: Role.system,
      },
    })
    // Trigger a Pusher event
    await pusherServer.trigger(`chat-${chatId}`, "new-message", message)
  },

*/