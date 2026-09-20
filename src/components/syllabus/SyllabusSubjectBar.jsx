import React from 'react';
import { Search, BookOpen, Dna, Atom, FlaskConical, Calculator } from 'lucide-react';

export default function SyllabusSubjectBar({
  examSubjects,
  currentSubject,
  onSelectSubject,
  searchQuery,
  onSearchChange
}) {
  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'atom':
        return <Atom size={16} />;
      case 'flask-conical':
        return <FlaskConical size={16} />;
      case 'dna':
        return <Dna size={16} />;
      case 'calculator':
        return <Calculator size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  return (
    <div
      className="bento-card"
      style={{
        padding: '16px 18px',
        marginBottom: '22px',
        borderRadius: '20px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}
      >
        {/* Subject Selector Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {examSubjects.map((sub) => {
            const subId = sub?.id;
            const isActive = subId === currentSubject?.id;
            return (
              <button
                key={subId}
                onClick={() => onSelectSubject(subId)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive
                    ? '1px solid rgba(217, 119, 6, 0.4)'
                    : '1px solid rgba(0, 0, 0, 0.08)',
                  background: isActive ? '#fffbeb' : '#f8fafc',
                  color: isActive ? '#92400e' : 'var(--text-sub)',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: isActive ? '0 2px 8px rgba(217, 119, 6, 0.15)' : 'none',
                  transition:
                    'background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease'
                }}
              >
                {getSubjectIcon(sub?.icon)}
                <span>{sub?.name}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    background: isActive ? '#92400e' : 'rgba(0, 0, 0, 0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-sub)',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    fontWeight: '800'
                  }}
                >
                  {sub?.totalUnits} {sub?.totalUnits === 1 ? 'Unit' : 'Units'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '360px' }}>
          <Search
            size={16}
            color="var(--text-muted)"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <input
            type="text"
            placeholder={`Search ${currentSubject?.name || ''} units (e.g. Calculus, Optics)...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value ?? '')}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: 'var(--radius-pill)',
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              color: 'var(--text-heading)',
              fontSize: '0.86rem',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
