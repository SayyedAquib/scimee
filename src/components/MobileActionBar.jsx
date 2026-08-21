import React from 'react';
import { PhoneCall, MessageCircle, BookOpen } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function MobileActionBar({ onOpenCallModal }) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappPrefillText
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '9px 14px 12px 14px',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.08)'
      }}
      className="mobile-action-bar"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr 1fr',
        gap: '8px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        {/* Direct Call Button */}
        <button
          onClick={onOpenCallModal}
          className="btn-primary"
          style={{
            padding: '9px 12px',
            fontSize: '0.82rem',
            borderRadius: '10px'
          }}
        >
          <PhoneCall size={15} />
          <span>Call Now</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{
            padding: '9px 12px',
            fontSize: '0.82rem',
            borderRadius: '10px',
            textDecoration: 'none',
            justifyContent: 'center'
          }}
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>

        {/* Syllabus / Courses Button */}
        <a
          href="#syllabus"
          className="btn-secondary"
          style={{
            padding: '9px 10px',
            fontSize: '0.82rem',
            borderRadius: '10px',
            textDecoration: 'none',
            justifyContent: 'center'
          }}
        >
          <BookOpen size={14} color="#0284c7" />
          <span>Syllabus</span>
        </a>
      </div>
    </div>
  );
}
