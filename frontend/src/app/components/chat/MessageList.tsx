'use client';

import { MessageListProps } from './types';
import { ChatMessage } from './ChatMessage';

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="chat-container h-[60vh] overflow-y-auto p-4">
      {messages.map(message => (
        <ChatMessage
          key={message.id}
          message={message}
          onCopy={(content) => navigator.clipboard.writeText(content)}
          onEdit={(message) => {}} // These will be implemented in the container component
          onDelete={(id) => {}}
          isEditing={false}
          editContent=""
          onEditChange={() => {}}
          onSaveEdit={() => {}}
        />
      ))}
    </div>
  );
};
