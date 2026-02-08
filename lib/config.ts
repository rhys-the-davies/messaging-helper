import { readFileSync } from 'fs';
import { join } from 'path';

export type AppConfig = {
  companyName: string;
  primaryColor: string;
  tagline: string;
  welcomeMessage: string;
  suggestions: Array<{
    icon: string;
    text: string;
    description: string;
  }>;
};

let cachedConfig: AppConfig | null = null;

export function loadConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const configPath = join(process.cwd(), 'config.json');
    const configFile = readFileSync(configPath, 'utf-8');
    cachedConfig = JSON.parse(configFile);
    return cachedConfig as AppConfig;
  } catch (error) {
    console.error('Error loading config.json:', error);
    // Return default config if file doesn't exist
    return {
      companyName: 'Your Company',
      primaryColor: '#0070f3',
      tagline: 'Get help creating brand-consistent content',
      welcomeMessage: 'I\'m here to help you create content that aligns with your brand guidelines.',
      suggestions: [
        { icon: '✉️', text: 'Customer emails', description: 'Professional and warm' },
        { icon: '📢', text: 'Product announcements', description: 'Clear and exciting' },
        { icon: '✨', text: 'Marketing copy', description: 'Persuasive and on-brand' },
      ],
    };
  }
}
