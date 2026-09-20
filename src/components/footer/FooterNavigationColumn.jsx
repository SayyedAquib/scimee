import React from 'react';
import { Laptop, ExternalLink } from 'lucide-react';
import { getCbtUrl, openCbtPortal } from '../../utils/cbt';

export default function FooterNavigationColumn({ navList }) {
  return (
    <div>
      <h3
        style={{
          fontSize: '0.88rem',
          fontWeight: '800',
          color: 'var(--text-heading)',
          marginBottom: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        Quick Navigation
      </h3>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '16px'
        }}
      >
        {navList.map((item) => (
          <li key={item?.href || item?.label}>
            <a
              href={item?.href}
              style={{
                color: 'var(--text-sub)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                transition: 'color 120ms ease'
              }}
              onMouseOver={(e) => {
                if (e?.currentTarget?.style) {
                  e.currentTarget.style.color = '#b45309';
                }
              }}
              onFocus={(e) => {
                if (e?.currentTarget?.style) {
                  e.currentTarget.style.color = '#b45309';
                }
              }}
              onMouseOut={(e) => {
                if (e?.currentTarget?.style) {
                  e.currentTarget.style.color = 'var(--text-sub)';
                }
              }}
              onBlur={(e) => {
                if (e?.currentTarget?.style) {
                  e.currentTarget.style.color = 'var(--text-sub)';
                }
              }}
            >
              {item?.label}
            </a>
          </li>
        ))}
      </ul>

      <h3
        style={{
          fontSize: '0.82rem',
          fontWeight: '800',
          color: '#065f46',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <Laptop size={14} color="#059669" />
        <span>Student Portals</span>
      </h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <li>
          <a
            href={getCbtUrl('/tests')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e?.preventDefault?.();
              openCbtPortal('/tests', 'footer_mock_tests');
            }}
            style={{
              color: '#047857',
              textDecoration: 'none',
              fontSize: '0.86rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>NEET CBT Mock Tests</span>
            <ExternalLink size={12} />
          </a>
        </li>
        <li>
          <a
            href={getCbtUrl('/login')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e?.preventDefault?.();
              openCbtPortal('/login', 'footer_login');
            }}
            style={{
              color: 'var(--text-sub)',
              textDecoration: 'none',
              fontSize: '0.86rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>Student Portal Login</span>
            <ExternalLink size={12} />
          </a>
        </li>
      </ul>
    </div>
  );
}
