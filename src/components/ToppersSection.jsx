import React, { useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import toppersData from '../data/toppers.json';
import SubjectTopperCard from './toppers/SubjectTopperCard';
import StudentResultCard from './toppers/StudentResultCard';

export default function ToppersSection({ onOpenCallModal }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const studentsList = Array.isArray(toppersData?.students) ? toppersData.students : [];
  const subjectToppersList = Array.isArray(toppersData?.subjectToppers)
    ? toppersData.subjectToppers
    : [];
  const examYear = toppersData?.year ?? '2026';

  const filteredStudents = studentsList.filter((student) => {
    if (!student) return false;
    const score = Number(student?.score ?? 0);
    if (activeFilter === 'top') return score >= 350;
    if (activeFilter === 'rank1') return score >= 500;
    return true;
  });

  return (
    <section
      id="results"
      style={{
        paddingTop: 'clamp(54px, 8vw, 84px)',
        paddingBottom: 'clamp(54px, 8vw, 84px)'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Trophy size={13} />
            <span>NEET UG {examYear} Results</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.1rem, 4.8vw, 3.2rem)',
              fontWeight: '900',
              lineHeight: '1.1',
              letterSpacing: '-0.035em',
              marginBottom: '12px',
              color: 'var(--text-heading)'
            }}
          >
            Outstanding Achievers Wall of Fame
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-sub)' }}>
            Consistent practice, rigorous error analysis, and dedicated mentorship. Celebrating our
            students who cracked NEET-UG.
          </p>
        </div>

        {/* 100% Qualification Apple Hero Award Banner (Light Theme) */}
        <div
          className="bento-card-gold"
          style={{
            padding: 'clamp(22px, 4.5vw, 34px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '40px',
            borderRadius: '26px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #fef08a 0%, #fbbf24 40%, #f59e0b 80%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)',
                flexShrink: 0,
                border: '2px solid #ffffff'
              }}
            >
              <Trophy size={28} color="#0f172a" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3.4vw, 1.75rem)',
                  fontWeight: '900',
                  color: '#78350f',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.15'
                }}
              >
                16 / 16 ALL STUDENTS QUALIFIED
              </div>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#92400e',
                  marginTop: '2px',
                  fontWeight: '700'
                }}
              >
                100% Qualification Success Rate in NEET UG {examYear}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenCallModal?.()}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.94rem' }}
          >
            <span>Join Next Toppers Batch</span>
            <Sparkles size={16} />
          </button>
        </div>

        {/* Subject-Wise Toppers Bento Grid */}
        <div style={{ marginBottom: '44px' }}>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-heading)',
              marginBottom: '18px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}
          >
            Subject-Wise Topper Highlights
          </h3>

          <div className="grid-responsive-3">
            {subjectToppersList.map((st) => (
              <SubjectTopperCard key={st?.subject || st?.name} topper={st} />
            ))}
          </div>
        </div>

        {/* Apple Segmented Control Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '22px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-glass)'
          }}
        >
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: '800',
              color: 'var(--text-heading)',
              letterSpacing: '-0.01em'
            }}
          >
            All Qualified Candidates ({filteredStudents.length})
          </h3>

          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0, 0, 0, 0.04)',
              padding: '4px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-glass)'
            }}
          >
            {[
              { id: 'all', label: 'All 16 Achievers' },
              { id: 'top', label: 'Scores 350+' },
              { id: 'rank1', label: 'Top Rank (552)' }
            ].map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    background: isSelected ? '#ffffff' : 'transparent',
                    color: isSelected ? '#b45309' : 'var(--text-sub)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? '800' : '600',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                    transition:
                      'background-color 150ms ease, color 150ms ease, box-shadow 150ms ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid-responsive-4">
          {filteredStudents.map((student) => (
            <StudentResultCard key={student?.id || student?.name} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
}
