import React from 'react';

export default function HeaderDesktopNav({
  navRef,
  indicatorStyle,
  navItems,
  activeSection,
  navItemRefs,
  onNavClick
}) {
  return (
    <nav
      ref={navRef}
      style={{
        display: 'none',
        alignItems: 'center',
        gap: '2px',
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.03)',
        padding: '4px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid rgba(0, 0, 0, 0.04)'
      }}
      className="desktop-nav"
    >
      {/* Apple Smooth Sliding Pill Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          left: `${indicatorStyle?.left ?? 0}px`,
          width: `${indicatorStyle?.width ?? 0}px`,
          opacity: indicatorStyle?.opacity ?? 0,
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '1px solid rgba(217, 119, 6, 0.35)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.15)',
          transition:
            'left 280ms cubic-bezier(0.16, 1, 0.3, 1), width 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {navItems.map((item) => {
        const isActive = activeSection === item?.id;
        return (
          <a
            key={item?.id}
            ref={(el) => {
              if (item?.id) {
                navItemRefs.current[item.id] = el;
              }
            }}
            href={item?.href}
            onClick={(e) => onNavClick(e, item?.id)}
            className="nav-link"
            style={{
              position: 'relative',
              zIndex: 1,
              color: isActive ? '#92400e' : 'var(--text-sub)',
              fontWeight: isActive ? '800' : '600',
              fontSize: '0.84rem',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              transition: 'color 180ms ease',
              whiteSpace: 'nowrap'
            }}
          >
            {item?.label}
          </a>
        );
      })}
    </nav>
  );
}
