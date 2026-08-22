import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Menu, X, ChevronRight } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Header({ onOpenCallModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const navItemRefs = useRef({});
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Navigation items matching page sections
  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Results', href: '#results', id: 'results' },
    { label: 'Courses', href: '#courses', id: 'courses' },
    { label: 'Syllabus', href: '#syllabus', id: 'syllabus' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    { label: 'Location', href: '#location', id: 'location' },
    { label: 'FAQ', href: '#faq', id: 'faq' }
  ];

  // Handle direct initial page load with URL hash (e.g. #syllabus)
  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && navItems.some((item) => item.id === initialHash)) {
      setActiveSection(initialHash);
      const targetEl = document.getElementById(initialHash);
      if (targetEl) {
        setTimeout(() => {
          const navOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Bulletproof viewport-based active section & URL tracker
  useEffect(() => {
    let lastActiveSection = '';

    const handleScroll = () => {
      const isScrolledNow = window.scrollY > 20;
      setScrolled(isScrolledNow);

      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      let detectedSection = 'about';

      // 1. Top of page
      if (scrollY < 140) {
        detectedSection = 'about';
      }
      // 2. Bottom of page (FAQ)
      else if (windowHeight + scrollY >= docHeight - 100) {
        detectedSection = 'faq';
      }
      // 3. Middle sections based on viewport position
      else {
        const sectionIds = navItems.map((item) => item.id);
        for (let i = 0; i < sectionIds.length; i++) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Trigger point is 180px from viewport top (below floating navbar)
            if (rect.top <= 180 && rect.bottom > 180) {
              detectedSection = sectionIds[i];
              break;
            }
          }
        }
      }

      setActiveSection(detectedSection);

      // Auto update URL hash in address bar seamlessly
      if (lastActiveSection !== detectedSection) {
        lastActiveSection = detectedSection;
        const newUrl = detectedSection === 'about'
          ? window.location.pathname + window.location.search
          : `#${detectedSection}`;
        
        if (window.location.hash !== (detectedSection === 'about' ? '' : `#${detectedSection}`)) {
          window.history.replaceState(null, '', newUrl);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Recalculate sliding pill indicator position whenever activeSection changes or window resizes
  const updateIndicator = () => {
    const activeEl = navItemRefs.current[activeSection];
    const navEl = navRef.current;

    if (activeEl && navEl) {
      const navRect = navEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const closeMenu = () => setMobileMenuOpen(false);

  // Smooth click navigation
  const handleNavClick = (e, id) => {
    if (e) e.preventDefault();
    
    setActiveSection(id);
    closeMenu();

    // Lock automatic scroll tracker for 700ms during click transit
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      const navOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const newUrl = id === 'about' ? window.location.pathname + window.location.search : `#${id}`;
      window.history.replaceState(null, '', newUrl);
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 700);
  };

  return (
    <>
      {/* Apple Floating Island Navigation Container */}
      <div className="floating-navbar-wrapper">
        <header className="floating-navbar" style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.85)',
          boxShadow: scrolled ? '0 20px 48px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)' : '0 14px 34px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)'
        }}>
          
          {/* Brand Logo & Name */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <img 
                src="/assets/logo.png" 
                alt="SCIMEE Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '900',
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1'
                }}>
                  {siteConfig.brand.name}
                </span>
                <span className="badge-gold" style={{ padding: '1px 6px', fontSize: '0.6rem' }}>
                  NEET 2026
                </span>
              </div>
              <p style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                fontWeight: '600',
                lineHeight: 1,
                marginTop: '2px'
              }}>
                By {siteConfig.brand.founder}
              </p>
            </div>
          </a>

          {/* Desktop Nav with Dynamic Sliding Pill Active Indicator */}
          <nav
            ref={navRef}
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2px',
              position: 'relative',
              background: 'rgba(0, 0, 0, 0.03)',
              padding: '4px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(0, 0, 0, 0.04)'
            }}
            className="desktop-nav"
          >
            {/* Apple Smooth Sliding Pill Indicator */}
            <div style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '1px solid rgba(217, 119, 6, 0.35)',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.15)',
              transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => (navItemRefs.current[item.id] = el)}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="nav-link"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: isActive ? '#92400e' : 'var(--text-sub)',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.84rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'color 180ms ease'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="desktop-nav">
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.82rem', height: '38px' }}
            >
              <PhoneCall size={14} />
              <span>Call Helpline</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-toggle">
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.76rem', height: '34px' }}
              aria-label="Call Helpline"
            >
              <PhoneCall size={13} />
              <span>Call</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: 'var(--text-heading)',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </header>
      </div>

      {/* Mobile Drawer (Apple Frosted Light Sheet with Smooth Scroll) */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '84px',
          left: '16px',
          right: '16px',
          zIndex: 999,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          padding: '18px',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)',
          animation: 'appleScaleIn 200ms var(--spring-snappy)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    color: isActive ? '#92400e' : 'var(--text-heading)',
                    textDecoration: 'none',
                    fontSize: '0.96rem',
                    fontWeight: isActive ? '800' : '600',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isActive ? '#fffbeb' : 'rgba(0, 0, 0, 0.03)',
                    border: isActive ? '1px solid rgba(217, 119, 6, 0.3)' : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 150ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isActive && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706' }} />
                    )}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={15} color={isActive ? '#d97706' : 'var(--text-muted)'} />
                </a>
              );
            })}

            <div style={{ paddingTop: '8px' }}>
              <button
                onClick={() => { closeMenu(); onOpenCallModal(); }}
                className="btn-primary"
                style={{ width: '100%', padding: '11px', fontSize: '0.9rem' }}
              >
                <PhoneCall size={16} />
                <span>Call {siteConfig.contact.primaryPhoneFormatted}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
