import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, MessageCircle, Clock, MapPin, X, CheckCircle2, ArrowRight } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function PhoneCallModal({ isOpen, onClose }) {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('NEET Repeater');
  const [formError, setFormError] = useState('');

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

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setFormError('');
    setCallbackRequested(true);
  };

  const resetAndClose = () => {
    setCallbackRequested(false);
    setPhoneNumber('');
    setStudentName('');
    setFormError('');
    onClose();
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappPrefillText
  )}`;

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
            onClick={resetAndClose}
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
              <strong>Hours:</strong> {siteConfig.contact.operatingHours.weekdays} (Sun: {siteConfig.contact.operatingHours.sunday})
            </div>
          </div>

          {/* Instant 1-Tap Calling Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px 18px',
                fontSize: '0.98rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={18} />
                <span>Call Primary Line</span>
              </span>
              <span style={{ fontWeight: '900', letterSpacing: '0.02em' }}>
                {siteConfig.contact.primaryPhoneFormatted}
              </span>
            </a>

            <a
              href={`tel:${siteConfig.contact.secondaryPhone}`}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '12px 18px',
                fontSize: '0.94rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={17} color="#d97706" />
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
              className="btn-whatsapp"
              style={{
                width: '100%',
                padding: '12px 18px',
                fontSize: '0.94rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} />
                <span>WhatsApp Enquiry</span>
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: '800' }}>
                Instant Reply &rarr;
              </span>
            </a>
          </div>

          {/* Apple Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '18px 0',
            color: 'var(--text-muted)',
            fontSize: '0.74rem',
            letterSpacing: '0.05em'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }} />
            <span>OR REQUEST A CALLBACK</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }} />
          </div>

          {/* Callback Form */}
          {callbackRequested ? (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
              <h4 style={{ color: '#065f46', fontSize: '1rem', fontWeight: '800', marginBottom: '4px' }}>
                Callback Request Received!
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#047857' }}>
                Our faculty counselor will call you shortly at <strong>{phoneNumber}</strong>.
              </p>
              <button
                onClick={resetAndClose}
                className="btn-secondary"
                style={{ marginTop: '12px', width: '100%', padding: '9px' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-sub)', marginBottom: '3px', fontWeight: '600' }}>
                  Student / Parent Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohd Rehan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-heading)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-sub)', marginBottom: '3px', fontWeight: '600' }}>
                  Mobile Number <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: formError ? '1px solid #e11d48' : '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-heading)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                {formError && (
                  <p style={{ color: '#e11d48', fontSize: '0.72rem', marginTop: '3px' }}>{formError}</p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-sub)', marginBottom: '3px', fontWeight: '600' }}>
                  Target Batch
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-heading)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="NEET Repeater">NEET Repeater / Dropper Batch</option>
                  <option value="NEET 11th/12th Integrated">NEET 11th &amp; 12th Integrated</option>
                  <option value="Pre-Foundation 5th-10th">Pre-Foundation (Class 5th - 10th)</option>
                  <option value="MHT-CET / JEE">MHT-CET &amp; JEE Foundation</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '11px',
                  fontSize: '0.92rem'
                }}
              >
                <span>Request Call Back</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          {/* Location Footnote */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            fontSize: '0.74rem',
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
