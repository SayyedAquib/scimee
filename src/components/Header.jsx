import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, Sparkles, MapPin } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Header({ onOpenCallModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Announcement Bar */}
      {siteConfig.announcement.enabled && (
        <div style={{
          background: 'linear-gradient(90deg, #1e1b4b 0%, #0f172a 50%, #312e81 100%)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          position: 'relative',
          zIndex: 60
        }}>
          <span className="badge-gold" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
            {siteConfig.announcement.badge}
          </span>
          <span style={{ fontWeight: '500' }}>
            {siteConfig.announcement.text}
          </span>
          <button
            onClick={onOpenCallModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold-light)',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.8rem',
              marginLeft: '4px'
            }}
          >
            {siteConfig.announcement.ctaText} &rarr;
          </button>
        </div>
      )}

      {/* Main Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(6, 9, 19, 0.88)' : 'rgba(6, 9, 19, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background var(--transition-base), box-shadow var(--transition-base)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.45)' : 'none'
      }}>
        <div className="container-custom" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px'
        }}>
          {/* Brand Logo & Name */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#ffffff',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
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
                  fontSize: '1.35rem',
                  fontWeight: '900',
                  color: '#fff',
                  letterSpacing: '1px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>
                  {siteConfig.brand.name}
                </span>
                <span className="badge-gold" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                  NEET EXPERTS
                </span>
              </div>
              <p style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: '500',
                lineHeight: 1.1,
                marginTop: '1px'
              }}>
                By {siteConfig.brand.founder} • Bhusawal
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Direct Call Action */}
          <div style={{ display: 'none', alignItems: 'center', gap: '14px' }} className="desktop-nav">
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <PhoneCall size={17} />
              <span>Call Helpline</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-toggle">
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              aria-label="Call Helpline"
            >
              <PhoneCall size={15} />
              <span>Call</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(11, 18, 38, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px',
            animation: 'fadeIn 200ms ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {item.label}
                </a>
              ))}
              
              <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => { closeMenu(); onOpenCallModal(); }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <PhoneCall size={18} />
                  <span>Call {siteConfig.contact.primaryPhoneFormatted}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
