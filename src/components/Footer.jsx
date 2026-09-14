import React from 'react';
import siteConfig from '../data/site-config.json';
import FooterNavigationColumn from './footer/FooterNavigationColumn';
import FooterContactColumn from './footer/FooterContactColumn';

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
    <footer
      style={{
        background: '#f8fafc',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderTopLeftRadius: '36px',
        borderTopRightRadius: '36px',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.03)',
        paddingTop: '48px',
        paddingBottom: '84px',
        color: 'var(--text-sub)'
      }}
    >
      <div className="container-custom">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '38px'
          }}
        >
          {/* Column 1: Institute Branding & Urdu Motto */}
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img
                  src="/assets/logo.png"
                  alt="SCIMEE Logo"
                  width="46"
                  height="46"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <span
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '900',
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.02em'
                }}
              >
                {brandName}
              </span>
            </div>

            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--text-sub)',
                lineHeight: '1.55',
                marginBottom: '14px'
              }}
            >
              {brandFullName} — Bhusawal&apos;s leading coaching institute for NEET-UG, IIT-JEE
              Foundation &amp; MHT-CET under <strong>{founder}</strong>.
            </p>

            <div
              className="bento-card-gold"
              style={{ padding: '12px 14px', borderRadius: '14px', overflow: 'hidden' }}
            >
              <span
                className="urdu-font"
                style={{
                  fontSize: '0.94rem',
                  color: '#92400e',
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: '700',
                  lineHeight: '1.4',
                  whiteSpace: 'nowrap'
                }}
              >
                {taglineUrdu}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#b45309',
                  display: 'block',
                  lineHeight: '1.4'
                }}
              >
                {taglineEn}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links & CBT Portals */}
          <FooterNavigationColumn navList={navList} />

          {/* Columns 3 & 4: Helplines & Campus Location */}
          <FooterContactColumn contact={siteConfig?.contact} location={siteConfig?.location} />
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            paddingTop: '18px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {currentYear} {brandFullName}. All rights reserved.
          </div>
          <div>Excellence in Medical Entrance Examination Coaching.</div>
        </div>
      </div>
    </footer>
  );
}
