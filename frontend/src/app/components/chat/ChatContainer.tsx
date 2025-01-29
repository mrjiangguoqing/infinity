'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Card } from '@nextui-org/react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { Message } from './types';

export const ChatContainer = () => {
  const [isTyping, setIsTyping] = useState(false);
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

  const handleEditMessage = useCallback((message: Message) => {
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
  }, [handleInputChange, input]);

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
        <ChatHeader onClearChat={handleClearChat} />
        
        <MessageList
          messages={messages}
          onCopy={handleCopyMessage}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          isEditing={false}
          editContent={editContent}
          onEditChange={setEditContent}
          onSaveEdit={handleSaveEdit}
        />
        
        <ChatInput
          input={input}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSubmit={handleSendMessage}
          onEmojiSelect={handleAddEmoji}
          onFileChange={handleFileChange}
          selectedFile={selectedFile}
          onFileRemove={() => setSelectedFile(null)}
        />
      </Card>
      
      <TypingIndicator isTyping={isTyping} />
    </div>
  );
};
