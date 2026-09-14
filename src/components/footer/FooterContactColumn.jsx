import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function FooterContactColumn({ contact, location }) {
  const whatsappUrl = getWhatsAppUrl('general');

  const primaryPhone = contact?.primaryPhone ?? '9175013140';
  const primaryPhoneFormatted = contact?.primaryPhoneFormatted ?? '+91 9175013140';
  const secondaryPhone = contact?.secondaryPhone ?? '9226134986';
  const secondaryPhoneFormatted = contact?.secondaryPhoneFormatted ?? '+91 9226134986';

  const addressLine1 = location?.addressLine1 ?? 'Beside Kali Matti Ground';
  const addressLine2 = location?.addressLine2 ?? 'Opposite Sunrise Apartment, Khadka Square';
  const city = location?.city ?? 'Bhusawal';
  const pincode = location?.pincode ?? '425201';
  const state = location?.state ?? 'Maharashtra';
  const operatingHoursWeekdays = contact?.operatingHours?.weekdays ?? '8:00 AM – 8:30 PM';

  return (
    <>
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
    </>
  );
}
