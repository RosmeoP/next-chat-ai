import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    console.log('API route called');
    const { messages } = await req.json();
    console.log('Messages received:', messages);

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    console.log('StreamText completed');
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}