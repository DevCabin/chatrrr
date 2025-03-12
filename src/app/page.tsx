'use client';

import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

export default function Home() {
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoStart, setAutoStart] = useState(true);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true
  });

  useEffect(() => {
    if (autoStart && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [autoStart, browserSupportsSpeechRecognition]);

  // Debounce the transcript processing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (transcript && !isProcessing) {
      timeoutId = setTimeout(() => {
        handleSubmit();
      }, 1500); // Wait 1.5 seconds of silence before processing
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [transcript, isProcessing]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setAutoStart(false);
    } else {
      resetTranscript();
      setResponse('');
      SpeechRecognition.startListening({ continuous: true });
      setAutoStart(true);
    }
  };

  const handleSubmit = async () => {
    if (!transcript.trim() || isProcessing) return;

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
      resetTranscript(); // Clear transcript after processing
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      // Resume listening after speaking if autoStart is enabled
      if (autoStart && !listening) {
        SpeechRecognition.startListening({ continuous: true });
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Your browser doesn't support speech recognition. Please use Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Voice Chat</h1>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                listening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {listening ? '🎤 Recording...' : '🎤 Start Recording'}
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
