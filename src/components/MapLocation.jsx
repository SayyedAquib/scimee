import React from 'react';
import { MapPin, Navigation, Clock, PhoneCall, ExternalLink } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function MapLocation({ onOpenCallModal }) {
  const googleMapsUrl = siteConfig.location.googleMapsUrl;
  const lat = siteConfig.location.latitude || 21.0365511;
  const lng = siteConfig.location.longitude || 75.7959125;
  const embedUrl = siteConfig.location.googleMapsEmbed || `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=17&output=embed`;

  return (
    <section id="location" style={{
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'linear-gradient(180deg, #060913 0%, #0c142b 50%, #060913 100%)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 36px' }}>
          <div className="badge-blue" style={{ marginBottom: '10px' }}>
            <MapPin size={14} />
            <span>Campus Location</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            Convenient Location in Bhusawal
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Easily accessible from all parts of Bhusawal, Varangaon, and Jalgaon district with safe study surroundings.
          </p>
        </div>

        {/* Map & Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Address Details Card */}
            <div className="glass-panel" style={{
              padding: 'clamp(20px, 4vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '12px' }}>
                  Institute Address
                </span>
                
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                  {siteConfig.brand.fullName}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#fff' }}>{siteConfig.location.addressLine1}</strong><br />
                      {siteConfig.location.addressLine2}<br />
                      {siteConfig.location.city}, {siteConfig.location.state} - {siteConfig.location.pincode}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <Clock size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Office Hours:</strong> {siteConfig.contact.operatingHours.weekdays}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: '12px 22px',
                    fontSize: '0.92rem',
                    textDecoration: 'none'
                  }}
                >
                  <Navigation size={17} />
                  <span>Get Driving Directions</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={onOpenCallModal}
                  className="btn-secondary"
                  style={{
                    padding: '12px 20px',
                    fontSize: '0.92rem'
                  }}
                >
                  <PhoneCall size={17} />
                  <span>Call Institute</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="glass-panel" style={{
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
              minHeight: '360px',
              border: '1px solid var(--border-highlight)'
            }}>
              <iframe
                title="SCIMEE Location Map"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '360px',
                  filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)'
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
