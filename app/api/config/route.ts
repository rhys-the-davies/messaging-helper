import { loadConfig } from '@/lib/config';
import { DEFAULT_CONFIG } from '@/lib/types';

/**
 * GET /api/config
 *
 * Returns application configuration for client-side use.
 *
 * ARCHITECTURE: This endpoint allows the client to fetch config without
 * bundling it into the JavaScript bundle. This means:
 * - Config can change without rebuilding the app
 * - Config isn't exposed in page source
 * - Smaller initial page load
 *
 * COST OPTIMIZATION: loadConfig() is cached server-side, so this is fast.
 * Vercel also caches this endpoint automatically.
 *
 * @returns {Response} JSON response with AppConfig object
 */
export async function GET() {
  try {
    const config = loadConfig();
    return Response.json(config);
  } catch (error) {
    console.error('Error loading config:', error);
    // Return default config on error (don't expose error to client)
    return Response.json(DEFAULT_CONFIG, { status: 200 });
  }
}
