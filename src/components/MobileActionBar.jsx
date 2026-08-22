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
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '10px 14px 12px 14px',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.08)'
      }}
      className="mobile-action-bar"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        maxWidth: '480px',
        margin: '0 auto',
        alignItems: 'stretch'
      }}>
        {/* Direct Call Button */}
        <button
          onClick={onOpenCallModal}
          className="btn-primary"
          style={{
            padding: '10px 8px',
            fontSize: '0.82rem',
            borderRadius: '12px',
            width: '100%',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <PhoneCall size={15} style={{ flexShrink: 0 }} />
          <span>Call Now</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{
            padding: '10px 8px',
            fontSize: '0.82rem',
            borderRadius: '12px',
            textDecoration: 'none',
            width: '100%',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <MessageCircle size={15} style={{ flexShrink: 0 }} />
          <span>WhatsApp</span>
        </a>

        {/* Syllabus / Courses Button */}
        <a
          href="#syllabus"
          className="btn-secondary"
          style={{
            padding: '10px 8px',
            fontSize: '0.82rem',
            borderRadius: '12px',
            textDecoration: 'none',
            width: '100%',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <BookOpen size={15} color="#0284c7" style={{ flexShrink: 0 }} />
          <span>Syllabus</span>
        </a>
      </div>
    </div>
  );
}
