import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') return true;
    return navigator?.onLine ?? true;
  });
  const [wasOffline, setWasOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timer = null;

    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setShowRestored(true);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => setShowRestored(false), 3500);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      if (timer) clearTimeout(timer);
      setShowRestored(false);
    };

    try {
      window?.addEventListener?.('online', handleOnline);
      window?.addEventListener?.('offline', handleOffline);
    } catch {
      // Graceful fallback
    }

    return () => {
      if (timer) clearTimeout(timer);
      try {
        window?.removeEventListener?.('online', handleOnline);
        window?.removeEventListener?.('offline', handleOffline);
      } catch {
        // Cleanup safety
      }
    };
  }, [wasOffline]);

  // Early return if online and no restored toast needs to be shown
  if (isOnline && !showRestored) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        animation: 'appleSlideUp 250ms var(--spring-snappy)',
        maxWidth: '92vw'
      }}
    >
      {!isOnline ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: 'rgba(254, 243, 199, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.18)',
            color: '#92400e',
            fontSize: '0.82rem',
            fontWeight: '700'
          }}
        >
          <WifiOff size={15} color="#d97706" style={{ flexShrink: 0 }} />
          <span>Offline Mode Active • Saved syllabus &amp; call buttons remain available</span>
        </div>
      ) : (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: 'rgba(236, 253, 245, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(5, 150, 105, 0.35)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.18)',
            color: '#065f46',
            fontSize: '0.82rem',
            fontWeight: '700'
          }}
        >
          <Wifi size={15} color="#059669" style={{ flexShrink: 0 }} />
          <span>Connection Restored</span>
        </div>
      )}
    </div>
  );
}
