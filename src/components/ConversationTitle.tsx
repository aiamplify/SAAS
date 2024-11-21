import React from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useChatStore } from '../lib/store';

interface ConversationTitleProps {
  id: string;
  title: string;
}

export default function ConversationTitle({ id, title }: ConversationTitleProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const updateConversationTitle = useChatStore((state) => state.updateConversationTitle);

  const handleSubmit = () => {
    if (newTitle.trim() && newTitle !== title) {
      updateConversationTitle(id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className="p-1 text-green-600 hover:text-green-700"
          aria-label="Save title"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewTitle(title);
          }}
          className="p-1 text-red-600 hover:text-red-700"
          aria-label="Cancel editing"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 text-gray-400 hover:text-gray-600"
        aria-label="Edit title"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
}