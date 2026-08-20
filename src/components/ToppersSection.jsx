import React, { useState } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, User, Dna, Atom, FlaskConical } from 'lucide-react';
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
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'linear-gradient(180deg, #060913 0%, #0a0f24 50%, #060913 100%)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 36px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Trophy size={14} />
            <span>NEET UG {toppersData.year} Results</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            Outstanding Achievers Wall of Fame
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Consistent performance, rigorous practice, and unwavering dedication. Celebrating our remarkable students who qualified for medical entrance.
          </p>
        </div>

        {/* 100% Qualification Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(30, 27, 75, 0.8) 50%, rgba(15, 23, 42, 0.95) 100%)',
          border: '2px solid rgba(245, 158, 11, 0.5)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '36px',
          boxShadow: '0 12px 36px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
              flexShrink: 0
            }}>
              <Trophy size={28} color="#060913" />
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                fontWeight: '900',
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: '1.2'
              }}>
                16 / 16 ALL STUDENTS QUALIFIED
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-gold)', marginTop: '2px' }}>
                100% Qualification Rate in NEET UG {toppersData.year} Batch
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCallModal}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            <span>Join Next Toppers Batch</span>
            <Sparkles size={16} />
          </button>
        </div>

        {/* Subject-Wise Toppers Grid */}
        <div style={{ marginBottom: '42px' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Subject-Wise Topper Highlights
          </h3>

          <div className="grid-responsive-3">
            {toppersData.subjectToppers.map((st) => (
              <div
                key={st.subject}
                className="glass-panel"
                style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  border: st.subject === 'Biology' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                  background: st.subject === 'Biology' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)' : 'var(--bg-card)'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getSubjectIcon(st.icon)}
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {st.subject} Topper
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '1.9rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>
                      {st.score}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      /{st.total}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {st.tagline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>
            All Qualified Candidates ({filteredStudents.length})
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: activeFilter === 'all' ? 'var(--accent-gold)' : 'var(--border-subtle)',
                background: activeFilter === 'all' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                color: activeFilter === 'all' ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              All 16 Achievers
            </button>
            <button
              onClick={() => setActiveFilter('top')}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: activeFilter === 'top' ? 'var(--accent-gold)' : 'var(--border-subtle)',
                background: activeFilter === 'top' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                color: activeFilter === 'top' ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Scores 350+
            </button>
            <button
              onClick={() => setActiveFilter('rank1')}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: activeFilter === 'rank1' ? 'var(--accent-gold)' : 'var(--border-subtle)',
                background: activeFilter === 'rank1' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                color: activeFilter === 'rank1' ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Top Rank (552)
            </button>
          </div>
        </div>

        {/* Students Score Grid */}
        <div className="grid-responsive-4">
          {filteredStudents.map((student) => {
            const isRank1 = student.score >= 500;
            const isTopTier = student.score >= 370;

            return (
              <div
                key={student.id}
                className="glass-panel"
                style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  position: 'relative',
                  border: isRank1 
                    ? '2px solid rgba(245, 158, 11, 0.6)' 
                    : isTopTier 
                    ? '1px solid rgba(56, 189, 248, 0.35)' 
                    : '1px solid var(--border-subtle)',
                  background: isRank1 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                    : 'var(--bg-card)'
                }}
              >
                {/* Badge for Rank 1 */}
                {isRank1 && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#060913',
                    fontSize: '0.68rem',
                    fontWeight: '900',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)'
                  }}>
                    Top Scorer
                  </div>
                )}

                {/* Avatar Icon */}
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  margin: '0 auto 12px',
                  background: isRank1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isRank1 ? '2px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <User size={26} color={isRank1 ? 'var(--accent-gold-light)' : 'var(--text-secondary)'} />
                </div>

                {/* Student Name */}
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '800',
                  color: '#fff',
                  marginBottom: '6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {student.name}
                </h4>

                {/* Score */}
                <div style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.1rem)',
                  fontWeight: '900',
                  color: isRank1 ? '#fbbf24' : '#ef4444',
                  lineHeight: '1.1',
                  marginBottom: '6px'
                }}>
                  {student.score}
                </div>

                {/* Status Pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  <CheckCircle2 size={12} color="#34d399" />
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
