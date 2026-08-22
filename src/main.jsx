import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/globals.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Register PWA Service Worker for offline resilience & high-speed caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        if (import.meta.env.DEV) {
          console.log('[SCIMEE PWA] Service Worker registered successfully:', reg.scope);
        }
      })
      .catch((err) => {
        console.error('[SCIMEE PWA] Service Worker registration failed:', err);
      });
  });
}
