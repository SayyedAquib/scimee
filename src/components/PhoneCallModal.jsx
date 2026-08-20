import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, MessageCircle, Clock, MapPin, X, CheckCircle2, ArrowRight } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function PhoneCallModal({ isOpen, onClose }) {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('NEET Repeater');
  const [formError, setFormError] = useState('');

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
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
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 100%)',
          padding: '22px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div className="badge-gold" style={{ marginBottom: '6px' }}>
              Direct Helpline
            </div>
            <h3 id="call-modal-title" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
              Connect with SCIMEE
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Sara Coaching Institute of Medical Entrance Examination
            </p>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          
          {/* Quick Info Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <Clock size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
              <strong>Hours:</strong> {siteConfig.contact.operatingHours.weekdays} (Sun: {siteConfig.contact.operatingHours.sunday})
            </div>
          </div>

          {/* Primary Instant Call Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: '1.02rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={20} />
                <span>Call Primary Helpline</span>
              </span>
              <span style={{ fontWeight: '800', letterSpacing: '0.5px' }}>
                {siteConfig.contact.primaryPhoneFormatted}
              </span>
            </a>

            <a
              href={`tel:${siteConfig.contact.secondaryPhone}`}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '13px 20px',
                fontSize: '0.98rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--accent-gold)" />
                <span>Call Secondary Line</span>
              </span>
              <span style={{ fontWeight: '700', letterSpacing: '0.5px' }}>
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
                padding: '13px 20px',
                fontSize: '0.98rem',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={19} />
                <span>Chat on WhatsApp</span>
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                Instant Reply &rarr;
              </span>
            </a>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '20px 0',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span>OR REQUEST A CALLBACK</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* Callback Form */}
          {callbackRequested ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={36} color="var(--accent-emerald)" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px' }}>
                Callback Request Received!
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Our admissions counselor will call you shortly at <strong>{phoneNumber}</strong>.
              </p>
              <button
                onClick={resetAndClose}
                className="btn-secondary"
                style={{ marginTop: '14px', width: '100%', padding: '10px' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  Student / Parent Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohd Rehan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  Mobile Number <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-input)',
                    border: formError ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                {formError && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>{formError}</p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600' }}>
                  Interested Batch
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    background: '#0b1220',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="NEET Repeater">NEET Repeater / Dropper Batch</option>
                  <option value="NEET 11th/12th Integrated">NEET 11th & 12th Integrated</option>
                  <option value="Pre-Foundation 5th-10th">Pre-Foundation (Class 5th - 10th)</option>
                  <option value="MHT-CET / JEE">MHT-CET & JEE Foundation</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  padding: '12px',
                  fontSize: '0.95rem'
                }}
              >
                <span>Submit Callback Request</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Location Hint */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            <MapPin size={15} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              {siteConfig.location.addressLine1}, {siteConfig.location.addressLine2}, {siteConfig.location.city} - {siteConfig.location.pincode}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
