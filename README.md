# AI Hackathon Festival 2025 - Interactive AI Assistant

A modern, full-featured AI assistant website designed to help students and mentors with all aspects of the AI Hackathon Festival 2025. Features a main chat interface with community-driven FAQ voting system.

## ✨ Features

### 🤖 **AI Chat Experience**
- **Full-Screen Chat Interface**: AI conversation as the main focus, not a popup
- **Smart Suggestions**: Pre-populated question suggestions for quick start
- **Real-time Streaming**: Powered by Google Gemini Pro with live responses
- **Enhanced Messages**: Rich formatting with timestamps and status indicators
- **Auto-resize Input**: Multi-line input with smart height adjustment

### 📋 **Community-Driven FAQ System**
- **Voting System**: Upvote/downvote questions for community ranking
- **Smart Sorting**: Questions automatically ranked by community feedback
- **Search & Filter**: Find specific questions by content or category
- **One-Click Integration**: Send any FAQ directly to chat for follow-up
- **View Tracking**: Track question popularity and engagement

### 🎨 **Modern UI/UX**
- **Responsive Layout**: Desktop (70/30 split) and mobile (tabbed) layouts
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Progressive Enhancement**: Features load gracefully with fallbacks
- **Accessibility**: Full keyboard navigation and screen reader support
- **Visual Feedback**: Hover effects, loading states, and status indicators

## Technology Stack

- **Framework**: Next.js 15.4.0 with App Router
- **Language**: TypeScript
- **AI Integration**: Vercel AI SDK v4.3.19 + Google Gemini Pro
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion v12.23.9
- **UI Components**: shadcn/ui + Radix UI

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Google Gemini API key

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

1. **Connect your repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your project from GitHub/GitLab/Bitbucket

2. **Add environment variables**:
   - In your Vercel project settings, add:
     - Key: `GOOGLE_GENERATIVE_AI_API_KEY`
     - Value: Your Google Gemini API key

3. **Deploy**:
   - Vercel will automatically build and deploy your project
   - Your chatbot will be live at your assigned Vercel URL

## 🚀 Usage

### **Main Interface**
- **Desktop**: Chat area (70%) + FAQ sidebar (30%) 
- **Mobile**: Swipe between Chat and FAQ tabs
- **Navigation**: Use top tabs or mobile menu to switch views

### **AI Chat Features**
- **Smart Start**: Click suggestion cards for common questions
- **Natural Conversation**: Ask anything in plain English
- **FAQ Integration**: Questions from FAQ automatically include context
- **Persistent History**: Conversations saved locally (50 messages max)
- **Rich Input**: Multi-line support with Shift+Enter for new lines

### **FAQ Voting System**
- **Vote**: 👍 Helpful / 👎 Not helpful on any question
- **Ranking**: Questions auto-sort by community score (upvotes - downvotes)
- **Search**: Find questions by keywords in title or content
- **Filter**: Browse by category (Event Info, Teams, Technical, etc.)
- **Send to Chat**: Click any question to continue in AI chat

### **For Students and Mentors**

Get instant help with:

- ✅ **Event Information**: Dates, location, schedule details
- ✅ **Team Formation**: How to form teams, ideal team composition  
- ✅ **Technical Requirements**: AI definitions, dataset usage, guidelines
- ✅ **Judging Process**: Criteria, presentation format, award categories
- ✅ **Logistics**: What to bring, venue rules, meal arrangements
- ✅ **Support**: How to contact mentors, Discord usage, troubleshooting

### **Interaction Flow**
1. **Start**: Open website → see chat suggestions or browse FAQ
2. **Ask**: Click suggestions, send FAQ to chat, or type custom questions  
3. **Engage**: Vote on helpful FAQs, ask follow-ups, explore topics
4. **Continue**: Your progress saves automatically across sessions

## 📁 Project Structure

```
ai-hackathon-chatbot/
├── app/
│   ├── api/chat/route.ts          # Gemini AI integration
│   ├── globals.css                # Global styles + animations
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main interface with chat + FAQ
├── components/
│   ├── chat/
│   │   ├── embedded-chat.tsx      # Main chat interface
│   │   ├── chat-suggestions.tsx   # Starter question cards
│   │   └── chat-message.tsx       # Message display component
│   ├── faq/
│   │   ├── faq-list.tsx          # FAQ list with search/filter
│   │   └── faq-card.tsx          # Individual FAQ with voting
│   ├── chatbot/                   # Shared chat components
│   │   ├── typing-indicator.tsx   # AI typing animation
│   │   ├── preset-questions.ts    # Question database
│   │   └── types.ts              # TypeScript interfaces
│   └── ui/                        # Reusable UI components
│       ├── button.tsx             # Button component
│       ├── dialog.tsx             # Modal dialogs
│       ├── scroll-area.tsx        # Custom scrollbar
│       ├── loading-skeleton.tsx   # Loading states
│       └── toast.tsx              # Notification system
├── hooks/
│   └── use-faq-voting.ts          # FAQ voting logic & persistence
├── lib/
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
```

## Customization

### Adding New Preset Questions

Edit `components/chatbot/preset-questions.ts`:

```typescript
{
  id: 'unique-id',
  category: 'event-info', // or other category
  question: 'Your question here?',
  answer: 'The detailed answer...'
}
```

### Modifying AI Behavior

Update the system prompt in `app/api/chat/route.ts` to change how the AI responds.

### Styling Changes

- Global styles: `app/globals.css`
- Component styles: Individual component files using Tailwind classes
- Theme colors: `tailwind.config.js`

## Troubleshooting

### Common Issues

1. **API Key Not Working**:
   - Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is set in `.env.local`
   - Restart the development server after adding environment variables

2. **Build Errors**:
   - Check for TypeScript errors: `npm run build`
   - Ensure all imports are correct

3. **Chat Not Opening**:
   - Check browser console for JavaScript errors
   - Verify all dependencies are installed

### Development Tips

- Use the browser's developer tools to monitor API requests
- Check the console for any error messages
- Test keyboard shortcuts work in your browser

## Support

This chatbot is designed specifically for the AI Hackathon Festival 2025. For technical issues with the website itself, check the troubleshooting section above.

For hackathon-related questions, use the chatbot - that's what it's for! 🤖

## License

This project is created for the AI Hackathon Festival 2025 event.
