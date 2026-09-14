import React from 'react';
import { PhoneCall, Phone, Clock, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { getCbtUrl, openCbtPortal } from '../../utils/cbt';

export default function PhoneModalBody({ modalData, siteConfig, context, onClose }) {
  const primaryPhone = siteConfig?.contact?.primaryPhone ?? '9175013140';
  const primaryPhoneFormatted = siteConfig?.contact?.primaryPhoneFormatted ?? '+91 9175013140';
  const secondaryPhone = siteConfig?.contact?.secondaryPhone ?? '9226134986';
  const secondaryPhoneFormatted = siteConfig?.contact?.secondaryPhoneFormatted ?? '+91 9226134986';
  const operatingHoursWeekdays =
    siteConfig?.contact?.operatingHours?.weekdays ?? '8:00 AM – 8:30 PM';
  const operatingHoursSunday = siteConfig?.contact?.operatingHours?.sunday ?? '9:00 AM – 4:00 PM';
  const addressLine1 = siteConfig?.location?.addressLine1 ?? 'Beside Kali Matti Ground';
  const addressLine2 =
    siteConfig?.location?.addressLine2 ?? 'Opposite Sunrise Apartment, Khadka Square';
  const city = siteConfig?.location?.city ?? 'Bhusawal';
  const pincode = siteConfig?.location?.pincode ?? '425201';

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Primary Phone Button */}
      <a
        href={`tel:${primaryPhone}`}
        className="btn-primary"
        style={{
          padding: '16px 20px',
          fontSize: '1.02rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <PhoneCall size={18} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.72rem', opacity: 0.9, display: 'block' }}>
              Call Primary Line:
            </span>
            <span style={{ fontWeight: '900' }}>{primaryPhoneFormatted}</span>
          </div>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            background: 'rgba(255, 255, 255, 0.25)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            fontWeight: '700'
          }}
        >
          Call Now
        </span>
      </a>

      {/* Secondary Phone Button */}
      <a
        href={`tel:${secondaryPhone}`}
        className="btn-secondary"
        style={{
          padding: '14px 20px',
          fontSize: '0.94rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Phone size={18} color="var(--text-heading)" />
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
              Secondary Line:
            </span>
            <span style={{ fontWeight: '800', color: 'var(--text-heading)' }}>
              {secondaryPhoneFormatted}
            </span>
          </div>
        </div>
        <span style={{ fontSize: '0.74rem', color: 'var(--text-sub)', fontWeight: '600' }}>
          Tap to Call
        </span>
      </a>

      {/* WhatsApp Direct Option */}
      <a
        href={getWhatsAppUrl(context || 'call-modal')}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
        style={{
          padding: '12px 18px',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          textDecoration: 'none'
        }}
      >
        <MessageCircle size={16} />
        <span>Chat on WhatsApp Directly</span>
      </a>

      {/* CBT Simulator Quick Link */}
      {modalData?.showCbtCTA && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: '800',
                color: '#065f46',
                display: 'block'
              }}
            >
              NTA NEET CBT Simulator
            </span>
            <span style={{ fontSize: '0.74rem', color: '#047857' }}>
              200,000+ MCQs &amp; Real-time exam screen
            </span>
          </div>
          <a
            href={getCbtUrl('/tests')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e?.preventDefault?.();
              openCbtPortal('/tests', 'call_modal_cbt');
              onClose?.();
            }}
            className="btn-emerald"
            style={{
              padding: '6px 12px',
              fontSize: '0.76rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Launch</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* Operating Hours & Location Info */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-sub)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} color="#d97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>Counseling Hours:</strong> Mon-Sat: {operatingHoursWeekdays} | Sun:{' '}
            {operatingHoursSunday}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <MapPin size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            {addressLine1}, {addressLine2}, {city} - {pincode}
          </span>
        </div>
      </div>
    </div>
  );
}
