'use client';

import React, { useState } from 'react';
import ChatLayout from '../layout';

export default function ChatPage() {
  const [input, setInput] = useState('');

  return (
    <ChatLayout 
      currentModel="Chat Model"
      onSendMessage={(e) => {
        e.preventDefault();
        console.log('Message sent:', input);
      }}
      onNewChat={() => console.log('New chat')}
      inputValue={input}
      onInputChange={(e) => setInput(e.target.value)}
    >
      示例消息内容区域
    </ChatLayout>
  );
}
