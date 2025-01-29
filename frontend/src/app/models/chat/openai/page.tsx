//目前直接简单点，针对不同的模型，复制一个page。让后改下对应的路由就行了。
'use client';

import { ChatContainer } from '@/app/components/chat/ChatContainer';

export default function DeepSeekChat() {
  return <ChatContainer />;
}
