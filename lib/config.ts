/**
 * SERVER-ONLY MODULE
 * This file uses Node.js 'fs' module and should NEVER be imported on the client.
 * Client code should use app/useConfig.ts hook instead.
 */
import 'server-only';

import { readFileSync } from 'fs';
import { join } from 'path';
import type { AppConfig } from './types';
import { DEFAULT_CONFIG } from './types';

/**
 * Cached configuration to avoid reading from disk repeatedly.
 * Cache is cleared on process restart (deployment or dev server restart).
 */
let cachedConfig: AppConfig | null = null;

/**
 * Loads application configuration from config.json.
 *
 * ARCHITECTURE: Config-driven customization is a core design principle.
 * Users should never need to edit code - only config.json and /content files.
 *
 * COST OPTIMIZATION: Results are cached in memory to avoid repeated disk reads.
 *
 * @returns {AppConfig} Application configuration object.
 *                      Returns DEFAULT_CONFIG if config.json is missing or invalid.
 *
 * @example
 * const config = loadConfig();
 * console.log(config.companyName); // "Acme Inc"
 */
export function loadConfig(): AppConfig {
  // Return cached config if available
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
    // Return default config if file doesn't exist or is invalid
    // Don't cache the default - allow retry on next request
    return DEFAULT_CONFIG;
  }
}
