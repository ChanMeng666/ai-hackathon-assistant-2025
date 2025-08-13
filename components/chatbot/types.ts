export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface PresetQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'event-info' | 'teams' | 'technical' | 'schedule' | 'mentors' | 'awards' | 'logistics' | 'general';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
}

export interface FAQVote {
  questionId: string;
  vote: 'up' | 'down' | null;
  timestamp: number;
}

export interface FAQStats {
  questionId: string;
  upVotes: number;
  downVotes: number;
  totalViews: number;
  score: number; // calculated as upVotes - downVotes
}

export interface EnhancedPresetQuestion extends PresetQuestion {
  stats: FAQStats;
  userVote?: 'up' | 'down' | null;
}
