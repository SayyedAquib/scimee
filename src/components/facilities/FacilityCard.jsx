import React from 'react';
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
  Users,
  ShieldCheck,
  Award,
  Laptop
} from 'lucide-react';

export default function FacilityCard({ feat }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'laptop':
        return <Laptop size={22} color="#059669" />;
      case 'book-open':
        return <BookOpen size={22} color="#d97706" />;
      case 'graduation-cap':
        return <GraduationCap size={22} color="#0284c7" />;
      case 'clipboard-check':
        return <ClipboardCheck size={22} color="#059669" />;
      case 'user-check':
        return <UserCheck size={22} color="#9333ea" />;
      case 'users':
        return <Users size={22} color="#d97706" />;
      case 'shield-check':
        return <ShieldCheck size={22} color="#059669" />;
      default:
        return <Award size={22} color="#d97706" />;
    }
  };

  return (
    <div
      className="bento-card facility-card"
      style={{
        padding: '24px',
        borderRadius: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start'
      }}
    >
      <div
        className="facility-icon-box"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition:
            'transform 200ms var(--spring-snappy), background-color 200ms ease, box-shadow 200ms ease'
        }}
      >
        {getIcon(feat?.icon)}
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}
        >
          <h3
            style={{
              fontSize: '1.08rem',
              fontWeight: '800',
              color: 'var(--text-heading)',
              letterSpacing: '-0.01em'
            }}
          >
            {feat?.title}
          </h3>
          {feat?.tag && (
            <span className="badge-gold" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
              {feat.tag}
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
          {feat?.description}
        </p>
      </div>
    </div>
  );
}
