import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Dna, Atom, FlaskConical, ChevronDown, ChevronUp, FileText, PhoneCall } from 'lucide-react';
import syllabusData from '../data/syllabus.json';

export default function SyllabusExplorer({ onOpenCallModal }) {
  const [activeSubject, setActiveSubject] = useState('physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(null);

  const displayedUnits = useMemo(() => {
    const subjectObj = syllabusData.subjects.find((s) => s.id === activeSubject);
    if (!subjectObj) return [];

    if (!searchQuery.trim()) {
      return subjectObj.units;
    }

    const query = searchQuery.toLowerCase();
    return subjectObj.units.filter((unit) => {
      return (
        unit.name.toLowerCase().includes(query) ||
        unit.topics.toLowerCase().includes(query) ||
        String(unit.unitNumber).includes(query)
      );
    });
  }, [activeSubject, searchQuery]);

  const activeSubjectData = syllabusData.subjects.find((s) => s.id === activeSubject);

  const toggleUnit = (unitNumber) => {
    setExpandedUnit(expandedUnit === unitNumber ? null : unitNumber);
  };

  const getSubjectIcon = (subjectId) => {
    switch (subjectId) {
      case 'physics':
        return <Atom size={16} />;
      case 'chemistry':
        return <FlaskConical size={16} />;
      case 'biology':
        return <Dna size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  return (
    <section id="syllabus" style={{
      paddingTop: 'clamp(48px, 8vw, 76px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      background: 'linear-gradient(180deg, #030712 0%, #080f24 50%, #030712 100%)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 30px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <FileText size={13} />
            <span>Official NMC Curriculum</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: '900',
            lineHeight: '1.14',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            {syllabusData.title}
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
            Complete 50-Unit Curriculum notified by the Under Graduate Medical Education Board (UGMEB / NMC) for NEET (UG) candidates.
          </p>
        </div>

        {/* Apple Control Bar (Tabs + Search) */}
        <div className="apple-glass" style={{
          padding: '18px 20px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            
            {/* Subject Selector Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {syllabusData.subjects.map((sub) => {
                const isActive = sub.id === activeSubject;
                return (
                  <button
                    key={sub.id}
                    onClick={() => { setActiveSubject(sub.id); setExpandedUnit(null); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      border: isActive ? '1px solid var(--border-gold-glow)' : '1px solid var(--border-subtle)',
                      background: isActive ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: isActive ? '800' : '600',
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 150ms ease'
                    }}
                  >
                    {getSubjectIcon(sub.id)}
                    <span>{sub.name}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      background: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#030712' : '#fff',
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      fontWeight: '800'
                    }}>
                      {sub.totalUnits}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '360px' }}>
              <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder={`Search ${activeSubjectData?.name || ''} units (e.g. Optics)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 38px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--apple-bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

          </div>
        </div>

        {/* Units List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          {displayedUnits.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'var(--apple-bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                No units found matching &quot;<strong>{searchQuery}</strong>&quot; in {activeSubjectData?.name}.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
                style={{ marginTop: '10px', padding: '7px 14px', fontSize: '0.82rem' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            displayedUnits.map((unit) => {
              const isExpanded = expandedUnit === unit.unitNumber;
              return (
                <div
                  key={unit.unitNumber}
                  className="apple-glass"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: isExpanded ? '1px solid var(--border-gold-glow)' : '1px solid var(--border-subtle)',
                    borderTop: isExpanded ? '1px solid rgba(251, 191, 36, 0.45)' : '1px solid var(--border-specular-top)'
                  }}
                >
                  <button
                    onClick={() => toggleUnit(unit.unitNumber)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isExpanded ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
                      border: 'none',
                      color: '#fff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: '900',
                        color: 'var(--accent-gold-light)',
                        flexShrink: 0
                      }}>
                        {unit.unitNumber}
                      </div>
                      <div style={{ fontSize: '0.96rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.01em' }}>
                        Unit {unit.unitNumber}: {unit.name}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)' }}>
                      <span style={{ fontSize: '0.78rem' }}>{isExpanded ? 'Hide' : 'View Topics'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '14px 18px 18px 58px',
                      background: 'rgba(3, 7, 18, 0.55)',
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.65'
                    }}>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '4px', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Topics &amp; Subtopics:
                      </strong>
                      <p>{unit.topics}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Faculty Advisory Banner */}
        <div className="apple-glass" style={{
          padding: '22px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          borderTop: '1px solid rgba(56, 189, 248, 0.45)'
        }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', marginBottom: '3px', letterSpacing: '-0.01em' }}>
              Struggling with any specific NEET physics, chemistry, or biology unit?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Get personal 1-on-1 concept drills and numerical problem-solving sessions at SCIMEE.
            </p>
          </div>

          <button
            onClick={onOpenCallModal}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            <PhoneCall size={15} />
            <span>Consult Subject Faculty</span>
          </button>
        </div>

      </div>
    </section>
  );
}
