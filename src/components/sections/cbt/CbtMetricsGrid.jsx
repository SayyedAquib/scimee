import React from 'react';

export default function CbtMetricsGrid({ metricsList }) {
  if (!Array.isArray(metricsList) || metricsList.length === 0) return null;

  return (
    <div className="grid-responsive-4" style={{ marginBottom: '32px', textAlign: 'left' }}>
      {metricsList.map((metric, idx) => {
        const isEmerald = idx === 0 || idx === 1;
        return (
          <div
            key={metric?.id ?? idx}
            className={isEmerald ? 'bento-card-emerald' : 'bento-card'}
            style={{
              padding: '20px 18px',
              borderRadius: '20px'
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                fontWeight: '900',
                color: isEmerald ? '#065f46' : 'var(--text-heading)',
                letterSpacing: '-0.03em',
                lineHeight: '1',
                marginBottom: '6px'
              }}
            >
              {metric?.value}
            </div>
            <div
              style={{
                fontSize: '0.86rem',
                fontWeight: '800',
                color: isEmerald ? '#047857' : 'var(--text-title)',
                marginBottom: '3px',
                letterSpacing: '-0.01em'
              }}
            >
              {metric?.label}
            </div>
            <div
              style={{
                fontSize: '0.74rem',
                color: isEmerald ? '#065f46' : 'var(--text-muted)',
                lineHeight: '1.3'
              }}
            >
              {metric?.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
