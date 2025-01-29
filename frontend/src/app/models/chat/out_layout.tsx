'use client';

import React, { ReactNode, FormEvent, ChangeEvent } from 'react';
import { Button, Input } from "@nextui-org/react";

interface ChatLayoutProps {
  children: ReactNode;
  currentModel: string;
  onSendMessage: (e: FormEvent) => void;
  onNewChat: () => void;
  inputValue: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ 
  children, 
  currentModel,
  onSendMessage,
  onNewChat,
  inputValue,
  onInputChange
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col h-full">
            <Button color="primary" onPress={onNewChat} className="mb-4">New Chat</Button>
            <div className="flex-1 overflow-auto">
              {/* Chat history will be implemented here */}
            </div>
            <div className="mt-4 pt-4 border-t">
              User Info
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="md:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">{currentModel}</h3>
            
            <div className="flex-1 overflow-auto min-h-[60vh]">
              {children}
            </div>

            <form onSubmit={onSendMessage} className="flex items-center pt-4">
              <Input
                className="flex-grow mr-2"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={onInputChange}
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
