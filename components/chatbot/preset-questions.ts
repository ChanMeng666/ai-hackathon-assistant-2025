import { PresetQuestion } from './types';

export const presetQuestions: PresetQuestion[] = [
  {
    id: 'event-dates',
    category: 'event-info',
    question: 'When and where is the AI Hackathon Festival 2025?',
    answer: 'The AI Hackathon Festival 2025 takes place on Friday, August 15 to Saturday, August 16, 2025, at AUT City Campus, WG Building (55 Wellesley Street East, Auckland Central, Auckland 1010). Friday events are in WG308, with additional rooms in WA and WG buildings on Saturday.'
  },
  {
    id: 'event-theme',
    category: 'event-info',
    question: 'What is the theme and objective of the hackathon?',
    answer: 'The theme focuses on solving problems related to the United Nations Sustainable Development Goals (SDGs), such as reducing poverty or improving lives and skills. The objective is to develop strong, evidence-supported conceptual ideas for AI-driven solutions. Due to the short timeframe, a fully functional prototype is not expected.'
  },
  {
    id: 'team-formation',
    category: 'teams',
    question: 'How does team formation work?',
    answer: 'Approximately 11-12 teams will be formed with 3-6 members each. Seven teams have already been pre-formed. For those without a team, a "speed dating on drugs" style session will be held on Friday evening. Ideal teams mix three personas: The Hacker (technical skills), The Hipster (vision/passion), and The Hustler (time management/motivation).'
  },
  {
    id: 'ai-definition',
    category: 'technical',
    question: 'What counts as "AI" for this hackathon?',
    answer: 'For this event, "AI" can range from a data-driven prediction tool to a recognition app. The focus is on the data-centric concept. Teams can use mock or synthetic datasets if finding a real one is too time-consuming. The emphasis is on demonstrating the AI concept rather than building a fully functional system.'
  },
  {
    id: 'schedule-overview',
    category: 'schedule',
    question: 'What is the detailed schedule?',
    answer: 'Friday (Aug 15): 5:00-8:00 PM - Registration, networking, dinner, team formation, and strategy planning. Saturday (Aug 16): 7:30 AM arrival, 8:10 AM-12:14 PM team work, 1:15-2:00 PM pitch practice, 3:30-6:30 PM final presentations, 7:00-7:30 PM winner announcements. Note: Venue closes at 8:00 PM Friday, but teams can continue working remotely.'
  },
  {
    id: 'mentor-help',
    category: 'mentors',
    question: 'How can I get help from mentors?',
    answer: 'Use the official Discord channel to request help from specific mentors. Mentors will actively circulate among teams, check in every two hours, and provide guidance on technical, business, and presentation aspects. They are available throughout Saturday and will help with pitch practice in the afternoon.'
  },
  {
    id: 'judging-criteria',
    category: 'awards',
    question: 'What are the judging criteria and prizes?',
    answer: 'Judging is based on: Problem/solution clarity, technical feasibility, potential impact, and meeting the innovation brief (SDGs + AI + technology). Prizes include: $250 for venue winner, free AI Summit entry ($1,499 value) for top 4 national finalists, $1,000 + ArcGIS licenses for national winner, and $5,000 for national Agentic AI winner.'
  },
  {
    id: 'what-to-bring',
    category: 'logistics',
    question: 'What should I bring to the hackathon?',
    answer: 'Bring your laptop, charger, and any other hardware you might need. Also bring a water bottle. Meals are provided: dinner on Friday evening, and coffee, tea, lunch, and afternoon tea on Saturday. Make sure your dietary requirements are registered. You must wear your lanyard/visitor pass at all times and stay within designated areas.'
  }
];

export const getQuestionsByCategory = (category: PresetQuestion['category']) => {
  return presetQuestions.filter(q => q.category === category);
};

export const getAllCategories = (): PresetQuestion['category'][] => {
  return ['event-info', 'teams', 'technical', 'schedule', 'mentors', 'awards', 'logistics', 'general'];
};

export const getCategoryDisplayName = (category: PresetQuestion['category']): string => {
  const categoryNames = {
    'event-info': 'Event Information',
    'teams': 'Team Formation',
    'technical': 'Technical Details',
    'schedule': 'Schedule & Timeline',
    'mentors': 'Mentors & Support',
    'awards': 'Judging & Awards',
    'logistics': 'Logistics & Preparation',
    'general': 'General Questions'
  };
  return categoryNames[category];
};
