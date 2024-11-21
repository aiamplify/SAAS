import React from 'react';
import { MessageSquare, Clock, Star, TrendingUp } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface DashboardStatsProps {
  stats: {
    totalMessages: number;
    averageResponseTime: number;
    totalConversations: number;
    activeToday: number;
    favoriteCount: number;
  };
  isLoading?: boolean;
}

export default function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <div className="w-6 h-6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      label: 'Total Messages',
      value: stats.totalMessages.toLocaleString(),
      icon: MessageSquare,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      label: 'Avg. Response Time',
      value: formatResponseTime(stats.averageResponseTime),
      icon: Clock,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Active Today',
      value: stats.activeToday.toLocaleString(),
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Favorites',
      value: stats.favoriteCount.toLocaleString(),
      icon: Star,
      color: 'text-yellow-600 bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-lg shadow-sm p-6 transition-transform hover:scale-102"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}