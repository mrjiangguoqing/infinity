export type Message = {
  id: string;
  role: 'system' | 'user' | 'assistant' | 'data';
  content: string;
  createdAt?: Date;
};

export interface ChatHeaderProps {
  onClearChat: () => void;
}

export interface MessageListProps {
  messages: Message[];
  onCopy: (content: string) => void;
  onEdit: (message: Message) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editContent: string;
  onEditChange: (content: string) => void;
  onSaveEdit: (id: string) => void;
}

export interface ChatMessageProps {
  message: Message;
  onCopy: (content: string) => void;
  onEdit: (message: Message) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editContent: string;
  onEditChange: (content: string) => void;
  onSaveEdit: (id: string) => void;
}

export interface CodeBlockProps {
  code: string;
  language: string;
}

export interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEmojiSelect: (emoji: { native: string }) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  onFileRemove: () => void;
}

export interface TypingIndicatorProps {
  isTyping: boolean;
}
