'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EmbeddedChat } from '@/components/chat/embedded-chat';
import { FAQList } from '@/components/faq/faq-list';
import { Footer } from '@/components/layout/footer';
import { useFAQVoting } from '@/hooks/use-faq-voting';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { EnhancedPresetQuestion } from '@/components/chatbot/types';
import { 
  MessageCircle, 
  HelpCircle, 
  Menu,
  X,
  Sparkles,
  Calendar,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [chatHandler, setChatHandler] = useState<((q: EnhancedPresetQuestion) => void) | null>(null);

  const {
    isLoading,
    enhancedQuestions,
    voteOnQuestion,
    incrementViews
  } = useFAQVoting();

  // 智能导航栏控制
  const { isHeaderVisible, isAtTop } = useScrollDirection({
    threshold: 80,
    debounceMs: 10
  });

  // Handle sending FAQ to chat
  const handleSendToChat = useCallback((question: EnhancedPresetQuestion) => {
    if (chatHandler) {
      chatHandler(question);
    }
    // Switch to chat tab on mobile
    if (window.innerWidth < 1024) {
      setActiveTab('chat');
    }
  }, [chatHandler]);

  // Register chat handler when chat component is ready
  const handleChatHandlerReady = useCallback((handler: (q: EnhancedPresetQuestion) => void) => {
    setChatHandler(() => handler);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles size={32} className="text-white" />
          </div>
          <p className="text-gray-600">Loading AI Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Smart Navigation Header */}
      <header className={`
        fixed top-0 left-0 right-0 z-50
        bg-white/95 backdrop-blur-sm border-b border-gray-200
        transition-transform duration-300 ease-in-out
        ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isAtTop ? 'shadow-sm' : 'shadow-md'}
      `}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                AI Hackathon Festival 2025
              </h1>
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Aug 15-16, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>AUT City Campus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('chat')}
              className="text-sm"
            >
              <MessageCircle size={16} className="mr-2" />
              AI Chat
            </Button>
            <Button
              variant={activeTab === 'faq' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('faq')}
              className="text-sm"
            >
              <HelpCircle size={16} className="mr-2" />
              FAQ ({enhancedQuestions.length})
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-3 pt-3 border-t border-gray-200"
          >
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setActiveTab('chat');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 text-sm"
              >
                <MessageCircle size={16} className="mr-2" />
                AI Chat
              </Button>
              <Button
                variant={activeTab === 'faq' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setActiveTab('faq');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 text-sm"
              >
                <HelpCircle size={16} className="mr-2" />
                FAQ ({enhancedQuestions.length})
              </Button>
            </div>
          </motion.div>
        )}
        </div>
      </header>

      {/* Main Content - Now with proper spacing for fixed header */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-6">
            {/* Chat Area - 70% with Fixed Optimal Height */}
            <div className="flex-1 lg:w-[70%]">
              <div className="h-[75vh] max-h-[800px] min-h-[500px] bg-white rounded-lg shadow-sm border border-gray-200">
                <EmbeddedChat onHandlerReady={handleChatHandlerReady} />
              </div>
            </div>
            
            {/* FAQ Sidebar - 30% with Independent Height */}
            <div className="lg:w-[30%]">
              <div className="h-[80vh] max-h-[900px] min-h-[600px] bg-white rounded-lg shadow-sm border border-gray-200">
                <FAQList
                  questions={enhancedQuestions}
                  onVote={voteOnQuestion}
                  onSendToChat={handleSendToChat}
                  onView={incrementViews}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {activeTab === 'chat' && (
                <div className="h-[70vh] max-h-[600px] min-h-[400px]">
                  <EmbeddedChat onHandlerReady={handleChatHandlerReady} />
                </div>
              )}
              {activeTab === 'faq' && (
                <div className="h-[75vh] max-h-[700px] min-h-[500px]">
                  <FAQList
                    questions={enhancedQuestions}
                    onVote={voteOnQuestion}
                    onSendToChat={handleSendToChat}
                    onView={incrementViews}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Natural flow layout, appears when user scrolls down */}
      <Footer />
    </div>
  );
}
