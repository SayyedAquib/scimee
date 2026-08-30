import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/globals.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const mountApp = () => {
  if (typeof document === 'undefined') return;

  const container = document?.getElementById?.('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    if (import.meta?.env?.DEV) {
      console.error('[SCIMEE] Failed to render root container:', err);
    }
  }
};

mountApp();

// Register PWA Service Worker for offline resilience & high-speed caching
if (
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  'serviceWorker' in navigator &&
  import.meta?.env?.PROD
) {
  try {
    window?.addEventListener?.('load', () => {
      try {
        navigator?.serviceWorker
          ?.register?.('/sw.js')
          ?.then((reg) => {
            if (import.meta?.env?.DEV) {
              console.log('[SCIMEE PWA] Service Worker registered successfully:', reg?.scope);
            }
          })
          ?.catch((err) => {
            if (import.meta?.env?.DEV) {
              console.warn('[SCIMEE PWA] Service Worker registration failed:', err);
            }
          });
      } catch (err) {
        if (import.meta?.env?.DEV) {
          console.warn('[SCIMEE PWA] Failed to invoke register:', err);
        }
      }
    });
  } catch {
    // Graceful fallback
  }
}
