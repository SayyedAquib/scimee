import React from 'react';
import siteConfig from '@/data/site-config.json';
import FooterNavigationColumn from './FooterNavigationColumn';
import FooterContactColumn from './FooterContactColumn';

export default function Footer({ onOpenCallModal: _onOpenCallModal }) {
  const currentYear = new Date().getFullYear();

  const brandName = siteConfig?.brand?.name ?? 'SCIMEE';
  const brandFullName =
    siteConfig?.brand?.fullName ??
    'Sara Coaching Institute of Medical Entrance Examination (SCIMEE)';
  const founder = siteConfig?.brand?.founder ?? 'Ansari Rehan Ahmed';
  const taglineUrdu = siteConfig?.brand?.taglineUrdu ?? 'ہم جذبہِ تعمیر جہاں لے کے اٹھے ہیں';
  const taglineEn =
    siteConfig?.brand?.taglineEn ??
    siteConfig?.brand?.taglineEnglish ??
    'We have risen with the spirit to build the world.';

  const navList = Array.isArray(siteConfig?.navigation) ? siteConfig.navigation : [];

  return (
    <footer className="site-footer">
      <div className="container-custom">
        {/* Main Footer Columns */}
        <div className="footer-grid">
          {/* Column 1: Institute Branding & Urdu Motto */}
          <div>
            <div className="footer-brand-header">
              <div className="footer-logo-box">
                <img
                  src="/assets/logo.svg"
                  alt="SCIMEE Logo"
                  width="46"
                  height="46"
                  className="footer-logo-img"
                />
              </div>
              <span className="footer-brand-title">{brandName}</span>
            </div>

            <p className="footer-brand-desc">
              {brandFullName} — Bhusawal&apos;s leading coaching institute for NEET-UG, IIT-JEE
              Foundation &amp; MHT-CET under <strong>{founder}</strong>.
            </p>

            <div className="bento-card-gold footer-urdu-card">
              <span className="urdu-font footer-urdu-text">{taglineUrdu}</span>
              <span className="footer-tagline-en">{taglineEn}</span>
            </div>
          </div>

          {/* Column 2: Quick Links & CBT Portals */}
          <FooterNavigationColumn navList={navList} />

          {/* Columns 3 & 4: Helplines & Campus Location */}
          <FooterContactColumn contact={siteConfig?.contact} location={siteConfig?.location} />
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {currentYear} {brandFullName}. All rights reserved.
          </div>
          <div>Excellence in Medical Entrance Examination Coaching.</div>
        </div>
      </div>
    </footer>
  );
}
