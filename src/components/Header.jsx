import React, { useState } from 'react';
import { PhoneCall, Menu, X } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import HeaderDesktopNav from './header/HeaderDesktopNav';
import HeaderMobileDrawer from './header/HeaderMobileDrawer';
import { useHeaderNavigation } from './header/useHeaderNavigation';

// Stable navigation items matching page sections
const NAV_ITEMS = Object.freeze([
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Results', href: '#results', id: 'results' },
  { label: 'Courses', href: '#courses', id: 'courses' },
  { label: 'Syllabus', href: '#syllabus', id: 'syllabus' },
  { label: 'Facilities', href: '#facilities', id: 'facilities' },
  { label: 'CBT Simulator', href: '#cbt-portal', id: 'cbt-portal' },
  { label: 'Location', href: '#location', id: 'location' },
  { label: 'FAQ', href: '#faq', id: 'faq' }
]);

export default function Header({ onOpenCallModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrolled, activeSection, indicatorStyle, navRef, navItemRefs, handleNavClick } =
    useHeaderNavigation(NAV_ITEMS);

  const closeMenu = () => setMobileMenuOpen(false);

  const onNavClick = (e, id) => {
    closeMenu();
    handleNavClick(e, id);
  };

  const brandName = siteConfig?.brand?.name ?? 'SCIMEE';
  const brandFounder = siteConfig?.brand?.founder ?? 'Ansari Rehan Ahmed';
  const primaryPhoneFormatted = siteConfig?.contact?.primaryPhoneFormatted ?? '+91 9175013140';

  return (
    <>
      {/* Apple Floating Island Navigation Container */}
      <div className="floating-navbar-wrapper">
        <header
          className="floating-navbar"
          style={{
            background: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.85)',
            boxShadow: scrolled
              ? '0 20px 48px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)'
              : '0 14px 34px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Brand Logo & Name */}
          <a
            href="#about"
            onClick={(e) => onNavClick(e, 'about')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src="/assets/logo.svg"
                alt="SCIMEE Logo"
                width="44"
                height="44"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: 'var(--text-heading)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1'
                  }}
                >
                  {brandName}
                </span>
                <span className="badge-gold" style={{ padding: '1px 6px', fontSize: '0.6rem' }}>
                  NEET 2026
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  lineHeight: 1,
                  marginTop: '2px'
                }}
              >
                By {brandFounder}
              </p>
            </div>
          </a>

          {/* Desktop Nav with Dynamic Sliding Pill Active Indicator */}
          <HeaderDesktopNav
            navRef={navRef}
            indicatorStyle={indicatorStyle}
            navItems={NAV_ITEMS}
            activeSection={activeSection}
            navItemRefs={navItemRefs}
            onNavClick={onNavClick}
          />

          {/* Desktop Actions */}
          <div
            style={{ display: 'none', alignItems: 'center', gap: '10px' }}
            className="desktop-nav"
          >
            <button
              onClick={() => onOpenCallModal?.()}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.82rem', height: '38px' }}
            >
              <PhoneCall size={14} />
              <span>Call Helpline</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            className="mobile-toggle"
          >
            <button
              onClick={() => onOpenCallModal?.()}
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
      <HeaderMobileDrawer
        isOpen={mobileMenuOpen}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onNavClick={onNavClick}
        onClose={closeMenu}
        onOpenCallModal={onOpenCallModal}
        primaryPhoneFormatted={primaryPhoneFormatted}
      />
    </>
  );
}
