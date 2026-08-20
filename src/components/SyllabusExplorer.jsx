import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Dna, Atom, FlaskConical, ChevronDown, ChevronUp, FileText, PhoneCall } from 'lucide-react';
import syllabusData from '../data/syllabus.json';

export default function SyllabusExplorer({ onOpenCallModal }) {
  const [activeSubject, setActiveSubject] = useState('physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(null);

  // Filter units based on active subject tab and search input
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
        return <Atom size={18} />;
      case 'chemistry':
        return <FlaskConical size={18} />;
      case 'biology':
        return <Dna size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  return (
    <section id="syllabus" style={{
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'linear-gradient(180deg, #060913 0%, #0b1226 50%, #060913 100%)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 32px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <FileText size={14} />
            <span>Official NMC Curriculum</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            {syllabusData.title}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Complete 50-Unit Curriculum notified by the Under Graduate Medical Education Board (UGMEB / NMC) for NEET (UG) candidates.
          </p>
        </div>

        {/* Search & Subject Tabs Container */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '28px'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            
            {/* Subject Selector Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {syllabusData.subjects.map((sub) => {
                const isActive = sub.id === activeSubject;
                return (
                  <button
                    key={sub.id}
                    onClick={() => { setActiveSubject(sub.id); setExpandedUnit(null); }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-full)',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                      background: isActive ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: isActive ? '800' : '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {getSubjectIcon(sub.id)}
                    <span>{sub.name}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      background: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#060913' : '#fff',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      fontWeight: '800'
                    }}>
                      {sub.totalUnits} Units
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Bar */}
            <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '380px' }}>
              <Search size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder={`Search ${activeSubjectData?.name || ''} topics (e.g. Optics, Kinetics)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

          </div>
        </div>

        {/* Units List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {displayedUnits.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                No units found matching &quot;<strong>{searchQuery}</strong>&quot; in {activeSubjectData?.name}.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
                style={{ marginTop: '12px', padding: '8px 16px', fontSize: '0.85rem' }}
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
                  className="glass-panel"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: isExpanded ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => toggleUnit(unit.unitNumber)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        color: 'var(--accent-gold-light)',
                        flexShrink: 0
                      }}>
                        {unit.unitNumber}
                      </div>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>
                          Unit {unit.unitNumber}: {unit.name}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                      <span style={{ fontSize: '0.8rem' }}>{isExpanded ? 'Hide' : 'View Topics'}</span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '16px 20px 20px 66px',
                      background: 'rgba(6, 9, 19, 0.5)',
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7'
                    }}>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>
                        Topics & Subtopics Covered:
                      </strong>
                      <p>{unit.topics}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Faculty Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>
              Struggling with any specific NEET physics, chemistry, or biology unit?
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Get personal chapter-wise concept drills and numerical problem-solving sessions at SCIMEE.
            </p>
          </div>

          <button
            onClick={onOpenCallModal}
            className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '0.9rem' }}
          >
            <PhoneCall size={16} />
            <span>Consult Subject Faculty</span>
          </button>
        </div>

      </div>
    </section>
  );
}
