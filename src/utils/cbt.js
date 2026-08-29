import { trackEvent } from './analytics';

export const DEFAULT_CBT_URL = 'https://cbt-frontend-pied.vercel.app';

export const CBT_ROUTES = {
  HOME: '/',
  TESTS: '/tests',
  LOGIN: '/login',
  SIGNUP: '/signup'
};

/**
 * Resolves full CBT portal URL with environment variable support
 * @param {string} [path=''] - Optional sub-route (e.g. '/tests', '/login')
 * @returns {string} Fully qualified CBT URL
 */
export function getCbtUrl(path = '') {
  let baseUrl =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_CBT_PORTAL_URL
      ? import.meta.env.VITE_CBT_PORTAL_URL
      : DEFAULT_CBT_URL;

  // Clean trailing slash from baseUrl
  baseUrl = baseUrl.replace(/\/+$/, '');

  // Normalize path with leading slash
  if (!path) return baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Dispatches analytics telemetry and opens CBT portal securely
 * @param {string} [path='/'] - Target path
 * @param {string} [source='direct'] - Trigger source location for analytics
 */
export function openCbtPortal(path = '/', source = 'direct') {
  const targetUrl = getCbtUrl(path);

  trackEvent('cbt_portal_click', {
    url: targetUrl,
    path,
    source
  });

  if (typeof window !== 'undefined' && window.open) {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}
