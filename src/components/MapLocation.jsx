import React from 'react';
import { MapPin, Navigation, Clock, PhoneCall, ExternalLink } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function MapLocation({ onOpenCallModal }) {
  const googleMapsUrl =
    siteConfig?.location?.googleMapsUrl ?? 'https://maps.google.com/?cid=12140685933939634997';
  const embedUrl =
    siteConfig?.location?.googleMapsEmbed ??
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8727407005477!2d75.76615707596853!3d21.002246788842607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90f0003bba2a7%3A0xa87ca52b97dc3335!2sSCIMEE%20(Medical%20Entrance%20Examination)!5e0!3m2!1sen!2sin!4v1740000000000!5m2!1sen!2sin';

  const brandFullName =
    siteConfig?.brand?.fullName ??
    'Sara Coaching Institute of Medical Entrance Examination (SCIMEE)';
  const addressLine1 = siteConfig?.location?.addressLine1 ?? 'Beside Kali Matti Ground';
  const addressLine2 =
    siteConfig?.location?.addressLine2 ?? 'Opposite Sunrise Apartment, Khadka Square';
  const city = siteConfig?.location?.city ?? 'Bhusawal';
  const state = siteConfig?.location?.state ?? 'Maharashtra';
  const pincode = siteConfig?.location?.pincode ?? '425201';
  const operatingHoursWeekdays =
    siteConfig?.contact?.operatingHours?.weekdays ?? '8:00 AM – 8:30 PM';

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

            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: '900',
                lineHeight: '1.12',
                letterSpacing: '-0.03em',
                marginBottom: '10px',
                color: 'var(--text-heading)'
              }}
            >
              Convenient Location in Bhusawal
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              Centrally situated at Khadka Square for easy accessibility across Bhusawal, Varangaon,
              and Jalgaon.
            </p>
          </div>

          {/* Map & Details Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Address Details Card */}
            <div
              className="bento-card"
              style={{
                padding: 'clamp(22px, 4vw, 32px)',
                borderRadius: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '18px'
              }}
            >
              <div>
                <span className="badge-gold" style={{ marginBottom: '10px' }}>
                  Campus Address
                </span>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    color: 'var(--text-heading)',
                    marginBottom: '10px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {brandFullName}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    color: 'var(--text-sub)',
                    fontSize: '0.88rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={17} color="#d97706" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-heading)', display: 'block' }}>
                        {addressLine1}
                      </strong>
                      <span style={{ display: 'block', color: 'var(--text-sub)' }}>
                        {addressLine2}
                      </span>
                      <span style={{ display: 'block', color: 'var(--text-sub)' }}>
                        {city}, {state} - {pincode}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}
                  >
                    <Clock size={16} color="#0284c7" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Office Hours:</strong> {operatingHoursWeekdays}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Unified Heights & Symmetry) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: '10px 18px',
                    fontSize: '0.86rem',
                    height: '42px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    flex: '1 1 170px'
                  }}
                >
                  <Navigation size={14} style={{ flexShrink: 0 }} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} style={{ flexShrink: 0 }} />
                </a>

                <button
                  onClick={() => onOpenCallModal?.()}
                  className="btn-secondary"
                  style={{
                    padding: '10px 18px',
                    fontSize: '0.86rem',
                    height: '42px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    flex: '1 1 150px'
                  }}
                >
                  <PhoneCall size={14} style={{ flexShrink: 0 }} />
                  <span>Call Institute</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Maps Frame with Exact Official SCIMEE Pin */}
            <div
              className="bento-card"
              style={{
                overflow: 'hidden',
                borderRadius: '22px',
                minHeight: '340px',
                background: '#f8fafc'
              }}
            >
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
