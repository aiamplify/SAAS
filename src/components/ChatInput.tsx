import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const maxLength = 4000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && message.length <= maxLength) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const characterCount = message.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex flex-col gap-2 max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={disabled}
            className={`w-full resize-none bg-gray-50 border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
              isOverLimit ? 'border-red-500' : 'border-gray-200'
            }`}
            style={{ maxHeight: '200px' }}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            {disabled && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
            <button
              type="submit"
              disabled={!message.trim() || disabled || isOverLimit}
              className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-gray-400"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/{maxLength} characters
          </span>
        </div>
      </div>
    </form>
  );
}