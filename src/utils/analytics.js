// ==============================================================================
// SCIMEE CONVERSION & EVENT TELEMETRY
// Graceful tracking for Google Analytics / Vercel Analytics / Custom Telemetry
// ==============================================================================

export function trackEvent(eventName, eventParams = {}) {
  try {
    // 1. Google Analytics (gtag.js)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    // 2. Vercel Analytics (va)
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: eventName, data: eventParams });
    }

    // 3. Development debug log
    if (import.meta.env.DEV) {
      console.log(`[SCIMEE Analytics] ${eventName}`, eventParams);
    }
  } catch (err) {
    // Silently fail to ensure user experience is never impacted
  }
}
