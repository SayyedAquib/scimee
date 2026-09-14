import React from 'react';
import { ChevronRight, Laptop, ExternalLink, PhoneCall } from 'lucide-react';
import { getCbtUrl, openCbtPortal } from '../../utils/cbt';

export default function HeaderMobileDrawer({
  isOpen,
  activeSection,
  navItems,
  onNavClick,
  onClose,
  onOpenCallModal,
  primaryPhoneFormatted
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '84px',
        left: '16px',
        right: '16px',
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(30px) saturate(200%)',
        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        borderRadius: '24px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '18px',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)',
        animation: 'appleScaleIn 200ms var(--spring-snappy)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item?.id;
          return (
            <a
              key={item?.id}
              href={item?.href}
              onClick={(e) => onNavClick(e, item?.id)}
              style={{
                color: isActive ? '#92400e' : 'var(--text-heading)',
                textDecoration: 'none',
                fontSize: '0.96rem',
                fontWeight: isActive ? '800' : '600',
                padding: '10px 14px',
                borderRadius: '12px',
                background: isActive ? '#fffbeb' : 'rgba(0, 0, 0, 0.03)',
                border: isActive ? '1px solid rgba(217, 119, 6, 0.3)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isActive && (
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#d97706'
                    }}
                  />
                )}
                <span>{item?.label}</span>
              </div>
              <ChevronRight size={15} color={isActive ? '#d97706' : 'var(--text-muted)'} />
            </a>
          );
        })}

        <a
          href={getCbtUrl('/tests')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e?.preventDefault?.();
            onClose();
            openCbtPortal('/tests', 'header_mobile_drawer');
          }}
          style={{
            color: '#065f46',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: '800',
            padding: '11px 14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Laptop size={17} color="#059669" />
            <span>CBT Online Mock Tests</span>
            <span
              style={{
                fontSize: '0.65rem',
                background: '#059669',
                color: '#fff',
                padding: '2px 6px',
                borderRadius: '6px',
                fontWeight: '800'
              }}
            >
              NTA Live
            </span>
          </div>
          <ExternalLink size={14} color="#059669" />
        </a>

        <div style={{ paddingTop: '8px' }}>
          <button
            onClick={() => {
              onClose();
              onOpenCallModal?.();
            }}
            className="btn-primary"
            style={{ width: '100%', padding: '11px', fontSize: '0.9rem' }}
          >
            <PhoneCall size={16} />
            <span>Call {primaryPhoneFormatted}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
