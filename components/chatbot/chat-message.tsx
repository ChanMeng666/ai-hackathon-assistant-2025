'use client';

import { motion } from 'framer-motion';
import { Message } from './types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system' || message.role === 'data';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isSystem && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-500' : 'bg-gray-600'
        }`}>
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : isSystem
            ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            : 'bg-gray-100 text-gray-900 border'
        }`}>
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        {message.timestamp && (
          <div className="text-xs text-gray-500 mt-1 px-2">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
