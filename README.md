# Chatrrr

Speech → Claude → Notion → Claude → Speech

A voice chat interface for Claude AI, built with Next.js and Web Speech API.

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
   - Google Sheets integration for data storage
   - Read/write capabilities
   - Structured data management
   - Easy to set up and maintain

## Technical Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Voice**: Web Speech API (built into modern browsers)
- **AI**: Anthropic Claude API
- **Data Storage**: Google Sheets API
- **Deployment**: Vercel

## TODO List

### Phase 1: Voice Interface (Priority)
- [ ] Set up Next.js project with Vercel deployment
- [ ] Implement Web Speech API for speech-to-text
- [ ] Add text-to-speech functionality
- [ ] Create voice recording controls
- [ ] Add visual feedback for voice input/output

### Phase 2: Claude Integration
- [ ] Set up Claude API integration
- [ ] Implement conversation handling
- [ ] Add context management
- [ ] Create response processing
- [ ] Error handling and retry logic

### Phase 3: Data Storage
- [ ] Set up Google Sheets API
- [ ] Create data read/write functions
- [ ] Implement data structure/schema
- [ ] Add error handling for data operations
- [ ] Create backup/recovery process

### Phase 4: Polish
- [ ] Add loading states and animations
- [ ] Improve error messages
- [ ] Add usage instructions
- [ ] Implement basic analytics
- [ ] Add security measures

## Environment Variables Required

```env
CLAUDE_API_KEY=your-api-key
GOOGLE_SHEETS_CREDENTIALS=your-credentials
GOOGLE_SHEETS_ID=your-sheet-id
```

## Getting Started

1. Clone the repository
2. Deploy to Vercel
3. Set up environment variables
4. Configure Google Sheets access
5. Start using the application

## Notes

- All development and testing will be done directly on Vercel
- No local development environment required
- Uses browser-native APIs for voice features
- Minimal dependencies for maximum reliability

## Features

- Real-time speech recognition
- Natural voice interaction with Claude AI
- Automatic deployment via voice command ("go")
- Error handling and logging
- Modern, responsive UI

## Development

To run locally:

```bash
npm install
npm run dev
```

Last tested: March 11, 2024 - All features working
Deployment: Automatic via voice command "go"
