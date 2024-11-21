import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  location?: string;
  avatar?: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  error?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessageAt: Date;
}

interface ChatStats {
  totalMessages: number;
  averageResponseTime: number;
  totalConversations: number;
  activeToday: number;
  favoriteCount: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  favorites: Set<string>;
  stats: ChatStats;
  createConversation: () => void;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, content: string, role: 'user' | 'assistant') => Promise<void>;
  updateConversationTitle: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
  retryMessage: (conversationId: string, messageId: string) => Promise<void>;
  searchConversations: (query: string) => void;
  toggleFavorite: (id: string) => void;
  updateStats: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      favorites: new Set(),
      stats: {
        totalMessages: 0,
        averageResponseTime: 0,
        totalConversations: 0,
        activeToday: 0,
        favoriteCount: 0,
      },
      createConversation: () => {
        const newConversation: Conversation = {
          id: crypto.randomUUID(),
          title: 'New Conversation',
          messages: [],
          lastMessageAt: new Date(),
        };
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: newConversation.id,
        }));
        get().updateStats();
      },
      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },
      addMessage: async (conversationId, content, role) => {
        const message: Message = {
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: new Date(),
          status: 'sending',
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  lastMessageAt: new Date(),
                  title:
                    conv.messages.length === 0 && role === 'user'
                      ? content.slice(0, 50) + (content.length > 50 ? '...' : '')
                      : conv.title,
                }
              : conv
          ),
        }));

        if (role === 'user') {
          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            const response = "I'm an AI assistant. This is a simulated response.";
            
            set((state) => ({
              conversations: state.conversations.map((conv) =>
                conv.id === conversationId
                  ? {
                      ...conv,
                      messages: conv.messages.map((msg) =>
                        msg.id === message.id ? { ...msg, status: 'sent' } : msg
                      ),
                    }
                  : conv
              ),
            }));

            // Add assistant's response
            const assistantMessage: Message = {
              id: crypto.randomUUID(),
              content: response,
              role: 'assistant',
              timestamp: new Date(),
              status: 'sent',
            };

            set((state) => ({
              conversations: state.conversations.map((conv) =>
                conv.id === conversationId
                  ? {
                      ...conv,
                      messages: [...conv.messages, assistantMessage],
                      lastMessageAt: new Date(),
                    }
                  : conv
              ),
            }));

            get().updateStats();
          } catch (error) {
            set((state) => ({
              conversations: state.conversations.map((conv) =>
                conv.id === conversationId
                  ? {
                      ...conv,
                      messages: conv.messages.map((msg) =>
                        msg.id === message.id
                          ? { ...msg, status: 'error', error: 'Failed to send message' }
                          : msg
                      ),
                    }
                  : conv
              ),
            }));
          }
        }
      },
      updateConversationTitle: (id, title) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, title } : conv
          ),
        }));
      },
      deleteConversation: (id) => {
        set((state) => {
          const newConversations = state.conversations.filter((conv) => conv.id !== id);
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(id);
          return {
            conversations: newConversations,
            activeConversationId:
              state.activeConversationId === id
                ? newConversations[0]?.id ?? null
                : state.activeConversationId,
            favorites: newFavorites,
          };
        });
        get().updateStats();
      },
      retryMessage: async (conversationId, messageId) => {
        const state = get();
        const conversation = state.conversations.find((c) => c.id === conversationId);
        const message = conversation?.messages.find((m) => m.id === messageId);

        if (!conversation || !message) return;

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, status: 'sending', error: undefined } : msg
                  ),
                }
              : conv
          ),
        }));

        await get().addMessage(conversationId, message.content, message.role);
      },
      searchConversations: (query) => {
        // Implement conversation search logic here
        console.log('Searching conversations:', query);
      },
      toggleFavorite: (id) => {
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(id)) {
            newFavorites.delete(id);
          } else {
            newFavorites.add(id);
          }
          return { favorites: newFavorites };
        });
        get().updateStats();
      },
      updateStats: () => {
        const state = get();
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        let totalMessages = 0;
        let totalResponseTime = 0;
        let responseCount = 0;
        let activeToday = 0;

        state.conversations.forEach((conv) => {
          if (new Date(conv.lastMessageAt) >= startOfDay) {
            activeToday++;
          }

          let lastUserMessage: Message | null = null;
          conv.messages.forEach((msg) => {
            totalMessages++;
            
            if (msg.role === 'user') {
              lastUserMessage = msg;
            } else if (msg.role === 'assistant' && lastUserMessage) {
              const responseTime = new Date(msg.timestamp).getTime() - new Date(lastUserMessage.timestamp).getTime();
              totalResponseTime += responseTime;
              responseCount++;
              lastUserMessage = null;
            }
          });
        });

        set({
          stats: {
            totalMessages,
            averageResponseTime: responseCount > 0 ? totalResponseTime / responseCount : 0,
            totalConversations: state.conversations.length,
            activeToday,
            favoriteCount: state.favorites.size,
          },
        });
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        favorites: Array.from(state.favorites),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.favorites = new Set(state.favorites);
          state.updateStats();
        }
      },
    }
  )
);

interface Preferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  notifications: {
    messages: boolean;
    updates: boolean;
    sounds: boolean;
  };
  privacy: {
    shareTypingStatus: boolean;
    showOnlineStatus: boolean;
    allowDataCollection: boolean;
  };
  interface: {
    showTimestamps: boolean;
    compactMode: boolean;
    enableAnimations: boolean;
  };
}

interface PreferencesState {
  preferences: Preferences;
  updatePreferences: (updates: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  theme: 'system',
  fontSize: 'medium',
  notifications: {
    messages: true,
    updates: true,
    sounds: true,
  },
  privacy: {
    shareTypingStatus: true,
    showOnlineStatus: true,
    allowDataCollection: false,
  },
  interface: {
    showTimestamps: true,
    compactMode: false,
    enableAnimations: true,
  },
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      updatePreferences: (updates) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...updates,
          },
        })),
    }),
    {
      name: 'preferences-storage',
    }
  )
);