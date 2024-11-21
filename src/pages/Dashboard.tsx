import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  User,
  LogOut,
  Download,
  Star,
  Clock,
  MessageSquare,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useAuthStore, useChatStore } from '../lib/store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load components
const ChatSidebar = React.lazy(() => import('../components/ChatSidebar'));
const ChatMessage = React.lazy(() => import('../components/ChatMessage'));
const ChatInput = React.lazy(() => import('../components/ChatInput'));
const ConversationTitle = React.lazy(() => import('../components/ConversationTitle'));
const DashboardStats = React.lazy(() => import('../components/DashboardStats'));
const QuickActions = React.lazy(() => import('../components/QuickActions'));
const SystemStatus = React.lazy(() => import('../components/SystemStatus'));

function ComponentLoader() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size="medium" className="text-indigo-600" />
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const {
    conversations,
    activeConversationId,
    favorites,
    addMessage,
    createConversation,
    retryMessage,
    toggleFavorite,
    stats,
  } = useChatStore();
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Get the active conversation from the conversations array
  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  React.useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when new messages are added
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <div className="h-screen flex">
        <ErrorBoundary>
          <Suspense fallback={<ComponentLoader />}>
            <ChatSidebar />
          </Suspense>
        </ErrorBoundary>
        
        <div className="flex-1 bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">Here's an overview of your conversations</p>
            </div>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader />}>
                <DashboardStats stats={stats} isLoading={isLoading} />
              </Suspense>
            </ErrorBoundary>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <ErrorBoundary>
                <Suspense fallback={<ComponentLoader />}>
                  <QuickActions onNewChat={createConversation} />
                </Suspense>
              </ErrorBoundary>

              <ErrorBoundary>
                <Suspense fallback={<ComponentLoader />}>
                  <SystemStatus />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <ErrorBoundary>
        <Suspense fallback={<ComponentLoader />}>
          <ChatSidebar />
        </Suspense>
      </ErrorBoundary>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <ErrorBoundary>
            <Suspense fallback={<ComponentLoader />}>
              <ConversationTitle
                id={activeConversation.id}
                title={activeConversation.title}
              />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeConversation.messages.map((message) => (
            <ErrorBoundary key={message.id}>
              <Suspense fallback={<ComponentLoader />}>
                <ChatMessage
                  content={message.content}
                  role={message.role}
                  timestamp={message.timestamp}
                  status={message.status}
                  error={message.error}
                  onRetry={() => retryMessage(activeConversation.id, message.id)}
                />
              </Suspense>
            </ErrorBoundary>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ErrorBoundary>
          <Suspense fallback={<ComponentLoader />}>
            <ChatInput
              onSend={(content) => addMessage(activeConversation.id, content, 'user')}
              disabled={isLoading}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}