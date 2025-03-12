'use client';

import { useState, useEffect, useRef } from 'react';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        if (recognitionRef.current) {
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;

          recognitionRef.current.onresult = (event) => {
            lastSpeechRef.current = Date.now();
            const transcript = Array.from(event.results)
              .map(result => result[0])
              .map(result => result.transcript)
              .join('');
            setTranscript(transcript);
            
            // Reset silence detection timer
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
            silenceTimeoutRef.current = setTimeout(() => {
              if (isListening && recognitionRef.current) {
                console.log('Silence detected, stopping recording...');
                recognitionRef.current.stop();
              }
            }, 2000); // 2 seconds of silence
          };

          recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
            // Only submit if we have a transcript and some time has passed since last speech
            if (transcript.trim() && Date.now() - lastSpeechRef.current > 1000) {
              handleSubmit();
            }
          };
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [transcript]);

  const toggleListening = () => {
    if (!isListening) {
      setTranscript('');
      setResponse('');
      lastSpeechRef.current = Date.now();
      recognitionRef.current?.start();
      setIsListening(true);
    } else {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: transcript }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setResponse(data.response);
      speak(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Voice Chat</h1>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? '🎤 Recording...' : '🎤 Start Recording'}
            </button>
          </div>

          {transcript && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-medium text-gray-700 mb-2">You said:</h2>
              <p className="text-gray-600">{transcript}</p>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-sm text-gray-500">Processing with Claude...</p>
            </div>
          )}

          {response && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="font-medium text-blue-700 mb-2">Claude's Response:</h2>
              <p className="text-gray-600">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
