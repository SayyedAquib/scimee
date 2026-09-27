import React, { useState } from 'react';
import { PhoneCall, Menu, X } from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import HeaderDesktopNav from './HeaderDesktopNav';
import HeaderMobileDrawer from './HeaderMobileDrawer';
import { useHeaderNavigation } from './useHeaderNavigation';

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
        <header className={`floating-navbar${scrolled ? ' scrolled' : ''}`}>
          {/* Brand Logo & Name */}
          <a href="#about" onClick={(e) => onNavClick(e, 'about')} className="header-brand-link">
            <div className="header-logo-box">
              <img
                src="/assets/scimee_logo.svg"
                alt="SCIMEE Logo"
                width="44"
                height="44"
                className="header-logo-img"
              />
            </div>
            <div>
              <div className="header-brand-row">
                <span className="header-brand-title">{brandName}</span>
                <span className="badge-gold" style={{ padding: '1px 6px', fontSize: '0.6rem' }}>
                  NEET 2026
                </span>
              </div>
              <p className="header-brand-sub">By {brandFounder}</p>
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
          <div className="desktop-nav header-actions-desktop">
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
          <div className="mobile-toggle header-actions-mobile">
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
              className="header-menu-btn"
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
