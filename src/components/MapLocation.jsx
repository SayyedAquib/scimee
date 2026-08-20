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
      paddingTop: 'clamp(48px, 8vw, 76px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      background: 'linear-gradient(180deg, #030712 0%, #091128 50%, #030712 100%)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 34px' }}>
          <div className="badge-blue" style={{ marginBottom: '10px' }}>
            <MapPin size={13} />
            <span>Campus Location</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: '900',
            lineHeight: '1.14',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            Convenient Location in Bhusawal
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
            Centrally situated at Khadka Square for easy accessibility across Bhusawal, Varangaon, and Jalgaon.
          </p>
        </div>

        {/* Map & Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '22px'
        }}>
          
          {/* Address Details Card */}
          <div className="apple-glass" style={{
            padding: 'clamp(22px, 4vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '10px' }}>
                Campus Address
              </span>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                {siteConfig.brand.fullName}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>{siteConfig.location.addressLine1}</strong><br />
                    {siteConfig.location.addressLine2}<br />
                    {siteConfig.location.city}, {siteConfig.location.state} - {siteConfig.location.pincode}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <Clock size={16} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Office Hours:</strong> {siteConfig.contact.operatingHours.weekdays}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '11px 20px',
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                <Navigation size={15} />
                <span>Driving Directions</span>
                <ExternalLink size={13} />
              </a>

              <button
                onClick={onOpenCallModal}
                className="btn-secondary"
                style={{
                  padding: '11px 18px',
                  fontSize: '0.88rem'
                }}
              >
                <PhoneCall size={15} />
                <span>Call Institute</span>
              </button>
            </div>
          </div>

          {/* Embedded Google Maps Frame */}
          <div className="apple-glass" style={{
            overflow: 'hidden',
            borderRadius: 'var(--radius-md)',
            minHeight: '340px',
            borderTop: '1px solid var(--border-specular-top)'
          }}>
            <iframe
              title="SCIMEE Location Map"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: '340px',
                filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
