import React from 'react';
import { Award, Dna, Atom, FlaskConical } from 'lucide-react';

export default function SubjectTopperCard({ topper }) {
  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'dna':
        return <Dna size={26} color="#059669" />;
      case 'atom':
        return <Atom size={26} color="#0284c7" />;
      case 'flask-conical':
        return <FlaskConical size={26} color="#9333ea" />;
      default:
        return <Award size={26} color="#d97706" />;
    }
  };

  return (
    <div
      className="bento-card"
      style={{
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {getSubjectIcon(topper?.icon)}
      </div>
      <div>
        <div
          style={{
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {topper?.subject} Topper
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontSize: '1.9rem',
              fontWeight: '900',
              color: 'var(--text-heading)',
              letterSpacing: '-0.03em',
              lineHeight: '1.1'
            }}
          >
            {topper?.score}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>/{topper?.total}</span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', marginTop: '2px' }}>
          {topper?.tagline}
        </div>
      </div>
    </div>
  );
}
