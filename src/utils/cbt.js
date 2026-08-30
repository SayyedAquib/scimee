import { trackEvent } from './analytics';
import siteConfig from '../data/site-config.json';

export const DEFAULT_CBT_URL = 'https://cbt-frontend-pied.vercel.app';

export const CBT_ROUTES = Object.freeze({
  HOME: '/',
  TESTS: '/tests',
  LOGIN: '/login',
  SIGNUP: '/signup'
});

/**
 * Resolves full CBT portal URL with environment variable support and safe fallbacks
 * @param {string} [path=''] - Optional sub-route (e.g. '/tests', '/login')
 * @returns {string} Fully qualified CBT URL
 */
export function getCbtUrl(path = '') {
  let baseUrl =
    typeof import.meta !== 'undefined' && import.meta?.env?.VITE_CBT_PORTAL_URL
      ? import.meta.env.VITE_CBT_PORTAL_URL
      : DEFAULT_CBT_URL;

  // Clean trailing slash from baseUrl safely
  baseUrl = (baseUrl || DEFAULT_CBT_URL).replace(/\/+$/, '');

  // Early return if path is empty or falsy
  if (!path || typeof path !== 'string') {
    return baseUrl;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return baseUrl;
  }

  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Dispatches analytics telemetry and opens CBT portal securely
 * @param {string} [path='/'] - Target path
 * @param {string} [source='direct'] - Trigger source location for analytics
 */
export function openCbtPortal(path = '/', source = 'direct') {
  const safePath = typeof path === 'string' ? path : '/';
  const safeSource = typeof source === 'string' ? source : 'direct';
  const targetUrl = getCbtUrl(safePath);

  try {
    trackEvent('cbt_portal_click', {
      url: targetUrl,
      path: safePath,
      source: safeSource
    });

    if (typeof window !== 'undefined' && typeof window?.open === 'function') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    if (import.meta?.env?.DEV) {
      console.error('[SCIMEE CBT Portal Navigation Error]', err);
    }
  }
}
