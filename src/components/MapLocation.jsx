import React from 'react';
import { MapPin, Navigation, Clock, PhoneCall, ExternalLink } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function MapLocation({ onOpenCallModal }) {
  const googleMapsUrl = siteConfig.location.googleMapsUrl;
  const embedUrl = siteConfig.location.googleMapsEmbed;

  return (
    <section id="location" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 32px' }}>
            <div className="badge-blue" style={{ marginBottom: '10px' }}>
              <MapPin size={13} />
              <span>Campus Location</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: 'var(--text-heading)'
            }}>
              Convenient Location in Bhusawal
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              Centrally situated at Khadka Square for easy accessibility across Bhusawal, Varangaon, and Jalgaon.
            </p>
          </div>

          {/* Map & Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '20px'
          }}>
            
            {/* Address Details Card */}
            <div className="bento-card" style={{
              padding: 'clamp(22px, 4vw, 32px)',
              borderRadius: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '18px'
            }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '10px' }}>
                  Campus Address
                </span>
                
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                  {siteConfig.brand.fullName}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-sub)', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={17} color="#d97706" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-heading)', display: 'block' }}>{siteConfig.location.addressLine1}</strong>
                      <span style={{ display: 'block', color: 'var(--text-sub)' }}>{siteConfig.location.addressLine2}</span>
                      <span style={{ display: 'block', color: 'var(--text-sub)' }}>{siteConfig.location.city}, {siteConfig.location.state} - {siteConfig.location.pincode}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <Clock size={16} color="#0284c7" style={{ flexShrink: 0 }} />
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
                    padding: '10px 18px',
                    fontSize: '0.86rem',
                    textDecoration: 'none'
                  }}
                >
                  <Navigation size={14} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={onOpenCallModal}
                  className="btn-secondary"
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.86rem'
                  }}
                >
                  <PhoneCall size={14} />
                  <span>Call Institute</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Maps Frame with Exact Official SCIMEE Pin */}
            <div className="bento-card" style={{
              overflow: 'hidden',
              borderRadius: '22px',
              minHeight: '340px',
              background: '#f8fafc'
            }}>
              <iframe
                title="SCIMEE Google Maps Location"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '340px',
                  display: 'block'
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
