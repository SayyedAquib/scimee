import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Header({ onOpenCallModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Apple Floating Island Navigation Container */}
      <div className="floating-navbar-wrapper">
        <header className="floating-navbar" style={{
          background: scrolled ? 'rgba(9, 14, 28, 0.88)' : 'rgba(11, 17, 32, 0.72)',
          boxShadow: scrolled ? '0 20px 48px -8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)' : '0 16px 36px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}>
          
          {/* Brand Logo & Name */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#ffffff',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <img 
                src="/assets/logo.svg" 
                alt="SCIMEE Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '900',
                  color: '#ffffff',
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

          {/* Desktop Nav Links (Apple Pill Items) */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="desktop-nav">
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
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
              style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              aria-label="Call Helpline"
            >
              <PhoneCall size={13} />
              <span>Call</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-glass-bright)',
                color: '#fff',
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

      {/* Mobile Drawer (Apple Frosted Sheet) */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '84px',
          left: '16px',
          right: '16px',
          zIndex: 99,
          background: 'rgba(9, 15, 30, 0.94)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderRadius: '24px',
          border: '1px solid var(--border-glass-bright)',
          borderTop: '1px solid var(--border-specular-top)',
          padding: '18px',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.85)',
          animation: 'appleScaleIn 200ms var(--spring-snappy)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.96rem',
                  fontWeight: '600',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.label}</span>
                <ChevronRight size={15} color="var(--text-muted)" />
              </a>
            ))}

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
