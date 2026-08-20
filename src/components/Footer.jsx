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
      background: '#040711',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '56px',
      paddingBottom: '88px', // Extra padding for mobile bottom bar
      color: 'var(--text-secondary)'
    }}>
      <div className="container-custom">
        
        {/* Main Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px',
          marginBottom: '48px'
        }}>
          
          {/* Column 1: Institute Branding & Urdu Motto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#fff',
                padding: '4px',
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
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', letterSpacing: '1px' }}>
                {siteConfig.brand.name}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              {siteConfig.brand.fullName} — Bhusawal&apos;s leading coaching institute for NEET-UG, IIT-JEE Foundation &amp; MHT-CET under the guidance of <strong>{siteConfig.brand.founder}</strong>.
            </p>

            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '10px 14px',
              borderRadius: '10px'
            }}>
              <span className="urdu-font" style={{ fontSize: '1.15rem', color: 'var(--text-gold)', display: 'block', marginBottom: '2px' }}>
                {siteConfig.brand.taglineUrdu}
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {siteConfig.brand.taglineEn || siteConfig.brand.taglineEnglish}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color var(--transition-fast)'
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
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Direct Helplines
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>
                  Primary Admissions Helpline:
                </span>
                <a
                  href={`tel:${siteConfig.contact.primaryPhone}`}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    color: 'var(--accent-gold-light)',
                    textDecoration: 'none'
                  }}
                >
                  {siteConfig.contact.primaryPhoneFormatted}
                </a>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>
                  Secondary Office Line:
                </span>
                <a
                  href={`tel:${siteConfig.contact.secondaryPhone}`}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    textDecoration: 'none'
                  }}
                >
                  {siteConfig.contact.secondaryPhoneFormatted}
                </a>
              </div>

              <div style={{ marginTop: '8px' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Admission Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Campus Location & Hours */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Campus Address
            </h4>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '12px' }}>
              <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{siteConfig.location.addressLine1}</strong><br />
                {siteConfig.location.addressLine2}<br />
                {siteConfig.location.city} - {siteConfig.location.pincode}, {siteConfig.location.state}
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong>Hours:</strong> {siteConfig.contact.operatingHours.weekdays}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {currentYear} {siteConfig.brand.fullName}. All rights reserved.
          </div>
          <div>
            Designed with excellence for medical entrance aspirants in Bhusawal.
          </div>
        </div>

      </div>
    </footer>
  );
}
