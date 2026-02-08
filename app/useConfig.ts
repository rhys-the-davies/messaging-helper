'use client';

import { useState, useEffect } from 'react';

type AppConfig = {
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

const defaultConfig: AppConfig = {
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

export function useConfig() {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => {
        console.error('Failed to load config:', err);
      });
  }, []);

  return config;
}
