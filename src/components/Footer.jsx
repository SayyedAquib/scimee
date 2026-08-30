import React from 'react';
import { MapPin, MessageCircle, Laptop, ExternalLink } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { getCbtUrl, openCbtPortal } from '../utils/cbt';

export default function Footer({ onOpenCallModal: _onOpenCallModal }) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl('general');

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
  const primaryPhone = siteConfig?.contact?.primaryPhone ?? '9175013140';
  const primaryPhoneFormatted = siteConfig?.contact?.primaryPhoneFormatted ?? '+91 9175013140';
  const secondaryPhone = siteConfig?.contact?.secondaryPhone ?? '9226134986';
  const secondaryPhoneFormatted = siteConfig?.contact?.secondaryPhoneFormatted ?? '+91 9226134986';

  const addressLine1 = siteConfig?.location?.addressLine1 ?? 'Beside Kali Matti Ground';
  const addressLine2 =
    siteConfig?.location?.addressLine2 ?? 'Opposite Sunrise Apartment, Khadka Square';
  const city = siteConfig?.location?.city ?? 'Bhusawal';
  const pincode = siteConfig?.location?.pincode ?? '425201';
  const state = siteConfig?.location?.state ?? 'Maharashtra';
  const operatingHoursWeekdays =
    siteConfig?.contact?.operatingHours?.weekdays ?? '8:00 AM – 8:30 PM';

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
          <div>
            <h4
              style={{
                fontSize: '0.88rem',
                fontWeight: '800',
                color: 'var(--text-heading)',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Quick Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '16px'
              }}
            >
              {navList.map((item, idx) => (
                <li key={item?.label ?? idx}>
                  <a
                    href={item?.href}
                    style={{
                      color: 'var(--text-sub)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 120ms ease'
                    }}
                    onMouseOver={(e) => {
                      if (e?.currentTarget?.style) {
                        e.currentTarget.style.color = '#b45309';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (e?.currentTarget?.style) {
                        e.currentTarget.style.color = 'var(--text-sub)';
                      }
                    }}
                  >
                    {item?.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: '800',
                color: '#065f46',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Laptop size={14} color="#059669" />
              <span>Student Portals</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <a
                  href={getCbtUrl('/tests')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e?.preventDefault?.();
                    openCbtPortal('/tests', 'footer_mock_tests');
                  }}
                  style={{
                    color: '#047857',
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>NEET CBT Mock Tests</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href={getCbtUrl('/login')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e?.preventDefault?.();
                    openCbtPortal('/login', 'footer_login');
                  }}
                  style={{
                    color: 'var(--text-sub)',
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>Student Portal Login</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Helplines & Direct Calling */}
          <div>
            <h4
              style={{
                fontSize: '0.88rem',
                fontWeight: '800',
                color: 'var(--text-heading)',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Direct Helplines
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                  Primary Admissions Helpline:
                </span>
                <a
                  href={`tel:${primaryPhone}`}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: '#b45309',
                    textDecoration: 'none'
                  }}
                >
                  {primaryPhoneFormatted}
                </a>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                  Secondary Office Line:
                </span>
                <a
                  href={`tel:${secondaryPhone}`}
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: '700',
                    color: 'var(--text-heading)',
                    textDecoration: 'none'
                  }}
                >
                  {secondaryPhoneFormatted}
                </a>
              </div>

              <div style={{ marginTop: '4px' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{
                    padding: '7px 14px',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'inline-flex'
                  }}
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Campus Location & Hours */}
          <div>
            <h4
              style={{
                fontSize: '0.88rem',
                fontWeight: '800',
                color: 'var(--text-heading)',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Campus Address
            </h4>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '0.86rem',
                lineHeight: '1.5',
                marginBottom: '10px'
              }}
            >
              <MapPin size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ color: 'var(--text-heading)', display: 'block' }}>
                  {addressLine1}
                </strong>
                <span style={{ display: 'block', color: 'var(--text-sub)' }}>{addressLine2}</span>
                <span style={{ display: 'block', color: 'var(--text-sub)' }}>
                  {city} - {pincode}, {state}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <strong>Hours:</strong> {operatingHoursWeekdays}
            </div>
          </div>
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
