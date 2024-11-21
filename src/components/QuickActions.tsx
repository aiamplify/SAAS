import React from 'react';
import { Plus, Download, Star, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onNewChat: () => void;
}

export default function QuickActions({ onNewChat }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      label: 'New Chat',
      description: 'Start a new conversation',
      onClick: onNewChat,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Star,
      label: 'Favorites',
      description: 'View favorite conversations',
      onClick: () => navigate('/favorites'),
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      icon: Download,
      label: 'Export',
      description: 'Export your chat history',
      onClick: () => {}, // Implement export functionality
      color: 'text-green-600 bg-green-50',
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Customize your experience',
      onClick: () => navigate('/settings'),
      color: 'text-gray-600 bg-gray-50',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map(({ icon: Icon, label, description, onClick, color }) => (
          <button
            key={label}
            onClick={onClick}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 text-left transition-colors"
          >
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-2`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}