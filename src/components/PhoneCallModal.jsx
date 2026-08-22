import React, { useEffect } from 'react';
import { Phone, PhoneCall, MessageCircle, Clock, MapPin, X, UserPlus, Download } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import { downloadVCard } from '../utils/vcard';
import { trackEvent } from '../utils/analytics';

export default function PhoneCallModal({ isOpen, onClose }) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappPrefillText
  )}`;

  const handleSaveContact = () => {
    trackEvent('save_contact_vcard_clicked', { source: 'admissions_modal' });
    downloadVCard();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="call-modal-title">
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Apple Mobile Bottom Sheet Grab Handle */}
        <div className="modal-grab-handle" />

        {/* Modal Header */}
        <div style={{
          background: '#fffbeb',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            <div className="badge-gold" style={{ marginBottom: '4px' }}>
              Direct Admissions Line
            </div>
            <h3 id="call-modal-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#78350f', letterSpacing: '-0.02em' }}>
              Connect with SCIMEE
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#92400e', marginTop: '2px' }}>
              Sara Coaching Institute of Medical Entrance Examination
            </p>
          </div>

          <button
            onClick={onClose}
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
        <div style={{ padding: '22px 24px', maxHeight: '78vh', overflowY: 'auto', background: '#ffffff' }}>
          
          {/* Operating Hours Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#f0f9ff',
            border: '1px solid rgba(2, 132, 199, 0.2)',
            padding: '9px 12px',
            borderRadius: '12px',
            marginBottom: '18px'
          }}>
            <Clock size={16} color="#0284c7" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.8rem', color: '#0369a1' }}>
              <strong>Office Hours:</strong> {siteConfig.contact.operatingHours.weekdays} (Sun: {siteConfig.contact.operatingHours.sunday})
            </div>
          </div>

          {/* Instant 1-Tap Calling Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              onClick={() => trackEvent('call_primary_clicked', { phone: siteConfig.contact.primaryPhone })}
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
                {siteConfig.contact.primaryPhoneFormatted}
              </span>
            </a>

            <a
              href={`tel:${siteConfig.contact.secondaryPhone}`}
              onClick={() => trackEvent('call_secondary_clicked', { phone: siteConfig.contact.secondaryPhone })}
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
                {siteConfig.contact.secondaryPhoneFormatted}
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
              <span style={{ fontSize: '0.82rem', fontWeight: '800' }}>
                Instant Reply &rarr;
              </span>
            </a>

            {/* 1-Tap Save Contact to Phonebook */}
            <button
              onClick={handleSaveContact}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '12px 18px',
                height: '46px',
                fontSize: '0.88rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#f8fafc',
                border: '1px dashed rgba(0, 0, 0, 0.16)'
              }}
            >
              <UserPlus size={16} color="#0284c7" />
              <span>Save Rehan Sir (SCIMEE) to Phonebook</span>
              <Download size={14} color="var(--text-muted)" />
            </button>
          </div>

          {/* Location Footnote */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            fontSize: '0.76rem',
            color: 'var(--text-muted)'
          }}>
            <MapPin size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              {siteConfig.location.addressLine1}, {siteConfig.location.addressLine2}, {siteConfig.location.city} - {siteConfig.location.pincode}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
