import React from 'react';
import { PhoneCall, MapPin, Mail, Award, Heart, MessageCircle } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Footer({ onOpenCallModal }) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappPrefillText
  )}`;

  return (
    <footer style={{
      background: '#02050e',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '52px',
      paddingBottom: '88px',
      color: 'var(--text-secondary)'
    }}>
      <div className="container-custom">
        
        {/* Main Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '42px'
        }}>
          
          {/* Column 1: Institute Branding & Urdu Motto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#fff',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/logo.svg" 
                  alt="SCIMEE Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>
                {siteConfig.brand.name}
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '14px' }}>
              {siteConfig.brand.fullName} — Bhusawal&apos;s leading coaching institute for NEET-UG, IIT-JEE Foundation &amp; MHT-CET under <strong>{siteConfig.brand.founder}</strong>.
            </p>

            <div className="apple-glass-gold" style={{ padding: '8px 12px', borderRadius: '10px' }}>
              <span className="urdu-font" style={{ fontSize: '1.1rem', color: '#fef08a', display: 'block', marginBottom: '2px' }}>
                {siteConfig.brand.taglineUrdu}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                {siteConfig.brand.taglineEn || siteConfig.brand.taglineEnglish}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 120ms ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-gold-light)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Helplines & Direct Calling */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Direct Helplines
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', display: 'block' }}>
                  Primary Admissions Helpline:
                </span>
                <a
                  href={`tel:${siteConfig.contact.primaryPhone}`}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: 'var(--accent-gold-light)',
                    textDecoration: 'none'
                  }}
                >
                  {siteConfig.contact.primaryPhoneFormatted}
                </a>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', display: 'block' }}>
                  Secondary Office Line:
                </span>
                <a
                  href={`tel:${siteConfig.contact.secondaryPhone}`}
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    textDecoration: 'none'
                  }}
                >
                  {siteConfig.contact.secondaryPhoneFormatted}
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
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Campus Address
            </h4>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', lineHeight: '1.5', marginBottom: '10px' }}>
              <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{siteConfig.location.landmark}</strong><br />
                {siteConfig.location.addressLine1}, {siteConfig.location.addressLine2}<br />
                {siteConfig.location.city} - {siteConfig.location.pincode}, {siteConfig.location.state}
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              <strong>Hours:</strong> {siteConfig.contact.operatingHours.weekdays}
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          fontSize: '0.78rem',
          color: 'var(--text-tertiary)'
        }}>
          <div>
            &copy; {currentYear} {siteConfig.brand.fullName}. All rights reserved.
          </div>
          <div>
            Excellence in Medical Entrance Examination Coaching.
          </div>
        </div>

      </div>
    </footer>
  );
}
