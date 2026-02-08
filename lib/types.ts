/**
 * Shared types and constants that can be imported by both server and client.
 * NO Node.js dependencies (like 'fs') allowed in this file.
 */

/**
 * Application configuration schema.
 * All UI customization is controlled through config.json.
 */
export type AppConfig = {
  /** Company name displayed in header */
  companyName: string;
  /** Primary brand color in hex format (e.g., "#FF6B35") */
  primaryColor: string;
  /** Tagline shown below company name */
  tagline: string;
  /** Initial welcome message from AI (currently unused) */
  welcomeMessage: string;
  /** Use case suggestions shown on welcome screen */
  suggestions: Array<{
    /** Emoji icon */
    icon: string;
    /** Short use case name */
    text: string;
    /** Brief description */
    description: string;
  }>;
};

/**
 * Default configuration used as fallback.
 * Centralized here so both server and client can access it safely.
 */
export const DEFAULT_CONFIG: AppConfig = {
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
