import React, { useEffect } from 'react';
import { Phone, PhoneCall, MessageCircle, Clock, MapPin, X } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function PhoneCallModal({ isOpen, onClose, context = 'general' }) {
  // Handle escape key
  useEffect(() => {
    // Early return if modal is closed
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        onClose?.();
      }
    };

    try {
      window?.addEventListener?.('keydown', handleKeyDown);
    } catch {
      // Listener fallback
    }

    return () => {
      try {
        window?.removeEventListener?.('keydown', handleKeyDown);
      } catch {
        // Cleanup safety
      }
    };
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (typeof document === 'undefined' || !document?.body?.style) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      if (document?.body?.style) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  // Early return if modal is not active
  if (!isOpen) {
    return null;
  }

  const safeContext = typeof context === 'string' ? context : 'general';
  const whatsappUrl = getWhatsAppUrl(safeContext);

  const isCounseling =
    safeContext.includes('counseling') ||
    safeContext.includes('counselling') ||
    safeContext.includes('choice') ||
    safeContext.includes('post-neet');

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
    <div
      className="modal-backdrop"
      onClick={() => onClose?.()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-modal-title"
    >
      <div
        className="modal-card"
        onClick={(e) => {
          e?.stopPropagation?.();
        }}
      >
        {/* Apple Mobile Bottom Sheet Grab Handle */}
        <div className="modal-grab-handle" />

        {/* Modal Header */}
        <div
          style={{
            background: '#fffbeb',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(217, 119, 6, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div>
            <div className="badge-gold" style={{ marginBottom: '4px' }}>
              {isCounseling ? '1-on-1 Admission Counseling' : 'Direct Admissions Line'}
            </div>
            <h3
              id="call-modal-title"
              style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                color: '#78350f',
                letterSpacing: '-0.02em'
              }}
            >
              {isCounseling ? 'Consult Rehan Sir (Parents & Students)' : 'Connect with SCIMEE'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#92400e', marginTop: '2px' }}>
              {isCounseling
                ? 'Post-NEET Medical College Choice-Filling & Rank Analysis'
                : 'Sara Coaching Institute of Medical Entrance Examination'}
            </p>
          </div>

          <button
            onClick={() => onClose?.()}
            aria-label="Close dialog"
            style={{
              background: 'rgba(0, 0, 0, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-sub)',
              cursor: 'pointer',
              transition: 'all 120ms ease'
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{
            padding: '22px 24px',
            maxHeight: '78vh',
            overflowY: 'auto',
            background: '#ffffff'
          }}
        >
          {/* Operating Hours Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#f0f9ff',
              border: '1px solid rgba(2, 132, 199, 0.2)',
              padding: '9px 12px',
              borderRadius: '12px',
              marginBottom: '18px'
            }}
          >
            <Clock size={16} color="#0284c7" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.8rem', color: '#0369a1' }}>
              <strong>Office Hours:</strong> {operatingHoursWeekdays} (Sun: {operatingHoursSunday})
            </div>
          </div>

          {/* Instant 1-Tap Calling Controls */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}
          >
            <a
              href={`tel:${primaryPhone}`}
              onClick={() => trackEvent('call_primary_clicked', { phone: primaryPhone })}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px 18px',
                height: '48px',
                fontSize: '0.94rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={18} style={{ flexShrink: 0 }} />
                <span>Call Primary Line</span>
              </span>
              <span style={{ fontWeight: '900', letterSpacing: '0.02em' }}>
                {primaryPhoneFormatted}
              </span>
            </a>

            <a
              href={`tel:${secondaryPhone}`}
              onClick={() => trackEvent('call_secondary_clicked', { phone: secondaryPhone })}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '12px 18px',
                height: '48px',
                fontSize: '0.94rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={17} color="#d97706" style={{ flexShrink: 0 }} />
                <span>Secondary Line</span>
              </span>
              <span style={{ fontWeight: '700', letterSpacing: '0.02em' }}>
                {secondaryPhoneFormatted}
              </span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_enquiry_clicked', { source: 'admissions_modal' })}
              className="btn-whatsapp"
              style={{
                width: '100%',
                padding: '12px 18px',
                height: '48px',
                fontSize: '0.94rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} style={{ flexShrink: 0 }} />
                <span>WhatsApp Enquiry</span>
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: '800' }}>Instant Reply &rarr;</span>
            </a>
          </div>

          {/* Location Footnote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '0.76rem',
              color: 'var(--text-muted)'
            }}
          >
            <MapPin size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              {addressLine1}, {addressLine2}, {city} - {pincode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
