import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import { Brain, Shield, Zap, MessageSquare, Sparkles, Globe } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Experience the Next Generation of{' '}
              <span className="text-indigo-600">AI Conversation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Engage with an AI that understands context, learns from interactions, and delivers human-like responses with unparalleled accuracy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-medium border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=2000"
                alt="AI Chat Interface"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Seamless Interaction
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience AI that adapts to your needs with cutting-edge capabilities designed for natural conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              Icon={Brain}
              title="Advanced Intelligence"
              description="Leveraging state-of-the-art language models for deep understanding and contextual responses."
            />
            <FeatureCard
              Icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption and privacy controls to keep your conversations completely secure."
            />
            <FeatureCard
              Icon={Zap}
              title="Lightning Fast"
              description="Real-time responses powered by optimized infrastructure for minimal latency."
            />
            <FeatureCard
              Icon={MessageSquare}
              title="Multi-turn Dialogue"
              description="Natural conversation flow with perfect context retention across multiple exchanges."
            />
            <FeatureCard
              Icon={Sparkles}
              title="Smart Suggestions"
              description="Proactive insights and recommendations based on conversation context."
            />
            <FeatureCard
              Icon={Globe}
              title="Multilingual Support"
              description="Seamless communication in over 95 languages with native-level understanding."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Conversations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already experiencing the future of AI communication.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}