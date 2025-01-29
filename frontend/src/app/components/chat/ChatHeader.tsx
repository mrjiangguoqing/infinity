'use client';

import { Button } from '@nextui-org/react';
import { ChatHeaderProps } from './types';

export const ChatHeader = ({ onClearChat }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-xl font-bold">Chat</h3>
      <Button onClick={onClearChat}>
        Clear Chat
      </Button>
    </div>
  );
};
