import React from 'react';
import { CheckCircle2, Cpu, Clock, ShieldCheck, BarChart3, Layers } from 'lucide-react';

export default function CbtFeatureCard({ feat }) {
  const getFeatureIcon = (id) => {
    switch (id) {
      case 'palette':
        return <Layers size={22} color="#059669" />;
      case 'question-bank':
        return <Cpu size={22} color="#0284c7" />;
      case 'proctoring':
        return <Clock size={22} color="#9333ea" />;
      case 'telemetry':
        return <BarChart3 size={22} color="#d97706" />;
      default:
        return <ShieldCheck size={22} color="#059669" />;
    }
  };

  return (
    <div
      className="bento-card"
      style={{
        padding: '24px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px'
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '10px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}
          >
            {getFeatureIcon(feat?.id)}
          </div>
          <span className="badge-emerald" style={{ fontSize: '0.66rem' }}>
            {feat?.tag}
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            color: 'var(--text-heading)',
            marginBottom: '8px',
            letterSpacing: '-0.01em'
          }}
        >
          {feat?.title}
        </h3>

        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-sub)',
            lineHeight: '1.55',
            marginBottom: '14px'
          }}
        >
          {feat?.description}
        </p>

        {/* Bullet Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Array.isArray(feat?.bulletPoints) &&
            feat.bulletPoints.map((bp) => (
              <div
                key={`${feat?.id || 'feat'}-${bp}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: 'var(--text-title)'
                }}
              >
                <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} />
                <span>{bp}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
