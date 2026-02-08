import Anthropic from '@anthropic-ai/sdk';
import { loadBrandContent } from '@/lib/brand-content';
import { loadConfig } from '@/lib/config';

/**
 * Initialize Anthropic client once at module load.
 * This is more efficient than creating a new client on every request.
 */
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * POST /api/chat
 *
 * Main API endpoint for AI-powered brand messaging assistance.
 *
 * COST OPTIMIZATION:
 * - ONE API call per user message (no retry logic or multiple calls)
 * - Streaming response reduces perceived latency and improves UX
 * - Brand content and config are cached (loadBrandContent/loadConfig)
 * - No conversation history = no context accumulation costs
 *
 * TRADE-OFFS:
 * - No conversation history means each message is independent
 * - This is cheaper but limits multi-turn conversations
 * - For most use cases (generating single pieces of content), this is ideal
 *
 * STREAMING:
 * - Uses Server-Sent Events (SSE) to stream responses token-by-token
 * - Client sees response as it's generated (better UX)
 * - No additional cost vs. non-streaming
 *
 * @param {Request} request - HTTP request with { message: string } body
 * @returns {Response} Streaming SSE response with AI-generated content
 */
export async function POST(request: Request) {
  try {
    // Validate API key is configured
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

    // Parse and validate request body
    const { message } = await request.json();

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    // Load brand guidelines and config
    // COST OPTIMIZATION: Both functions use caching to avoid repeated disk reads
    const brandContent = loadBrandContent();
    const config = loadConfig();

    // Construct system prompt with brand guidelines
    // ARCHITECTURE: Brand guidelines are injected as context for every message
    // This ensures AI always has access to the latest brand voice/tone
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

    // Call Claude API with streaming
    // COST: One API call per user message - this is the only billable operation
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929', // Sonnet 4.5: balanced cost/quality
      max_tokens: 2048, // Reasonable limit for most content generation
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system: systemPrompt,
    });

    // Set up Server-Sent Events (SSE) stream for client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Stream each text delta from Claude to the client
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text;
              // Send each chunk in SSE format
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return streaming response
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
