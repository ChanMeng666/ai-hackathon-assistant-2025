'use client';

import { useState, useEffect, useCallback } from 'react';
import { FAQVote, FAQStats, EnhancedPresetQuestion, PresetQuestion } from '@/components/chatbot/types';
import { presetQuestions } from '@/components/chatbot/preset-questions';

const VOTES_STORAGE_KEY = 'hackathon-faq-votes';
const STATS_STORAGE_KEY = 'hackathon-faq-stats';

// Initialize default stats for all questions
const initializeDefaultStats = (questions: PresetQuestion[]): FAQStats[] => {
  return questions.map(q => ({
    questionId: q.id,
    upVotes: Math.floor(Math.random() * 20) + 5, // Random initial votes for demo
    downVotes: Math.floor(Math.random() * 5) + 1,
    totalViews: Math.floor(Math.random() * 50) + 10,
    score: 0 // Will be calculated
  })).map(stat => ({
    ...stat,
    score: stat.upVotes - stat.downVotes
  }));
};

export function useFAQVoting() {
  const [votes, setVotes] = useState<FAQVote[]>([]);
  const [stats, setStats] = useState<FAQStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedVotes = localStorage.getItem(VOTES_STORAGE_KEY);
      const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
      
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes));
      }
      
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        // Initialize with default stats if none exist
        const defaultStats = initializeDefaultStats(presetQuestions);
        setStats(defaultStats);
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(defaultStats));
      }
    } catch (error) {
      console.error('Error loading FAQ data:', error);
      // Initialize with defaults on error
      const defaultStats = initializeDefaultStats(presetQuestions);
      setStats(defaultStats);
    }
    setIsLoading(false);
  }, []);

  // Save votes to localStorage
  const saveVotes = useCallback((newVotes: FAQVote[]) => {
    try {
      localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(newVotes));
    } catch (error) {
      console.error('Error saving votes:', error);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((newStats: FAQStats[]) => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }, []);

  // Vote on a question
  const voteOnQuestion = useCallback((questionId: string, voteType: 'up' | 'down') => {
    const existingVoteIndex = votes.findIndex(v => v.questionId === questionId);
    const existingVote = existingVoteIndex >= 0 ? votes[existingVoteIndex] : null;
    
    let newVotes = [...votes];
    let newStats = [...stats];
    
    // Update votes
    if (existingVote) {
      if (existingVote.vote === voteType) {
        // Remove vote if clicking the same vote type
        newVotes.splice(existingVoteIndex, 1);
      } else {
        // Change vote
        newVotes[existingVoteIndex] = {
          questionId,
          vote: voteType,
          timestamp: Date.now()
        };
      }
    } else {
      // Add new vote
      newVotes.push({
        questionId,
        vote: voteType,
        timestamp: Date.now()
      });
    }
    
    // Update stats
    const statsIndex = newStats.findIndex(s => s.questionId === questionId);
    if (statsIndex >= 0) {
      const currentStats = newStats[statsIndex];
      let upVotes = currentStats.upVotes;
      let downVotes = currentStats.downVotes;
      
      // Adjust vote counts based on old and new votes
      if (existingVote) {
        // Remove old vote
        if (existingVote.vote === 'up') upVotes--;
        if (existingVote.vote === 'down') downVotes--;
      }
      
      // Only add new vote if it's different or if removing existing vote
      if (!existingVote || existingVote.vote !== voteType) {
        if (voteType === 'up') upVotes++;
        if (voteType === 'down') downVotes++;
      }
      
      newStats[statsIndex] = {
        ...currentStats,
        upVotes: Math.max(0, upVotes),
        downVotes: Math.max(0, downVotes),
        score: upVotes - downVotes
      };
    }
    
    setVotes(newVotes);
    setStats(newStats);
    saveVotes(newVotes);
    saveStats(newStats);
  }, [votes, stats, saveVotes, saveStats]);

  // Increment view count
  const incrementViews = useCallback((questionId: string) => {
    const newStats = stats.map(stat => 
      stat.questionId === questionId 
        ? { ...stat, totalViews: stat.totalViews + 1 }
        : stat
    );
    setStats(newStats);
    saveStats(newStats);
  }, [stats, saveStats]);

  // Get enhanced questions with voting data
  const getEnhancedQuestions = useCallback((): EnhancedPresetQuestion[] => {
    return presetQuestions.map(question => {
      const questionStats = stats.find(s => s.questionId === question.id) || {
        questionId: question.id,
        upVotes: 0,
        downVotes: 0,
        totalViews: 0,
        score: 0
      };
      
      const userVote = votes.find(v => v.questionId === question.id)?.vote || null;
      
      return {
        ...question,
        stats: questionStats,
        userVote
      };
    }).sort((a, b) => b.stats.score - a.stats.score); // Sort by score (highest first)
  }, [stats, votes]);

  // Get user's vote for a specific question
  const getUserVote = useCallback((questionId: string): 'up' | 'down' | null => {
    return votes.find(v => v.questionId === questionId)?.vote || null;
  }, [votes]);

  return {
    isLoading,
    enhancedQuestions: getEnhancedQuestions(),
    voteOnQuestion,
    incrementViews,
    getUserVote,
    stats
  };
}
