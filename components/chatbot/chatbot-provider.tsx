'use client';

import dynamic from 'next/dynamic';

// Dynamically import the chatbot to improve initial page load
const Chatbot = dynamic(
  () => import('./chatbot').then(mod => ({ default: mod.Chatbot })),
  {
    ssr: false,
    loading: () => null
  }
);

export function ChatbotProvider() {
  return <Chatbot />;
}
