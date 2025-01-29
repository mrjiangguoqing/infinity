'use client';

import { Button, Input, Card } from '@nextui-org/react';
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { ChatMessageProps } from './types';
import { CodeBlock } from './CodeBlock';

export const ChatMessage = ({
  message,
  onCopy,
  onEdit,
  onDelete,
  isEditing,
  editContent,
  onEditChange,
  onSaveEdit
}: ChatMessageProps) => {
  const formatCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;
  
    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
  
      const language = match[1] || 'text';
      const code = match[2];
      parts.push(
        <CodeBlock
          key={`code-${match.index}`}
          code={code}
          language={language}
        />
      );
  
      lastIndex = match.index + match[0].length;
    }
  
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
  
    return parts;
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-[80%]">
        <Card>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {message.role === 'user' ? 'You' : 'AI'}
              </div>
              <span className="ml-2 font-bold">
                {message.role === 'user' ? 'You' : 'AI'}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : ''}
              </span>
            </div>
            
            {isEditing ? (
              <div className="flex items-center">
                <Input
                  value={editContent}
                  onChange={(e) => onEditChange(e.target.value)}
                  className="flex-1"
                />
                <Button className="ml-2" onClick={() => onSaveEdit(message.id)}>
                  Save
                </Button>
              </div>
            ) : (
              <div>{formatCodeBlocks(message.content)}</div>
            )}
            
            <div className="flex justify-end mt-2">
              <Button isIconOnly variant="light" onClick={() => onCopy(message.content)}>
                <FiCopy />
              </Button>
              {message.role === 'user' && (
                <>
                  <Button isIconOnly variant="light" onClick={() => onEdit(message)}>
                    <FiEdit2 />
                  </Button>
                  <Button isIconOnly color="danger" variant="light" onClick={() => onDelete(message.id)}>
                    <FiTrash2 />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
