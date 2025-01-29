'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FiPaperclip } from 'react-icons/fi';
import data from '@emoji-mart/data';
import dynamic from 'next/dynamic';
import { ChatInputProps } from './types';

const Picker = dynamic(() => import('@emoji-mart/react').then((mod) => mod.default), { ssr: false });

export const ChatInput = ({
  input,
  onInputChange,
  onKeyDown,
  onSubmit,
  onEmojiSelect,
  onFileChange,
  selectedFile,
  onFileRemove
}: ChatInputProps) => {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="p-4 border-t">
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex items-center">
          <Input
            value={input}
            placeholder="Type your message..."
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            className="flex-1"
          />
          
          <Popover isOpen={showEmoji} onOpenChange={setShowEmoji}>
            <PopoverTrigger>
              <Button isIconOnly variant="light">
                😊
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Picker 
                data={data} 
                onEmojiSelect={onEmojiSelect} 
                theme="light" 
              />
            </PopoverContent>
          </Popover>
          
          <Button isIconOnly variant="light" as="label" htmlFor="file-input">
            <FiPaperclip />
          </Button>
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
        
        {selectedFile && (
          <div className="flex items-center mt-2">
            <span>{selectedFile.name}</span>
            <Button 
              isIconOnly 
              color="danger" 
              variant="light" 
              className="ml-2" 
              onClick={onFileRemove}
            >
              ✕
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
