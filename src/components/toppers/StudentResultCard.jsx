import React from 'react';
import { User, Star, CheckCircle2 } from 'lucide-react';

export default function StudentResultCard({ student }) {
  const score = Number(student?.score ?? 0);
  const isRank1 = score >= 500;

  return (
    <div
      className={isRank1 ? 'bento-card-gold' : 'bento-card'}
      style={{
        padding: '22px 16px',
        textAlign: 'center',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Rank Pill */}
      {isRank1 && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 100%)',
            color: '#78350f',
            fontSize: '0.64rem',
            fontWeight: '900',
            padding: '2px 10px',
            borderRadius: 'var(--radius-pill)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            marginBottom: '10px'
          }}
        >
          <Star size={10} fill="#78350f" />
          <span>Top Scorer</span>
        </div>
      )}

      {/* Avatar Ring */}
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          margin: isRank1 ? '0 auto 10px' : '6px auto 10px',
          background: isRank1 ? '#fef3c7' : '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: isRank1 ? '1.5px solid #d97706' : '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <User size={24} color={isRank1 ? '#b45309' : 'var(--text-muted)'} />
      </div>

      {/* Name */}
      <h4
        style={{
          fontSize: '0.98rem',
          fontWeight: '800',
          color: 'var(--text-heading)',
          marginBottom: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          letterSpacing: '-0.01em'
        }}
      >
        {student?.name}
      </h4>

      {/* Score */}
      <div
        style={{
          fontSize: 'clamp(1.7rem, 3.4vw, 2.1rem)',
          fontWeight: '900',
          color: isRank1 ? '#b45309' : '#e11d48',
          lineHeight: '1.05',
          marginBottom: '6px',
          letterSpacing: '-0.03em'
        }}
      >
        {student?.score}
      </div>

      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          color: 'var(--text-sub)',
          background: 'rgba(0, 0, 0, 0.03)',
          padding: '3px 8px',
          borderRadius: '6px'
        }}
      >
        <CheckCircle2 size={11} color="#059669" />
        <span>{student?.badge}</span>
      </div>
    </div>
  );
}
