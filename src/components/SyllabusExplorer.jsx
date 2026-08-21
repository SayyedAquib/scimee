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
    <section id="syllabus" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 28px' }}>
            <div className="badge-gold" style={{ marginBottom: '10px' }}>
              <FileText size={13} />
              <span>Official NMC Curriculum</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: 'var(--text-heading)'
            }}>
              {syllabusData.title}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              Complete 50-Unit Curriculum notified by the Under Graduate Medical Education Board (UGMEB / NMC) for NEET (UG) candidates.
            </p>
          </div>

          {/* Apple Control Bar (Tabs + Search) */}
          <div className="bento-card" style={{
            padding: '16px 18px',
            marginBottom: '22px',
            borderRadius: '20px'
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
                        borderRadius: 'var(--radius-pill)',
                        border: isActive ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
                        background: isActive ? '#fffbeb' : '#f8fafc',
                        color: isActive ? '#b45309' : 'var(--text-sub)',
                        fontWeight: isActive ? '800' : '600',
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        boxShadow: isActive ? '0 2px 8px rgba(217, 119, 6, 0.15)' : 'none',
                        transition: 'all 150ms ease'
                      }}
                    >
                      {getSubjectIcon(sub.id)}
                      <span>{sub.name}</span>
                      <span style={{
                        fontSize: '0.7rem',
                        background: isActive ? '#d97706' : 'rgba(0, 0, 0, 0.08)',
                        color: isActive ? '#ffffff' : 'var(--text-sub)',
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
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder={`Search ${activeSubjectData?.name || ''} units (e.g. Optics)...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Units List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {displayedUnits.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '36px 20px',
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid var(--border-glass)'
              }}>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.92rem' }}>
                  No units found matching &quot;<strong>{searchQuery}</strong>&quot; in {activeSubjectData?.name}.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-secondary"
                  style={{ marginTop: '10px', padding: '6px 14px', fontSize: '0.8rem' }}
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
                    className="bento-card"
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: isExpanded ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid var(--border-glass)'
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
                        background: isExpanded ? '#fffbeb' : '#ffffff',
                        border: 'none',
                        color: 'var(--text-heading)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: isExpanded ? '#fef3c7' : '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.76rem',
                          fontWeight: '900',
                          color: '#b45309',
                          flexShrink: 0
                        }}>
                          {unit.unitNumber}
                        </div>
                        <div style={{ fontSize: '0.94rem', fontWeight: '700', color: isExpanded ? '#78350f' : 'var(--text-heading)', letterSpacing: '-0.01em' }}>
                          Unit {unit.unitNumber}: {unit.name}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '0.78rem' }}>{isExpanded ? 'Hide' : 'View Topics'}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div style={{
                        padding: '14px 18px 18px 56px',
                        background: '#f8fafc',
                        borderTop: '1px solid var(--border-glass)',
                        fontSize: '0.88rem',
                        color: 'var(--text-sub)',
                        lineHeight: '1.65'
                      }}>
                        <strong style={{ color: 'var(--text-heading)', display: 'block', marginBottom: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
          <div className="bento-card" style={{
            padding: '20px 22px',
            borderRadius: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            borderLeft: '4px solid #0284c7'
          }}>
            <div>
              <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '3px', letterSpacing: '-0.01em' }}>
                Struggling with any specific NEET physics, chemistry, or biology unit?
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>
                Get personal 1-on-1 concept drills and numerical problem-solving sessions at SCIMEE.
              </p>
            </div>

            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
            >
              <PhoneCall size={14} />
              <span>Consult Subject Faculty</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
