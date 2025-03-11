import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  onStop?: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

export function useSpeechRecognition({
  onTranscript,
  onError,
  onStop
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef(true);
  const initializationRef = useRef<Promise<void> | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    console.log('SpeechRecognition: Hook mounted');
    
    return () => {
      console.log('SpeechRecognition: Hook unmounting');
      isMountedRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, []);

  const initializeRecognition = useCallback(async () => {
    if (initializationRef.current) {
      return initializationRef.current;
    }

    console.log('SpeechRecognition: Initializing');
    initializationRef.current = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Speech recognition is not available in this environment'));
        return;
      }

      try {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognition) {
          throw new Error('Speech recognition is not supported in this browser');
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          console.log('SpeechRecognition: Started listening');
          if (isMountedRef.current) {
            setIsListening(true);
            setTranscript('');
          }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (!isMountedRef.current) return;
          
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          
          // Use requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
            if (isMountedRef.current) {
              setTranscript(transcript);
              onTranscript?.(transcript);
            }
          });
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (!isMountedRef.current) return;
          
          console.error('SpeechRecognition: Error occurred:', {
            error: event.error,
            message: event.message
          });

          // Handle network errors specifically
          if (event.error === 'network') {
            console.log('SpeechRecognition: Network error detected, attempting restart');
            // Stop current recognition
            recognition.stop();
            // Attempt restart after a delay
            if (restartTimeoutRef.current) {
              clearTimeout(restartTimeoutRef.current);
            }
            restartTimeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                console.log('SpeechRecognition: Attempting restart after network error');
                recognition.start();
              }
            }, 1000);
          }

          onError?.(event.error);
        };

        recognition.onend = () => {
          console.log('SpeechRecognition: Ended');
          if (isMountedRef.current) {
            setIsListening(false);
            onStop?.();
          }
        };

        recognitionRef.current = recognition;
        console.log('SpeechRecognition: Initialized successfully');
        resolve();
      } catch (error) {
        console.error('SpeechRecognition: Initialization error:', error);
        reject(error);
      }
    });

    return initializationRef.current;
  }, [onTranscript, onError, onStop]);

  const toggleListening = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      console.log('SpeechRecognition: Toggling recognition');
      await initializeRecognition();
      
      if (!recognitionRef.current) {
        throw new Error('Speech recognition not initialized');
      }

      if (isListening) {
        console.log('SpeechRecognition: Stopping recognition');
        recognitionRef.current.stop();
      } else {
        console.log('SpeechRecognition: Starting recognition');
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('SpeechRecognition: Toggle error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to toggle speech recognition');
    }
  }, [isListening, initializeRecognition, onError]);

  return {
    isListening,
    transcript,
    toggleListening,
    setTranscript
  };
} 