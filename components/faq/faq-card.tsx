'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedPresetQuestion } from '@/components/chatbot/types';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Eye,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';
import { getCategoryDisplayName } from '@/components/chatbot/preset-questions';

interface FAQCardProps {
  question: EnhancedPresetQuestion;
  onVote: (questionId: string, voteType: 'up' | 'down') => void;
  onView: (questionId: string) => void;
}

export function FAQCard({ question, onVote, onView }: FAQCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  
  const handleExpand = () => {
    if (!hasViewed) {
      onView(question.id);
      setHasViewed(true);
    }
    setIsExpanded(!isExpanded);
  };



  const handleVote = (voteType: 'up' | 'down') => {
    onVote(question.id, voteType);
  };

  const truncatedAnswer = question.answer.length > 120 
    ? question.answer.substring(0, 120) + '...'
    : question.answer;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 overflow-hidden group"
    >
      {/* Category Badge */}
      <div className="px-4 pt-3 pb-1">
        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
          {getCategoryDisplayName(question.category)}
        </span>
      </div>

      {/* Question Title */}
      <div className="px-4 pb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {question.question}
        </h3>
      </div>

      {/* Answer Preview */}
      <div className="px-4 pb-3">
        <p className="text-gray-600 text-sm leading-relaxed">
          {isExpanded ? question.answer : truncatedAnswer}
        </p>
        
        {question.answer.length > 120 && (
          <button
            onClick={handleExpand}
            className="mt-2 text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
      </div>

      {/* Stats and Actions */}
      <div className="border-t border-gray-100 px-4 py-3">
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{question.stats.totalViews}</span>
            </div>
            <div className="text-gray-300">•</div>
            <div>
              Score: <span className={`font-medium ${
                question.stats.score > 0 ? 'text-green-600' : 
                question.stats.score < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {question.stats.score > 0 ? '+' : ''}{question.stats.score}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          {/* Voting Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              className={`h-8 px-2 text-xs ${
                question.userVote === 'up' 
                  ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ThumbsUp size={12} className="mr-1" />
              {question.stats.upVotes}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('down')}
              className={`h-8 px-2 text-xs ${
                question.userVote === 'down' 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ThumbsDown size={12} className="mr-1" />
              {question.stats.downVotes}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
