import React, { useState, useMemo } from 'react';
import { FileText, PhoneCall, Award, CheckCircle2 } from 'lucide-react';
import syllabusData from '../data/syllabus.json';
import SyllabusUnitCard from './syllabus/SyllabusUnitCard';
import SyllabusSubjectBar from './syllabus/SyllabusSubjectBar';

const EXAMS_LIST = Array.isArray(syllabusData?.exams) ? syllabusData.exams : [];
const DEFAULT_EXAM_ID = EXAMS_LIST[0]?.id ?? 'neet';

export default function SyllabusExplorer({ onOpenCallModal }) {
  const examsList = EXAMS_LIST;

  const [selectedExamId, setSelectedExamId] = useState(DEFAULT_EXAM_ID);
  const [activeSubjectId, setActiveSubjectId] = useState('physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(null);

  // Active exam object with safe fallback
  const activeExam = useMemo(() => {
    return EXAMS_LIST.find((e) => e?.id === selectedExamId) || EXAMS_LIST[0] || {};
  }, [selectedExamId]);

  const examSubjects = Array.isArray(activeExam?.subjects) ? activeExam.subjects : [];

  // Ensure activeSubjectId exists in activeExam
  const currentSubject = useMemo(() => {
    const subjects = Array.isArray(activeExam?.subjects) ? activeExam.subjects : [];
    const found = subjects.find((s) => s?.id === activeSubjectId);
    return found || subjects[0] || {};
  }, [activeExam, activeSubjectId]);

  const handleExamChange = (examId) => {
    if (!examId || typeof examId !== 'string') return;
    setSelectedExamId(examId);
    setExpandedUnit(null);
    setSearchQuery('');
    const targetExam = EXAMS_LIST.find((e) => e?.id === examId);
    if (targetExam && Array.isArray(targetExam?.subjects) && targetExam.subjects.length > 0) {
      setActiveSubjectId(targetExam.subjects[0]?.id ?? 'physics');
    }
  };

  const displayedUnits = useMemo(() => {
    const units = Array.isArray(currentSubject?.units) ? currentSubject.units : [];
    if (!units.length) return [];

    if (!searchQuery?.trim()) {
      return units;
    }

    const query = searchQuery.trim().toLowerCase();
    return units.filter((unit) => {
      if (!unit) return false;
      const unitName = String(unit?.name ?? '').toLowerCase();
      const unitTopics = String(unit?.topics ?? '').toLowerCase();
      const unitNum = String(unit?.unitNumber ?? '');
      return unitName.includes(query) || unitTopics.includes(query) || unitNum.includes(query);
    });
  }, [currentSubject, searchQuery]);

  const toggleUnit = (unitNumber) => {
    if (unitNumber === undefined || unitNumber === null) return;
    setExpandedUnit((prev) => (prev === unitNumber ? null : unitNumber));
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

            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: '900',
                lineHeight: '1.12',
                letterSpacing: '-0.03em',
                marginBottom: '10px',
                color: 'var(--text-heading)'
              }}
            >
              Entrance Examination Syllabus Explorer
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              Comprehensive topic-by-topic curriculum and marking schemes for{' '}
              <strong>NEET-UG</strong>, <strong>JEE (Main)</strong>, and <strong>MHT-CET</strong>.
            </p>
          </div>

          {/* Apple Multi-Exam Switcher (Segmented Pills) */}
          <div
            role="tablist"
            aria-label="Exam Syllabus Selection"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '26px'
            }}
          >
            {examsList.map((exam) => {
              const examId = exam?.id;
              const isSelected = examId === selectedExamId;
              return (
                <button
                  key={examId}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleExamChange(examId)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 'var(--radius-pill)',
                    border: isSelected
                      ? '1px solid rgba(217, 119, 6, 0.4)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    background: isSelected
                      ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
                      : '#ffffff',
                    color: isSelected ? '#78350f' : 'var(--text-sub)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: isSelected
                      ? '0 4px 14px rgba(217, 119, 6, 0.18)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition:
                      'background 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Award size={15} color={isSelected ? '#d97706' : 'var(--text-muted)'} />
                  <span>{exam?.name}</span>
                </button>
              );
            })}
          </div>

          {/* Exam Info & Marking Scheme Summary Banner */}
          <div
            className="bento-card"
            style={{
              padding: '18px 22px',
              marginBottom: '20px',
              borderRadius: '20px',
              background: '#f8fafc',
              borderLeft: '4px solid #d97706'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-gold" style={{ padding: '2px 8px', fontSize: '0.66rem' }}>
                {activeExam?.badge}
              </span>
              <h3
                style={{
                  fontSize: '1.08rem',
                  fontWeight: '800',
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.01em'
                }}
              >
                {activeExam?.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', marginBottom: '8px' }}>
              {activeExam?.subtitle}
            </p>
            <div
              style={{
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
              }}
            >
              <CheckCircle2 size={13} color="#d97706" />
              <span>{activeExam?.markingScheme}</span>
            </div>
          </div>

          {/* Apple Subject Switcher & Search Bar */}
          <SyllabusSubjectBar
            examSubjects={examSubjects}
            currentSubject={currentSubject}
            onSelectSubject={(id) => {
              setActiveSubjectId(id);
              setExpandedUnit(null);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Units List */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}
          >
            {displayedUnits.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '36px 20px',
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <p style={{ color: 'var(--text-sub)', fontSize: '0.92rem' }}>
                  No units found matching &quot;<strong>{searchQuery}</strong>&quot; in{' '}
                  {activeExam?.name} {currentSubject?.name}.
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
              displayedUnits.map((unit) => (
                <SyllabusUnitCard
                  key={unit?.unitNumber}
                  unit={unit}
                  isExpanded={expandedUnit === unit?.unitNumber}
                  onToggle={toggleUnit}
                  examId={activeExam?.id}
                />
              ))
            )}
          </div>

          {/* Bottom Faculty Advisory Banner */}
          <div
            className="bento-card"
            style={{
              padding: '20px 22px',
              borderRadius: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              borderLeft: '4px solid #0284c7'
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: '1.02rem',
                  fontWeight: '800',
                  color: 'var(--text-heading)',
                  marginBottom: '3px',
                  letterSpacing: '-0.01em'
                }}
              >
                Preparing for NEET, JEE Main, or MHT-CET 2026?
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>
                Get personal 1-on-1 concept drills, numerical solving, and NCERT / State Board
                mastery at SCIMEE.
              </p>
            </div>

            <button
              onClick={() => onOpenCallModal?.()}
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
