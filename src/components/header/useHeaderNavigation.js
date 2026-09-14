import { useState, useEffect, useRef, useCallback } from 'react';

export function useHeaderNavigation(navItems) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const navItemRefs = useRef({});
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Handle direct initial page load with URL hash (e.g. #syllabus)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    try {
      const initialHash = window?.location?.hash?.replace('#', '') ?? '';
      if (initialHash && navItems.some((item) => item.id === initialHash)) {
        setActiveSection(initialHash);
        const targetEl = document?.getElementById?.(initialHash);
        if (targetEl) {
          timeoutId = setTimeout(() => {
            const navOffset = 80;
            const elementPosition = targetEl?.getBoundingClientRect?.()?.top ?? 0;
            const offsetPosition = elementPosition + (window?.pageYOffset ?? 0) - navOffset;
            window?.scrollTo?.({ top: offsetPosition, behavior: 'smooth' });
          }, 100);
        }
      }
    } catch {
      // Safe fallback
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [navItems]);

  // Viewport-based active section & URL tracker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastActiveSection = '';

    const handleScroll = () => {
      const isScrolledNow = (window?.scrollY ?? 0) > 20;
      setScrolled(isScrolledNow);

      if (isClickScrollingRef.current) return;

      const scrollY = window?.scrollY ?? 0;
      const windowHeight = window?.innerHeight ?? 0;
      const docHeight = document?.documentElement?.scrollHeight ?? 0;

      let detectedSection = 'about';

      if (scrollY < 140) {
        detectedSection = 'about';
      } else if (windowHeight + scrollY >= docHeight - 100) {
        detectedSection = 'faq';
      } else {
        const sectionIds = navItems.map((item) => item.id);
        for (let i = 0; i < sectionIds.length; i++) {
          const el = document?.getElementById?.(sectionIds[i]);
          if (el) {
            const rect = el?.getBoundingClientRect?.();
            if (rect && rect.top <= 180 && rect.bottom > 180) {
              detectedSection = sectionIds[i];
              break;
            }
          }
        }
      }

      setActiveSection(detectedSection);

      if (lastActiveSection !== detectedSection) {
        lastActiveSection = detectedSection;
        const newUrl =
          detectedSection === 'about'
            ? (window?.location?.pathname ?? '/') + (window?.location?.search ?? '')
            : `#${detectedSection}`;

        if (window?.location?.hash !== (detectedSection === 'about' ? '' : `#${detectedSection}`)) {
          window?.history?.replaceState?.(null, '', newUrl);
        }
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
        // Cleanup safety
      }
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [navItems]);

  const updateIndicator = useCallback(() => {
    const activeEl = navItemRefs?.current?.[activeSection];
    const navEl = navRef?.current;

    if (!activeEl || !navEl) return;

    try {
      const navRect = navEl?.getBoundingClientRect?.();
      const activeRect = activeEl?.getBoundingClientRect?.();

      if (navRect && activeRect) {
        setIndicatorStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
          opacity: 1
        });
      }
    } catch {
      // Fallback
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    try {
      window?.addEventListener?.('resize', updateIndicator);
    } catch {
      // Fallback
    }
    return () => {
      try {
        window?.removeEventListener?.('resize', updateIndicator);
      } catch {
        // Cleanup safety
      }
    };
  }, [updateIndicator]);

  const handleNavClick = (e, id) => {
    e?.preventDefault?.();
    setActiveSection(id);

    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    const target = document?.getElementById?.(id);
    if (target) {
      const navOffset = 80;
      const elementPosition = target?.getBoundingClientRect?.()?.top ?? 0;
      const offsetPosition = elementPosition + (window?.pageYOffset ?? 0) - navOffset;
      window?.scrollTo?.({ top: offsetPosition, behavior: 'smooth' });
    }

    const newUrl = id === 'about' ? (window?.location?.pathname ?? '/') : `#${id}`;
    window?.history?.pushState?.(null, '', newUrl);
  };

  return {
    scrolled,
    activeSection,
    indicatorStyle,
    navRef,
    navItemRefs,
    handleNavClick
  };
}
