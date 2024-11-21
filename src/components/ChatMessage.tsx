import React from 'react';
import { Bot, Copy, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '../lib/store';
import MessageContent from './MessageContent';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  error?: string;
  onRetry?: () => void;
}

export default function ChatMessage({ content, role, timestamp, status, error, onRetry }: ChatMessageProps) {
  const { user } = useAuthStore();
  const [reaction, setReaction] = React.useState<'like' | 'dislike' | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 p-6 group ${role === 'assistant' ? 'bg-gray-50' : ''}`}>
      <div className="flex-shrink-0">
        {role === 'assistant' ? (
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}`}
              alt="User"
              className="w-8 h-8 rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {role === 'assistant' ? 'AI Assistant' : user?.name}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
            {status === 'sending' && (
              <span className="text-sm text-gray-500">Sending...</span>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="text-sm font-medium hover:text-red-700"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
              title={copied ? 'Copied!' : 'Copy message'}
            >
              <Copy className="w-4 h-4" />
            </button>
            {role === 'assistant' && (
              <>
                <button
                  onClick={() => setReaction(reaction === 'like' ? null : 'like')}
                  className={`p-1 rounded ${
                    reaction === 'like'
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Like"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setReaction(reaction === 'dislike' ? null : 'dislike')}
                  className={`p-1 rounded ${
                    reaction === 'dislike'
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Dislike"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
        <MessageContent content={content} />
      </div>
    </div>
  );
}