import Anthropic from '@anthropic-ai/sdk';
import { loadBrandContent } from '@/lib/brand-content';
import { loadConfig } from '@/lib/config';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'ANTHROPIC_API_KEY is not configured. Please add it to your .env.local file.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    const brandContent = loadBrandContent();
    const config = loadConfig();

    const systemPrompt = `You are a helpful brand messaging assistant for ${config.companyName}. Your role is to help team members create content that aligns with the brand guidelines.

Here are the complete brand guidelines:

${brandContent}

When helping users:
1. Always ensure the content matches the brand voice and tone
2. Reference specific guidelines when relevant
3. Provide concrete examples
4. Ask clarifying questions if needed
5. Offer alternatives when appropriate

Be concise and actionable in your responses.`;

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system: systemPrompt,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
