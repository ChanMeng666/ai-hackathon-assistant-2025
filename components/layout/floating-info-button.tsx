'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { InfoModal } from './info-modal';

interface FloatingInfoButtonProps {
  className?: string;
}

export function FloatingInfoButton({ className = '' }: FloatingInfoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Info Button */}
      <motion.button
        className={`
          fixed bottom-6 right-6 z-40
          w-12 h-12 bg-blue-600 hover:bg-blue-700
          rounded-full shadow-lg hover:shadow-xl
          flex items-center justify-center
          text-white transition-all duration-200
          ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        aria-label="Show project information"
      >
        <Info size={20} />
      </motion.button>

      {/* Info Modal */}
      <InfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
