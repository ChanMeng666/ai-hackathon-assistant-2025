'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { TypingIndicator } from '@/components/chatbot/typing-indicator';
import { ChatSuggestions } from './chat-suggestions';
import { Message, EnhancedPresetQuestion } from '@/components/chatbot/types';
import { 
  Send, 
  Trash2, 
  MessageCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

const STORAGE_KEY = 'hackathon-chat-history';
const MAX_STORED_MESSAGES = 50;

interface EmbeddedChatProps {
  onHandlerReady?: (handler: (question: EnhancedPresetQuestion) => void) => void;
}

export function EmbeddedChat({ onHandlerReady }: EmbeddedChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputHeight, setInputHeight] = useState(40);

  // Load chat history from localStorage
  const loadChatHistory = (): any[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Save chat history to localStorage
  const saveChatHistory = (messages: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      const toStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    reload,
  } = useChat({
    api: '/api/chat',
    initialMessages: loadChatHistory(),
    onFinish: () => {
      setTimeout(() => {
        saveChatHistory(messages);
      }, 100);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      const scrollHeight = inputRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 40), 120);
      setInputHeight(newHeight);
    }
  }, [input]);

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    inputRef.current?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    handleSubmit(e);
    setInputHeight(40);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic form event
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent;
    
    // Set the input value and submit
    handleInputChange({ target: { value: suggestion } } as any);
    setTimeout(() => {
      handleSubmit(syntheticEvent);
    }, 100);
  };

  // Handle receiving a question from FAQ
  const handleFAQQuestion = useCallback((question: EnhancedPresetQuestion) => {
    // Add user question
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: question.question,
      timestamp: Date.now(),
    };

    // Add preset answer with enhanced formatting
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: `${question.answer}\n\n💡 *This was a quick answer from our FAQ. Feel free to ask follow-up questions for more details!*`,
      timestamp: Date.now() + 1,
    };

    const newMessages = [...messages, userMessage, assistantMessage];
    setMessages(newMessages as any);
  }, [messages, setMessages]);

  // Register the handler with parent component
  useEffect(() => {
    if (onHandlerReady) {
      onHandlerReady(handleFAQQuestion);
    }
  }, [onHandlerReady, handleFAQQuestion]);

  const hasMessages = messages.length > 0;

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden chat-container">
      {/* Compact Actions Bar - Only show when there are messages */}
      {hasMessages && (
        <div className="flex-shrink-0 px-4 py-2 border-b border-gray-200 bg-gray-50/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles size={16} className="text-blue-500" />
              <span>AI Assistant</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => reload()}
                disabled={isLoading}
                className="h-7 w-7 p-0"
                title="Regenerate last response"
              >
                <RefreshCw size={12} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChatHistory}
                className="h-7 w-7 p-0"
                title="Clear chat history"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea className="flex-1 chat-messages">
        <div className="min-h-full">
          {!hasMessages && (
            <div className="flex items-center justify-center min-h-full py-8">
              <div className="w-full max-w-2xl px-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    AI Hackathon Festival 2025 Assistant
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg mx-auto">
                    I'm here to help you with everything about the AI Hackathon Festival 2025! 
                    Ask me about team formation, judging criteria, event schedule, or anything else you need to know.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
                    <Sparkles size={12} className="text-blue-500" />
                    <span>Powered by Google Gemini Pro</span>
                  </div>
                </div>
                
                <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white chat-input-container">
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
                placeholder="Ask about teams, schedule, judging criteria..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ height: `${inputHeight}px` }}
                disabled={isLoading}
                rows={1}
              />
              
              {/* Character indicator for long messages */}
              {input.length > 100 && (
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {input.length}/500
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !input.trim()}
              className="h-12 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <Send size={16} />
              <span className="sr-only">Send message</span>
            </Button>
          </div>

          {/* Help text */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Press Shift + Enter for new line</span>
            <span>
              {isLoading ? 'AI is thinking...' : 'Ready to help!'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
