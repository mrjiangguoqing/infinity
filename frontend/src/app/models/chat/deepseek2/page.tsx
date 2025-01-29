'use client';

import { useChat } from 'ai/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import data from '@emoji-mart/data';
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('@emoji-mart/react').then((mod) => mod.default), { ssr: false });
import { FiCopy, FiEdit2, FiTrash2, FiPaperclip } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Button, Input, Card } from '@nextui-org/react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import ChatLayout from '../layout';

export default function DeepSeekChat() {
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: '/api/deepseek2',
    onResponse: () => setIsTyping(true),
    onFinish: () => setIsTyping(false),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, [setMessages]);
  const handleCopyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
  }, []);

  const handleEditMessage = useCallback((message: any) => {
    setEditingMessageId(message.id);
    setEditContent(message.content);
  }, []);
  
  const handleSaveEdit = useCallback((messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(m => m.id === messageId ? { ...m, content: editContent } : m)
    );
    setEditingMessageId(null);
    setEditContent('');
  }, [editContent, setMessages]);
  
  const handleDeleteMessage = useCallback((messageId: string) => {
    setMessages(prevMessages => prevMessages.filter(m => m.id !== messageId));
  }, [setMessages]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const formatCodeBlocks = useCallback((content: string) => {
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
        <SyntaxHighlighter
          key={`code-${match.index}`}
          language={language}
          style={tomorrow}
          className="my-2 rounded"
        >
          {code.trim()}
        </SyntaxHighlighter>
      );
  
      lastIndex = match.index + match[0].length;
    }
  
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
  
    return parts;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const value = inputHistory[inputHistory.length - 1 - newIndex];
        if (inputRef.current) {
          inputRef.current.value = value;
          handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const value = inputHistory[inputHistory.length - 1 - newIndex];
        if (inputRef.current) {
          inputRef.current.value = value;
          handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
        }
      } else {
        setHistoryIndex(-1);
        if (inputRef.current) {
          inputRef.current.value = '';
          handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    }
  }, [historyIndex, inputHistory, handleSubmit, handleInputChange, input]);

  const handleSendMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setInputHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      handleSubmit(e);
    }
  }, [handleSubmit, input]);

  const handleAddEmoji = useCallback((emoji: { native: string }) => {
    if (inputRef.current) {
      const newValue = input + emoji.native;
      handleInputChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
    }
    setShowEmoji(false);
  }, [handleInputChange, input]);

  // TypeScript type for the Message
  type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt?: number;
  };
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Card>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">Chat</h3>
          <Button onClick={handleClearChat}>
            Clear Chat
          </Button>
        </div>
        
        <div className="chat-container h-[60vh] overflow-y-auto p-4">
          {messages.map(m => (
            <div key={m.id} 
                 className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className="max-w-[80%]">
                <Card>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {m.role === 'user' ? 'You' : 'AI'}
                      </div>
                      <span className="ml-2 font-bold">
                        {m.role === 'user' ? 'You' : 'AI'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}
                      </span>
                    </div>
                    
                    {editingMessageId === m.id ? (
                      <div className="flex items-center">
                        <Input
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="flex-1"
                        />
                        <Button className="ml-2" onClick={() => handleSaveEdit(m.id)}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div>{formatCodeBlocks(m.content)}</div>
                    )}
                    
                    <div className="flex justify-end mt-2">
                      <Button isIconOnly variant="light" onClick={() => handleCopyMessage(m.content)}>
                        <FiCopy />
                      </Button>
                      {m.role === 'user' && (
                        <>
                          <Button isIconOnly variant="light" onClick={() => handleEditMessage(m)}>
                            <FiEdit2 />
                          </Button>
                          <Button isIconOnly color="danger" variant="light" onClick={() => handleDeleteMessage(m.id)}>
                            <FiTrash2 />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="w-full">
            <div className="flex items-center">
              <Input
                ref={inputRef}
                value={input}
                placeholder="Type your message..."
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              
              <Popover isOpen={showEmoji} onOpenChange={setShowEmoji}>
                <PopoverTrigger>
                  <Button isIconOnly variant="light">
                    😊
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Picker data={data} onEmojiSelect={handleAddEmoji} theme="light" />
                </PopoverContent>
              </Popover>
              
              <Button isIconOnly variant="light" as="label" htmlFor="file-input">
                <FiPaperclip />
              </Button>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            
            {selectedFile && (
              <div className="flex items-center mt-2">
                <span>{selectedFile.name}</span>
                <Button isIconOnly color="danger" variant="light" 
                        className="ml-2" 
                        onClick={() => setSelectedFile(null)}>
                  ✕
                </Button>
              </div>
            )}
          </form>
        </div>
      </Card>
      
      {isTyping && (
        <div className="fixed bottom-5 right-5">
          Typing...
        </div>
      )}
    </div>
  );
}
