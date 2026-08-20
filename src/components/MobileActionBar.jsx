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
        background: 'rgba(6, 9, 19, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '10px 14px',
        boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.6)'
      }}
      className="mobile-action-bar"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1fr',
        gap: '8px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {/* Direct Call Button */}
        <button
          onClick={onOpenCallModal}
          className="btn-primary"
          style={{
            padding: '10px 12px',
            fontSize: '0.85rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
          }}
        >
          <PhoneCall size={16} />
          <span>Call Now</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{
            padding: '10px 12px',
            fontSize: '0.85rem',
            borderRadius: '10px',
            textDecoration: 'none',
            justifyContent: 'center'
          }}
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>

        {/* Syllabus / Courses Button */}
        <a
          href="#syllabus"
          className="btn-secondary"
          style={{
            padding: '10px 10px',
            fontSize: '0.85rem',
            borderRadius: '10px',
            textDecoration: 'none',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <BookOpen size={15} color="var(--accent-blue)" />
          <span>Syllabus</span>
        </a>
      </div>
    </div>
  );
}
