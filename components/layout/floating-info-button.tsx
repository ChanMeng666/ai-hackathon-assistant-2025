'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { InfoModal } from './info-modal';

interface FloatingInfoButtonProps {
  className?: string;
}

export function FloatingInfoButton({ className = '' }: FloatingInfoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Floating Info Button */}
      <motion.button
        className={`
          fixed z-30
          w-11 h-11 lg:w-12 lg:h-12
          bg-blue-600 hover:bg-blue-700
          rounded-full shadow-lg hover:shadow-xl
          flex items-center justify-center
          text-white transition-all duration-200
          ${isMobile 
            ? 'bottom-24 right-4 sm:bottom-20 sm:right-4' 
            : 'bottom-6 right-6'
          }
          ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        aria-label="Show project information"
      >
        <Info size={isMobile ? 18 : 20} />
      </motion.button>

      {/* Info Modal */}
      <InfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
