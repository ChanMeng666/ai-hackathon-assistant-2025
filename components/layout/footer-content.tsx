'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Code2, 
  Globe, 
  Heart,
  GraduationCap,
  Users,
  Sparkles
} from 'lucide-react';

export function FooterContent() {
  const currentYear = new Date().getFullYear();

  const links = {
    developer: {
      name: 'Chan Meng',
      github: 'https://github.com/ChanMeng666',
      description: '👩‍💻 AI Agent & Full-Stack Developer | 🤖 Agentic Systems & LLM Integration Expert'
    },
    project: {
      repository: 'https://github.com/ChanMeng666/ai-hackathon-assistant-2025',
      deployment: 'https://ai-hackathon-assistant-2025.vercel.app/'
    },
    organizers: [
      {
        name: 'AUT',
        url: 'https://www.aut.ac.nz/',
        description: 'Auckland University of Technology',
        icon: GraduationCap
      },
      {
        name: 'AI Forum',
        url: 'https://aiforum.org.nz/',
        description: 'AI Forum New Zealand',
        icon: Sparkles
      },
      {
        name: 'She Sharp',
        url: 'https://www.shesharp.org.nz/',
        description: 'Women in Technology Community',
        icon: Users
      }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Developer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Developer</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img 
              src="https://github.com/ChanMeng666.png" 
              alt="Chan Meng"
              className="w-12 h-12 rounded-full border-2 border-blue-200"
            />
            <div>
              <a
                href={links.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors"
              >
                <span>{links.developer.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-sm text-gray-600 mt-1">{links.developer.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Project</h3>
        </div>
        
        <div className="space-y-3">
          <a
            href={links.project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm group-hover:underline">View Source Code</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href={links.project.deployment}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm group-hover:underline">Live Demo</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </motion.div>

      {/* Organizers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Event Organizers</h3>
        </div>
        
        <div className="space-y-3">
          {links.organizers.map((organizer, index) => {
            const IconComponent = organizer.icon;
            return (
              <motion.a
                key={organizer.name}
                href={organizer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <IconComponent className="w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium group-hover:underline">{organizer.name}</span>
                  <span className="text-xs text-gray-500">{organizer.description}</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-4 border-t border-gray-200"
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>AI Hackathon Festival 2025 - Interactive Assistant</span>
          </div>
          
          <div className="text-sm text-gray-500">
            <span>© {currentYear} Chan Meng • Built with ❤️ for the AI community</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
