import React from 'react';
import { PlusCircle, MessageSquare, Trash2, Search } from 'lucide-react';
import { useChatStore } from '../lib/store';
import { formatDistanceToNow } from 'date-fns';

export default function ChatSidebar() {
  const {
    conversations,
    activeConversationId,
    createConversation,
    setActiveConversation,
    deleteConversation,
    searchConversations,
  } = useChatStore();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchConversations(query);
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 space-y-4">
        <button
          onClick={createConversation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No conversations yet</p>
            <p className="text-sm">Start a new chat to begin</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group p-4 cursor-pointer hover:bg-gray-100 ${
                activeConversationId === conversation.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.title}
                  </h3>
                  {conversation.messages.length > 0 && (
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(conversation.lastMessageAt, { addSuffix: true })}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this conversation?')) {
                      deleteConversation(conversation.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}