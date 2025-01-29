'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeBlockProps } from './types';

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      className="my-2 rounded"
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
};
