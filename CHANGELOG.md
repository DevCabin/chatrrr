# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2024-03-11

### Changed
- Switched to react-speech-recognition library for improved voice interaction:
  - Better continuous conversation support
  - More reliable speech detection
  - Built-in browser compatibility checking
  - Automatic handling of WebKit prefixes
- Enhanced conversation flow:
  - Auto-restart after Claude finishes speaking
  - 1.5 second silence detection before processing
  - Proper cleanup of speech recognition resources
  - Better error handling and browser support detection
- Improved user experience:
  - Automatically starts listening on page load
  - Continues listening after Claude's response
  - Clears transcript after processing
  - Shows browser compatibility warning if needed

## [0.2.0] - 2024-03-11

### Added
- Enhanced voice interaction:
  - Automatic speech detection with 2-second silence detection
  - Visual feedback for recording, processing, and error states
  - Automatic conversation flow without manual controls
  - Speech synthesis for Claude responses
- Improved error handling:
  - Detailed error logging in API routes
  - Automatic error recovery
  - User-friendly error messages
  - Visual error state indicators
- Special commands:
  - Added "go" command for automated deployment
  - Integrated Git and Vercel deployment workflow
- UI Improvements:
  - Status indicator with state feedback
  - Animated message bubbles
  - Better visual hierarchy
  - Improved loading states
  - Smooth transitions and animations

### Changed
- Updated speech recognition flow to be more natural
- Enhanced Claude API integration with better error handling
- Improved component lifecycle management
- Optimized state updates and transitions
- Enhanced visual design with new animations

### Fixed
- Speech recognition state management
- Error handling in API routes
- Component cleanup on unmount
- Message visibility and styling
- Race conditions in state updates

## [0.1.2] - 2024-03-11

### Changed
- Simplified deployment configuration:
  - Removed development-specific settings
  - Optimized Next.js config for production
  - Added Vercel-specific configuration
- Updated environment variable handling
- Streamlined build process for direct Vercel deployment

### Fixed
- Build configuration for direct Vercel deployment
- Environment variable configuration
- Removed unnecessary development settings

## [0.1.1] - 2024-03-11

### Added
- Initial project setup with virtual environment
- Basic speech recognition using Vosk
- Text-to-speech functionality using pyttsx3
- Audio device selection interface
- Simple conversation handling
- Basic response system
- Project documentation (README.md)
- Development roadmap
- This changelog

### Changed
- Switched from OpenAI Whisper to Vosk for offline speech recognition
- Implemented queue-based audio processing
- Added proper error handling

### Technical Details
- Using Vosk small English model (vosk-model-small-en-us-0.15)
- Implemented threading for audio processing
- Added proper cleanup for audio resources
- Set up error handling for audio devices
- Configured basic voice properties (rate: 150, volume: 0.9)

### Dependencies
- vosk
- transformers
- pyttsx3
- sounddevice
- scipy

## [0.1.0-speech2text] - 2024-03-11

### Added
- Basic Next.js 14 project structure with App Router
- Speech-to-text functionality using Web Speech API
- Basic UI with recording controls
- Vercel deployment configuration
- Mock API endpoint for future Claude integration
- Environment variable setup
- Comprehensive documentation

### Working Features
- Speech-to-text conversion
- Recording start/stop controls
- Real-time transcript display
- Vercel deployment
- Basic error handling

### Known Limitations
- Claude AI integration pending
- Notion integration planned for future
- Text-to-speech not implemented yet
- Limited browser support (works best in Chrome/Edge)

## [Unreleased]

### TODO - Voice Interaction Improvements
- Implement Voice Activity Detection (VAD) for automatic speech detection:
  - Add automatic pause detection to stop recording when user stops speaking
  - Implement dynamic threshold adjustment based on ambient noise
  - Add visual feedback showing speech detection status
- Enhance conversation flow:
  - Auto-start processing after speech ends (remove manual stop)
  - Add visual transcription feedback while speaking
  - Show "Processing..." state during Claude API call
  - Implement smooth transitions between states
- Add error recovery and feedback:
  - Clear visual/audio feedback for connection issues
  - Automatic retry for failed API calls
  - Fallback options when speech recognition fails
- Improve accessibility:
  - Add visual indicators for microphone status
  - Implement keyboard shortcuts for start/stop
  - Show estimated response time during processing
- Performance optimizations:
  - Implement WebSocket for faster Claude responses
  - Add response streaming for longer answers
  - Optimize speech recognition parameters for latency

### TODO - UI/UX Improvements
- Research and evaluate implementation of the following UI kits:
  - shadcn/ui (Free, Priority Choice):
    - Built specifically for Next.js and Radix UI
    - Offers dark mode support out of the box
    - Includes accessible chat components
    - Has excellent TypeScript support
  - Flowbite (Free):
    - 400+ Tailwind components
    - Specific chat/messaging components
    - Good documentation and examples
    - Active community support
  - DaisyUI (Free):
    - Lightweight and customizable
    - Chat bubbles and messaging components
    - Theme system with dark mode
    - Easy to integrate with existing Tailwind setup
- Implement modern chat interface improvements:
  - Message bubbles with typing indicators
  - Smooth animations for state transitions
  - Better visual hierarchy for chat history
  - Improved mobile responsiveness
  - Accessibility enhancements
- Add visual polish:
  - Consistent color scheme and branding
  - Modern gradient backgrounds
  - Micro-interactions and feedback
  - Loading states and transitions
  - Error state styling

### TODO - Data Storage Integration
- Complete Notion integration:
  - Set up Notion API credentials in Vercel environment
  - Configure database ID and structure
  - Implement conversation history storage:
    - Save user messages and Claude responses
    - Store timestamps and session information
    - Add metadata (browser info, speech recognition status)
  - Add error handling and retry logic for API operations
  - Implement rate limiting to prevent quota issues
- Add conversation history features:
  - Display previous conversations
  - Allow searching through history
  - Enable continuing previous conversations
  - Add conversation export functionality
- Implement data management:
  - Add data retention policies
  - Implement backup mechanisms
  - Add data cleanup routines
  - Create admin interface for data management

### Added
- Initial Next.js project setup with TypeScript
- Basic project structure with app router
- TailwindCSS configuration
- ESLint setup for code quality
- Basic development scripts (dev, build, start, lint)
- Project structure for voice interface components
- Vercel serverless function configuration
- Detailed project roadmap in README
- Environment variable templates
- Directory structure for:
  - Voice interface components
  - DeepSpeech integration
  - Notion integration
- Claude AI Integration:
  - Claude API client setup with TypeScript
  - API route for Claude interactions
  - Error handling and type safety
  - Response parsing for text content
- Voice Chat Interface:
  - Real-time speech-to-text transcription
  - Chat message history display
  - Voice recording toggle button
  - Text-to-speech response playback
- Version display in footer
- Automatic deployment configuration in vercel.json
- Custom ErrorBoundary component for error handling
- Loading states for dynamic components
- Improved component error catching and reporting
- Build timestamp display in footer
- Cache prevention headers in Next.js config
- Loading state indicator for VoiceChat component
- Component load tracking with onLoad callback
- Enhanced UI with gradient backgrounds and animations
- Debug logging for component loading
- Improved loading animations
- Enhanced error tracking for dynamic imports
- Comprehensive error handling in VoiceChat
- Detailed debug logging
- Error state display UI
- Speech recognition status tracking
- Relocated VoiceChat component to app directory
- Direct component imports
- Improved component visibility
- Vercel configuration file for memory optimization
- Function memory limits for API routes
- Build and deployment settings
- Fixed Vercel function pattern matching
- Corrected API route file extensions
- Updated Vercel function pattern for Next.js App Router
- Corrected API route path pattern
- React useRef for speech recognition instance
- Proper cleanup in useEffect
- Memoized toggle function with useCallback
- Text color classes for better visibility
- Improved contrast in chat bubbles
- Speech recognition stop callback
- Processing state for API calls
- Better error handling for API responses
- TypeScript interfaces for speech recognition events
- Component mount tracking with isMountedRef
- Batched state updates for speech recognition
- Safe state updates in async operations
- Lazy initialization of speech recognition
- Speech synthesis reference management
- Initialization state tracking
- RequestAnimationFrame for smoother updates
- Vercel deployment configuration
- Notion API integration setup
- Environment variables configuration for production

### Changed
- Updated dependencies to stable versions:
  - Next.js 14.1.0
  - React 18.2.0
  - TypeScript 5.3.3
  - TailwindCSS 3.4.1
  - ESLint 8.56.0
- Simplified page layout with clean design
- Updated metadata with proper project title and description
- Switched from Geist to Inter font for better compatibility
- Updated Tailwind directives in globals.css
- Enhanced README with comprehensive documentation
- Switched from DeepSeek to Claude AI for simpler integration
- Improved Vercel deployment settings with explicit git configuration
- Enhanced dynamic component loading with proper error boundaries
- Updated version number to 1.0.4 for better tracking
- Improved component loading with explicit module exports
- Added build timestamp for better version tracking
- Improved Next.js configuration for development
- Simplified page layout and component structure
- Improved dynamic import implementation
- Updated version to 1.0.4
- Enhanced visual design with new gradients and animations
- Streamlined error handling approach
- Updated to version 1.0.5 with debug build
- Improved dynamic import error handling
- Enhanced loading state visuals
- Simplified component structure
- Added explicit error boundaries
- Simplified component architecture
- Removed complex TypeScript declarations
- Updated to version 1.0.6
- Streamlined dynamic imports
- Improved error feedback
- Enhanced debug visibility
- Updated component import paths
- Moved VoiceChat to app/components
- Updated to version 1.0.7
- Simplified import structure
- Optimized API function memory usage
- Reduced function duration limits
- Updated deployment configuration
- Updated function pattern in vercel.json
- Fixed serverless function configuration
- Modified function pattern to match app/api directory structure
- Updated serverless function configuration for App Router
- Improved component lifecycle management
- Enhanced state management
- Updated speech recognition initialization
- Fixed React component mounting issues
- Enhanced message bubble styling
- Updated transcript display visibility
- Improved speech recognition handling
- Enhanced API error handling
- Better TypeScript type safety
- Improved component lifecycle management
- Enhanced state update safety
- Better cleanup handling
- Improved speech recognition initialization
- Enhanced error handling for async operations
- Better state management for speech synthesis

### Fixed
- Replaced next.config.ts with next.config.js for better compatibility
- Removed experimental turbopack flag from dev script
- Added missing Tailwind configuration
- Fixed font configuration issues
- Removed unused image imports and simplified markup
- Fixed PostCSS configuration for Tailwind CSS
- Corrected Tailwind directives in global styles
- Added TypeScript declarations for Web Speech API
- Configured automatic deployments in Vercel
- Fixed dynamic import issues with VoiceChat component
- Added proper error handling for component loading
- Improved error reporting with custom ErrorBoundary
- Fixed cache issues with deployment timestamps
- Cache-related issues with Vercel deployment
- Next.js configuration to prevent caching
- Added Cache-Control headers
- Disabled etag generation during testing
- Implemented strict page reloading
- Component loading visibility issues
- Dynamic import error handling
- Added proper TypeScript declarations
- Improved error reporting
- TypeScript compilation issues
- Speech recognition initialization
- Component loading reliability
- Error state handling
- Dynamic import stability
- Component loading issues
- Import path resolution
- Dynamic component visibility
- Memory limit issues on Vercel free plan
- Deployment configuration conflicts
- Vercel function pattern matching error
- API route file extension mismatch
- Vercel function pattern matching for App Router
- API route path resolution in vercel.json
- React errors #425, #418, and #423
- Multiple component mount issues
- Speech recognition state management
- Component cleanup on unmount
- White text on light background issue
- Message visibility in chat interface
- Multiple transcript submissions
- Speech recognition state management
- API error handling
- TypeScript type errors in speech recognition
- React errors #425, #418, and #423
- Component unmount state updates
- Memory leaks in speech recognition
- Race conditions in state updates
- Storage access errors
- Speech recognition initialization issues
- Speech synthesis cleanup