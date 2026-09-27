import React from 'react';
import { Award, X } from 'lucide-react';

export default function PhoneModalHeader({ modalData, onClose }) {
  return (
    <div
      style={{
        background: '#fffbeb',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(217, 119, 6, 0.18)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      <div>
        <span className="badge-gold" style={{ marginBottom: '6px' }}>
          <Award size={12} />
          <span>{modalData?.badge}</span>
        </span>
        <h3
          id="call-modal-title"
          style={{
            fontSize: '1.25rem',
            fontWeight: '900',
            color: 'var(--text-heading)',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}
        >
          {modalData?.title}
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', marginTop: '4px' }}>
          {modalData?.subtitle}
        </p>
      </div>

      <button
        onClick={() => onClose?.()}
        aria-label="Close dialog"
        style={{
          background: 'rgba(0, 0, 0, 0.05)',
          border: 'none',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-heading)',
          flexShrink: 0
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
