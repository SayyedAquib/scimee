import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function SyllabusUnitCard({ unit, isExpanded, onToggle, examId }) {
  const unitTitle = examId === 'mhtcet' ? unit?.name : `Unit ${unit?.unitNumber}: ${unit?.name}`;

  return (
    <div
      className="bento-card"
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        border: isExpanded ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid var(--border-glass)'
      }}
    >
      <button
        onClick={() => onToggle(unit?.unitNumber)}
        style={{
          width: '100%',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isExpanded ? '#fffbeb' : '#ffffff',
          border: 'none',
          color: 'var(--text-heading)',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: isExpanded ? '#fef3c7' : '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.76rem',
              fontWeight: '900',
              color: '#b45309',
              flexShrink: 0
            }}
          >
            {unit?.unitNumber}
          </div>
          <div
            style={{
              fontSize: '0.94rem',
              fontWeight: '700',
              color: isExpanded ? '#78350f' : 'var(--text-heading)',
              letterSpacing: '-0.01em'
            }}
          >
            {unitTitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)'
          }}
        >
          <span style={{ fontSize: '0.78rem' }}>{isExpanded ? 'Hide' : 'View Topics'}</span>
          <ChevronDown
            size={15}
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 220ms var(--spring-snappy)'
            }}
          />
        </div>
      </button>

      {isExpanded && (
        <div
          style={{
            padding: 'clamp(12px, 3vw, 16px) clamp(14px, 4vw, 24px)',
            background: '#f8fafc',
            borderTop: '1px solid var(--border-glass)',
            fontSize: '0.88rem',
            color: 'var(--text-sub)',
            lineHeight: '1.65',
            animation: 'appleAccordionOpen 220ms var(--spring-snappy)'
          }}
        >
          <strong
            style={{
              color: 'var(--text-heading)',
              display: 'block',
              marginBottom: '4px',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Topics &amp; Key Focus Areas:
          </strong>
          <p>{unit?.topics}</p>
        </div>
      )}
    </div>
  );
}
