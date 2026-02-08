import { loadConfig } from '@/lib/config';

export async function GET() {
  try {
    const config = loadConfig();
    return Response.json(config);
  } catch (error) {
    console.error('Error loading config:', error);
    return Response.json(
      {
        companyName: 'Your Company',
        primaryColor: '#0070f3',
        tagline: 'Get help creating brand-consistent content',
        welcomeMessage: 'I\'m here to help you create content that aligns with your brand guidelines.',
        suggestions: [
          { icon: '✉️', text: 'Customer emails', description: 'Professional and warm' },
          { icon: '📢', text: 'Product announcements', description: 'Clear and exciting' },
          { icon: '✨', text: 'Marketing copy', description: 'Persuasive and on-brand' },
        ],
      },
      { status: 200 }
    );
  }
}
