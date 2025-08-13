'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedPresetQuestion } from '@/components/chatbot/types';
import { FAQCard } from './faq-card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter,
  TrendingUp,
  Clock,
  RotateCcw
} from 'lucide-react';
import { getAllCategories, getCategoryDisplayName } from '@/components/chatbot/preset-questions';

interface FAQListProps {
  questions: EnhancedPresetQuestion[];
  onVote: (questionId: string, voteType: 'up' | 'down') => void;
  onSendToChat: (question: EnhancedPresetQuestion) => void;
  onView: (questionId: string) => void;
}

type SortOption = 'score' | 'recent' | 'views';

export function FAQList({ questions, onVote, onSendToChat, onView }: FAQListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [showFilters, setShowFilters] = useState(false);

  const categories = getAllCategories();

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let filtered = questions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort questions
    switch (sortBy) {
      case 'score':
        filtered.sort((a, b) => b.stats.score - a.stats.score);
        break;
      case 'recent':
        // Sort by question order (assuming more recent questions come first in the array)
        break;
      case 'views':
        filtered.sort((a, b) => b.stats.totalViews - a.stats.totalViews);
        break;
    }

    return filtered;
  }, [questions, searchTerm, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('score');
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || sortBy !== 'score';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Filter size={16} />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-3"
            >
              {/* Category Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getCategoryDisplayName(category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'score' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('score')}
                    className="text-xs h-7"
                  >
                    <TrendingUp size={12} className="mr-1" />
                    Popular
                  </Button>
                  <Button
                    variant={sortBy === 'views' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('views')}
                    className="text-xs h-7"
                  >
                    <Clock size={12} className="mr-1" />
                    Most Viewed
                  </Button>
                </div>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <div className="pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 h-7"
                  >
                    <RotateCcw size={12} className="mr-1" />
                    Reset filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="mt-3 text-xs text-gray-500">
          {filteredQuestions.length} of {questions.length} questions
          {hasActiveFilters && ' (filtered)'}
        </div>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((question) => (
              <FAQCard
                key={question.id}
                question={question}
                onVote={onVote}
                onSendToChat={onSendToChat}
                onView={onView}
              />
            ))}
          </AnimatePresence>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto mb-3 opacity-50" />
              </div>
              <p className="text-gray-500 text-sm">
                No questions found matching your criteria.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="mt-2 text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
