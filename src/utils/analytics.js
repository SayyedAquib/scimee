// ==============================================================================
// SCIMEE CONVERSION & EVENT TELEMETRY
// Graceful tracking for Google Analytics / Vercel Analytics / Custom Telemetry
// ==============================================================================

export function trackEvent(eventName, eventParams = {}) {
  // Early return if eventName is invalid
  if (!eventName || typeof eventName !== 'string') {
    return;
  }

  const safeParams =
    eventParams && typeof eventParams === 'object' && !Array.isArray(eventParams)
      ? eventParams
      : {};

  try {
    // 1. Google Analytics (gtag.js) with optional chaining
    if (typeof window !== 'undefined' && typeof window?.gtag === 'function') {
      window.gtag('event', eventName, safeParams);
    }

    // 2. Vercel Analytics (va) with optional chaining
    if (typeof window !== 'undefined' && typeof window?.va === 'function') {
      window.va('event', { name: eventName, data: safeParams });
    }

    // 3. Development debug log with optional chaining
    if (import.meta?.env?.DEV) {
      console.log(`[SCIMEE Analytics] ${eventName}`, safeParams);
    }
  } catch (err) {
    // Graceful exception capture without disrupting user flow
    if (import.meta?.env?.DEV) {
      console.warn(`[SCIMEE Analytics Warning] Failed to dispatch event "${eventName}":`, err);
    }
  }
}
