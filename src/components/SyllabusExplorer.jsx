import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Dna, Atom, FlaskConical, Calculator, ChevronDown, ChevronUp, FileText, PhoneCall, Award, CheckCircle2 } from 'lucide-react';
import syllabusData from '../data/syllabus.json';

export default function SyllabusExplorer({ onOpenCallModal }) {
  const [selectedExamId, setSelectedExamId] = useState('neet');
  const [activeSubjectId, setActiveSubjectId] = useState('physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(null);

  // Active exam object
  const activeExam = useMemo(() => {
    return syllabusData.exams.find((e) => e.id === selectedExamId) || syllabusData.exams[0];
  }, [selectedExamId]);

  // Ensure activeSubjectId exists in activeExam
  const currentSubject = useMemo(() => {
    const found = activeExam.subjects.find((s) => s.id === activeSubjectId);
    return found || activeExam.subjects[0];
  }, [activeExam, activeSubjectId]);

  const handleExamChange = (examId) => {
    setSelectedExamId(examId);
    setExpandedUnit(null);
    setSearchQuery('');
    const targetExam = syllabusData.exams.find((e) => e.id === examId);
    if (targetExam && targetExam.subjects.length > 0) {
      setActiveSubjectId(targetExam.subjects[0].id);
    }
  };

  const displayedUnits = useMemo(() => {
    if (!currentSubject) return [];

    if (!searchQuery.trim()) {
      return currentSubject.units;
    }

    const query = searchQuery.toLowerCase();
    return currentSubject.units.filter((unit) => {
      return (
        unit.name.toLowerCase().includes(query) ||
        unit.topics.toLowerCase().includes(query) ||
        String(unit.unitNumber).includes(query)
      );
    });
  }, [currentSubject, searchQuery]);

  const toggleUnit = (unitNumber) => {
    setExpandedUnit(expandedUnit === unitNumber ? null : unitNumber);
  };

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
    <section id="syllabus" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 28px' }}>
            <div className="badge-gold" style={{ marginBottom: '10px' }}>
              <FileText size={13} />
              <span>Official 2026 Curriculum</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: 'var(--text-heading)'
            }}>
              Entrance Examination Syllabus Explorer
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              Comprehensive topic-by-topic curriculum and marking schemes for <strong>NEET-UG</strong>, <strong>JEE (Main)</strong>, and <strong>MHT-CET</strong>.
            </p>
          </div>

          {/* Apple Multi-Exam Switcher (Segmented Pills) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '26px'
          }}>
            {syllabusData.exams.map((exam) => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => handleExamChange(exam.id)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 'var(--radius-pill)',
                    border: isSelected ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
                    background: isSelected ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : '#ffffff',
                    color: isSelected ? '#78350f' : 'var(--text-sub)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 14px rgba(217, 119, 6, 0.18)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Award size={15} color={isSelected ? '#d97706' : 'var(--text-muted)'} />
                  <span>{exam.name}</span>
                </button>
              );
            })}
          </div>

          {/* Exam Info & Marking Scheme Summary Banner */}
          <div className="bento-card" style={{
            padding: '18px 22px',
            marginBottom: '20px',
            borderRadius: '20px',
            background: '#f8fafc',
            borderLeft: '4px solid #d97706'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-gold" style={{ padding: '2px 8px', fontSize: '0.66rem' }}>
                {activeExam.badge}
              </span>
              <h3 style={{ fontSize: '1.08rem', fontWeight: '800', color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
                {activeExam.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', marginBottom: '8px' }}>
              {activeExam.subtitle}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#92400e',
              background: '#fffbeb',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
              fontWeight: '700'
            }}>
              <CheckCircle2 size={13} color="#d97706" />
              <span>{activeExam.markingScheme}</span>
            </div>
          </div>

          {/* Apple Subject Switcher & Search Bar */}
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
                {activeExam.subjects.map((sub) => {
                  const isActive = sub.id === currentSubject.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => { setActiveSubjectId(sub.id); setExpandedUnit(null); }}
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
                      {getSubjectIcon(sub.icon)}
                      <span>{sub.name}</span>
                      <span style={{
                        fontSize: '0.7rem',
                        background: isActive ? '#d97706' : 'rgba(0, 0, 0, 0.08)',
                        color: isActive ? '#ffffff' : 'var(--text-sub)',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        fontWeight: '800'
                      }}>
                        {sub.totalUnits} {sub.totalUnits === 1 ? 'Unit' : 'Units'}
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
                  placeholder={`Search ${currentSubject?.name || ''} units (e.g. Calculus, Optics)...`}
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
                  No units found matching &quot;<strong>{searchQuery}</strong>&quot; in {activeExam.name} {currentSubject?.name}.
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
                          {activeExam.id === 'mhtcet' ? unit.name : `Unit ${unit.unitNumber}: ${unit.name}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '0.78rem' }}>{isExpanded ? 'Hide' : 'View Topics'}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div style={{
                        padding: 'clamp(12px, 3vw, 16px) clamp(14px, 4vw, 24px)',
                        background: '#f8fafc',
                        borderTop: '1px solid var(--border-glass)',
                        fontSize: '0.88rem',
                        color: 'var(--text-sub)',
                        lineHeight: '1.65'
                      }}>
                        <strong style={{ color: 'var(--text-heading)', display: 'block', marginBottom: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Topics &amp; Key Focus Areas:
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
                Preparing for NEET, JEE Main, or MHT-CET 2026?
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>
                Get personal 1-on-1 concept drills, numerical solving, and NCERT / State Board mastery at SCIMEE.
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
