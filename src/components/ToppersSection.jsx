import React, { useState } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, User, Dna, Atom, FlaskConical, Star } from 'lucide-react';
import toppersData from '../data/toppers.json';

export default function ToppersSection({ onOpenCallModal }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStudents = toppersData.students.filter((student) => {
    if (activeFilter === 'top') return student.score >= 350;
    if (activeFilter === 'rank1') return student.score >= 500;
    return true;
  });

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'dna':
        return <Dna size={26} color="#34d399" />;
      case 'atom':
        return <Atom size={26} color="#38bdf8" />;
      case 'flask-conical':
        return <FlaskConical size={26} color="#c084fc" />;
      default:
        return <Award size={26} color="#fbbf24" />;
    }
  };

  return (
    <section id="results" style={{
      paddingTop: 'clamp(54px, 8vw, 84px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Trophy size={13} />
            <span>NEET UG {toppersData.year} Results</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4.8vw, 3.2rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            letterSpacing: '-0.035em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            Outstanding Achievers Wall of Fame
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-sub)' }}>
            Consistent practice, rigorous error analysis, and dedicated mentorship. Celebrating our students who cracked NEET-UG.
          </p>
        </div>

        {/* 100% Qualification Apple Hero Award Banner */}
        <div className="bento-card-gold" style={{
          padding: 'clamp(22px, 4.5vw, 34px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '40px',
          borderRadius: '26px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 40%, #f59e0b 80%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(245, 158, 11, 0.45)',
              flexShrink: 0,
              border: '2px solid rgba(255, 255, 255, 0.4)'
            }}>
              <Trophy size={28} color="#030712" />
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(1.25rem, 3.4vw, 1.75rem)',
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: '1.15'
              }}>
                16 / 16 ALL STUDENTS QUALIFIED
              </div>
              <p style={{ fontSize: '0.9rem', color: '#fef08a', marginTop: '2px', fontWeight: '600' }}>
                100% Qualification Success Rate in NEET UG {toppersData.year}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCallModal}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.94rem' }}
          >
            <span>Join Next Toppers Batch</span>
            <Sparkles size={16} />
          </button>
        </div>

        {/* Subject-Wise Toppers Bento Grid */}
        <div style={{ marginBottom: '44px' }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '18px',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Subject-Wise Topper Highlights
          </h3>

          <div className="grid-responsive-3">
            {toppersData.subjectToppers.map((st) => {
              const isBio = st.subject === 'Biology';
              return (
                <div
                  key={st.subject}
                  className="bento-card"
                  style={{
                    padding: '24px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderTop: isBio ? '1px solid rgba(52, 211, 153, 0.55)' : '1px solid var(--border-specular-top)'
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {getSubjectIcon(st.icon)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {st.subject} Topper
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '1.9rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                        {st.score}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                        /{st.total}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                      {st.tagline}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Apple Segmented Control Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '22px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-glass)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.01em' }}>
            All Qualified Candidates ({filteredStudents.length})
          </h3>

          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-glass)'
          }}>
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
                    background: isSelected ? 'rgba(245, 158, 11, 0.28)' : 'transparent',
                    color: isSelected ? '#fef08a' : 'var(--text-sub)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? '800' : '600',
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
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
          {filteredStudents.map((student) => {
            const isRank1 = student.score >= 500;

            return (
              <div
                key={student.id}
                className={isRank1 ? 'bento-card-gold' : 'bento-card'}
                style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  borderRadius: '20px'
                }}
              >
                {/* Top Rank Pill */}
                {isRank1 && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #fef08a 0%, #f59e0b 100%)',
                    color: '#030712',
                    fontSize: '0.64rem',
                    fontWeight: '900',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-pill)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 10px rgba(245, 158, 11, 0.45)'
                  }}>
                    Top Scorer
                  </div>
                )}

                {/* Avatar Ring */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  margin: '0 auto 10px',
                  background: isRank1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isRank1 ? '1.5px solid var(--apple-gold)' : '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <User size={24} color={isRank1 ? '#fef08a' : 'var(--text-sub)'} />
                </div>

                {/* Name */}
                <h4 style={{
                  fontSize: '0.98rem',
                  fontWeight: '800',
                  color: '#ffffff',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  letterSpacing: '-0.01em'
                }}>
                  {student.name}
                </h4>

                {/* Score */}
                <div style={{
                  fontSize: 'clamp(1.7rem, 3.4vw, 2.1rem)',
                  fontWeight: '900',
                  color: isRank1 ? '#fef08a' : '#f87171',
                  lineHeight: '1.05',
                  marginBottom: '6px',
                  letterSpacing: '-0.03em'
                }}>
                  {student.score}
                </div>

                {/* Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  color: 'var(--text-sub)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  <CheckCircle2 size={11} color="#34d399" />
                  <span>{student.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
