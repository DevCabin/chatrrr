import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // TODO: Implement Claude API integration
    const mockResponse = `Received: ${message}`;
    
    return NextResponse.json({ response: mockResponse });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 