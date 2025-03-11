import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function queryClaude(prompt: string, systemPrompt?: string) {
  try {
    console.log('Sending request to Claude...');
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: prompt }
      ],
    });

    console.log('Received response from Claude');
    return message.content[0].text;
  } catch (error) {
    console.error('Error querying Claude:', error);
    throw error;
  }
} 