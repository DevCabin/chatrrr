# Chatrrr

Speech → Claude → Notion → Claude → Speech

A voice chat interface for Claude AI, built with Next.js and Web Speech API.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://chatrrr.vercel.app)

## Features

- Voice input using Web Speech API (Chrome/Edge browsers)
- Direct integration with Claude AI
- Real-time transcript display
- Manual recording controls
- Clean, responsive UI
- Comprehensive error handling and logging
- Message history with chat-style interface

## Core Features

1. **Voice Interface**
   - Browser-based speech-to-text using Web Speech API
   - Text-to-speech using Web Speech Synthesis API
   - Real-time voice input and output
   - No local dependencies required

2. **Claude AI Integration**
   - Direct integration with Claude API
   - Context-aware conversations
   - Knowledge retrieval and reasoning
   - Structured response handling

3. **Data Integration**
   - Notion integration for data storage (coming soon)
   - Read/write capabilities
   - Structured data management
   - Easy to set up and maintain

## Technical Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Voice**: Web Speech API (built into modern browsers)
- **AI**: Anthropic Claude API
- **Data Storage**: Notion API (planned)
- **Deployment**: Vercel

## Deployment Status

- **Production**: [chatrrr.vercel.app](https://chatrrr.vercel.app)
- **Status**: [![Vercel Status](https://img.shields.io/github/deployments/DevCabin/chatrrr/production?label=vercel&logo=vercel)](https://chatrrr.vercel.app)

## Environment Variables Required

```env
CLAUDE_API_KEY=your-api-key
NOTION_API_KEY=your-api-key (coming soon)
NOTION_DATABASE_ID=your-database-id (coming soon)
```

## Quick Start

1. Fork or clone the repository
2. Connect your repository to Vercel:
   ```bash
   vercel link
   ```
3. Add your environment variables:
   ```bash
   vercel env add CLAUDE_API_KEY
   ```
4. Deploy:
   ```bash
   vercel deploy
   ```

Or use the automatic deployment by saying "go" in the voice interface.

## Development

While the project is designed for direct Vercel deployment, you can run it locally:

```bash
npm install
npm run dev
```

## Voice Commands

- **"Go"**: Triggers automatic deployment
- More commands coming soon...

## Browser Support

- Chrome (recommended)
- Edge
- Other Chromium-based browsers
- Firefox (limited support)
- Safari (limited support)

## Notes

- All development and testing is done directly on Vercel
- Uses browser-native APIs for voice features
- Minimal dependencies for maximum reliability
- Automatic deployment via voice command

Last tested: March 11, 2024 - All features working
Deployment: Automatic via voice command "go"
