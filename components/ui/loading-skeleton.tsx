'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function ChatLoadingSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <LoadingSkeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-3/4" />
            <LoadingSkeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FAQLoadingSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-3">
            <LoadingSkeleton className="h-3 w-20" />
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-3 w-3/4" />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <LoadingSkeleton className="h-6 w-12" />
                <LoadingSkeleton className="h-6 w-12" />
              </div>
              <LoadingSkeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
