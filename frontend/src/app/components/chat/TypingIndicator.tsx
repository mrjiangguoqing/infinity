'use client';

import { TypingIndicatorProps } from './types';

export const TypingIndicator = ({ isTyping }: TypingIndicatorProps) => {
  if (!isTyping) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white p-2 rounded-lg shadow-md">
      Typing...
    </div>
  );
};
