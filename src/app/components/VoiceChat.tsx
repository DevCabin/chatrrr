'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastTranscriptRef = useRef<string>('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSendToClaude = async (text: string) => {
    if (!text.trim()) return;
    
    console.log('Sending to Claude:', text);
    setIsProcessing(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Claude response:', data);

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setIsProcessing(false);
    }
  };

  const { isListening, transcript, toggleListening } = useSpeechRecognition({
    onTranscript: (text) => {
      console.log('Transcript:', text);
      lastTranscriptRef.current = text;
    },
    onStop: () => {
      console.log('Speech stopped, sending:', lastTranscriptRef.current);
      handleSendToClaude(lastTranscriptRef.current);
    }
  });

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-4">
      <div className="w-full h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-gray-800 max-w-[80%] ${
                message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white shadow-sm mr-auto'
              }`}
            >
              {message.content}
            </div>
          ))}
          
          {transcript && (
            <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[80%] italic">
              {transcript}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={toggleListening}
          disabled={isProcessing}
          className={`px-6 py-2 rounded-lg ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop' : 'Start'} Recording
        </button>
      </div>

      {error && (
        <div className="text-red-500">
          Error: {error}
        </div>
      )}
    </div>
  );
} 