import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window?.scrollY ?? document?.documentElement?.scrollTop ?? 0;
      const height = (document?.documentElement?.scrollHeight ?? 0) - (window?.innerHeight ?? 0);
      if (height > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / height) * 100));
        setProgress(pct);
      }
    };

    try {
      window?.addEventListener?.('scroll', handleScroll, { passive: true });
      handleScroll();
    } catch {
      // Fallback
    }

    return () => {
      try {
        window?.removeEventListener?.('scroll', handleScroll);
      } catch {
        // Fallback
      }
    };
  }, []);

  return (
    <div
      data-testid="scroll-progress"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2.5px',
        background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: progress > 1 ? 1 : 0
      }}
    />
  );
}
