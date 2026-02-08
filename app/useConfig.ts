'use client';

import { useState, useEffect } from 'react';
import type { AppConfig } from '@/lib/types';
import { DEFAULT_CONFIG } from '@/lib/types';

/**
 * Client-side React hook to load application configuration.
 *
 * ARCHITECTURE: Separates client-side config loading from server-side.
 * - Server uses loadConfig() directly (Node.js fs module)
 * - Client uses this hook (fetch API)
 *
 * COST OPTIMIZATION: Config API call happens once on mount, not on every render.
 * The /api/config endpoint is cached by the server, so this is lightweight.
 *
 * @returns {AppConfig} Configuration object with company branding.
 *                      Starts with DEFAULT_CONFIG, updates when API responds.
 *
 * @example
 * function MyComponent() {
 *   const config = useConfig();
 *   return <div style={{ color: config.primaryColor }}>...</div>;
 * }
 */
export function useConfig(): AppConfig {
  // Start with default config to avoid flash of unstyled content
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    // Fetch config from server on mount
    // This only happens once per page load
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => {
        console.error('Failed to load config:', err);
        // Keep default config on error
      });
  }, []); // Empty deps = run once on mount

  return config;
}
