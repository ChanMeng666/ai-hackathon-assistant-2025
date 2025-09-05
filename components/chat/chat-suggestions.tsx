'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Calendar, Award, HelpCircle } from 'lucide-react';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Calendar,
    text: "What's the schedule for the hackathon?",
    category: "Schedule"
  },
  {
    icon: Users,
    text: "How do I form a team?",
    category: "Teams"
  },
  {
    icon: Award,
    text: "What are the judging criteria?",
    category: "Awards"
  },
  {
    icon: HelpCircle,
    text: "What should I bring to the event?",
    category: "Logistics"
  },
  {
    icon: MessageCircle,
    text: "How can I get help from mentors?",
    category: "Support"
  }
];

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          What would you like to know?
        </h3>
        <p className="text-sm text-gray-600">
          Here are some popular questions to get you started
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                onClick={() => onSuggestionClick(suggestion.text)}
                className="w-full h-[120px] p-4 border border-gray-200 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer group flex flex-col"
              >
                {/* Header with icon and category */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                    {suggestion.category}
                  </div>
                </div>
                
                {/* Question text - constrained container */}
                <div className="flex-1 overflow-hidden">
                  <p 
                    className="text-sm text-gray-900 leading-relaxed overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {suggestion.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Or ask anything else about the AI Hackathon Festival 2025
        </p>
      </div>
    </div>
  );
}
