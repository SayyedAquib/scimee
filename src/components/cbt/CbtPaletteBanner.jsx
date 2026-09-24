import React from 'react';

export default function CbtPaletteBanner() {
  return (
    <div
      className="bento-card"
      style={{
        padding: 'clamp(20px, 3.5vw, 28px)',
        borderRadius: '24px',
        marginBottom: '32px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.65) 100%)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '16px'
        }}
      >
        <div>
          <span className="badge-emerald" style={{ marginBottom: '6px' }}>
            Official NTA Scoring Compliance
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)',
              fontWeight: '900',
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em'
            }}
          >
            Authentic 5-State Question Palette Architecture
          </h3>
        </div>

        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#047857',
            background: '#d1fae5',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)'
          }}
        >
          Exact Test-Day Simulation
        </span>
      </div>

      {/* 5-State Visual Palette Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '14px'
        }}
      >
        <div
          className="cbt-palette-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#f1f5f9',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.82rem',
              border: '1px solid #cbd5e1'
            }}
          >
            1
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: '#1e293b', display: 'block' }}>
              Not Visited
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Yet to attempt</span>
          </div>
        </div>

        <div
          className="cbt-palette-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(225, 29, 72, 0.2)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#e11d48',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.82rem'
            }}
          >
            2
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: '#9f1239', display: 'block' }}>
              Not Answered
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Visited, skipped</span>
          </div>
        </div>

        <div
          className="cbt-palette-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(5, 150, 105, 0.2)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#059669',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.82rem'
            }}
          >
            3
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: '#065f46', display: 'block' }}>
              Answered
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#047857' }}>+4 / -1 Evaluated</span>
          </div>
        </div>

        <div
          className="cbt-palette-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(147, 51, 234, 0.2)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#9333ea',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.82rem'
            }}
          >
            4
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: '#6b21a8', display: 'block' }}>
              Marked for Review
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Not evaluated</span>
          </div>
        </div>

        <div
          className="cbt-palette-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(147, 51, 234, 0.35)',
            boxShadow: '0 2px 8px rgba(147, 51, 234, 0.1)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#9333ea',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.82rem',
              position: 'relative'
            }}
          >
            5
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                position: 'absolute',
                bottom: '0',
                right: '0',
                border: '1px solid #ffffff'
              }}
            />
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: '#6b21a8', display: 'block' }}>
              Answered &amp; Review
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#047857', fontWeight: '700' }}>
              +4 / -1 Evaluated ✓
            </span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: '#065f46', lineHeight: '1.5', margin: 0 }}>
        <strong>NTA Critical Rule:</strong> Questions marked{' '}
        <em>&apos;Answered &amp; Marked for Review&apos;</em> are automatically evaluated for your
        final 720-mark score, safeguarding your scores during high-pressure last-minute submissions.
      </p>
    </div>
  );
}
