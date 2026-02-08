/**
 * SERVER-ONLY MODULE
 * This file uses Node.js 'fs' module and should NEVER be imported on the client.
 * Brand content is loaded server-side and sent to AI via API routes.
 */
import 'server-only';

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Cached brand content to avoid reading from disk on every API request.
 * This significantly reduces I/O and improves response time.
 * Cache is cleared when the process restarts (e.g., on deployment).
 */
let cachedBrandContent: string | null = null;

/**
 * Loads brand guidelines from markdown files in the /content directory.
 *
 * COST OPTIMIZATION: Results are cached in memory to avoid:
 * - Reading from disk on every API request
 * - Re-parsing markdown files repeatedly
 * - Unnecessary I/O operations
 *
 * The cache is only cleared on process restart, which happens on:
 * - New deployment (Vercel automatically restarts)
 * - Manual server restart (dev mode)
 * - Content updates require redeployment for changes to take effect
 *
 * @returns {string} Concatenated markdown content from all .md files in /content,
 *                   or an error message if loading fails.
 *
 * @example
 * // In API route
 * const guidelines = loadBrandContent();
 * // First call reads from disk, subsequent calls use cache
 */
export function loadBrandContent(): string {
  // Return cached content if available (cost optimization)
  if (cachedBrandContent !== null) {
    return cachedBrandContent;
  }

  const contentDir = join(process.cwd(), 'content');

  try {
    // Read all markdown files from /content directory
    const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
      const fallbackMessage = 'No brand guidelines have been configured yet. Please add markdown files to the /content directory.';
      cachedBrandContent = fallbackMessage;
      return fallbackMessage;
    }

    // Concatenate all markdown files with separators
    // Each file is prefixed with its filename for context
    const content = files.map(file => {
      const filePath = join(contentDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      return `# ${file}\n\n${fileContent}`;
    }).join('\n\n---\n\n');

    // Cache for future requests (cost optimization)
    cachedBrandContent = content;
    return content;
  } catch (error) {
    console.error('Error loading brand content:', error);
    const errorMessage = 'Error loading brand guidelines. Please ensure the /content directory exists and contains markdown files.';
    // Don't cache errors - allow retry on next request
    return errorMessage;
  }
}
