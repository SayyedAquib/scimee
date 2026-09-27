import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window?.scrollY ?? document?.documentElement?.scrollTop ?? 0;
      setIsVisible(scrollY > 500);
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

  const scrollToTop = () => {
    try {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="scroll-to-top-btn"
      style={{
        position: 'fixed',
        right: '20px',
        bottom: 'max(24px, calc(env(safe-area-inset-bottom) + 76px))',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 990,
        transition:
          'transform 180ms var(--spring-snappy), box-shadow 180ms ease, background-color 150ms ease',
        animation: 'appleScaleIn 200ms var(--spring-snappy)'
      }}
    >
      <ChevronUp size={20} color="#b45309" />
    </button>
  );
}
