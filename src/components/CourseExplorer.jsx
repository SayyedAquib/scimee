import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Users, ArrowRight, GraduationCap } from 'lucide-react';
import coursesData from '../data/courses.json';

export default function CourseExplorer({ onOpenCallModal }) {
  const [selectedId, setSelectedId] = useState(coursesData.programs[0].id);

  const activeCourse = coursesData.programs.find((p) => p.id === selectedId) || coursesData.programs[0];

  return (
    <section id="courses" style={{
      paddingTop: 'clamp(48px, 8vw, 76px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      background: 'var(--apple-bg-base)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 34px' }}>
          <div className="badge-blue" style={{ marginBottom: '10px' }}>
            <GraduationCap size={13} />
            <span>Academic Programs</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: '900',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            {coursesData.sectionTitle}
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
            {coursesData.sectionSubtitle}
          </p>
        </div>

        {/* Apple Segmented Tab Switcher */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {coursesData.programs.map((program) => {
            const isSelected = program.id === selectedId;
            return (
              <button
                key={program.id}
                onClick={() => setSelectedId(program.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--border-gold-glow)' : '1px solid var(--border-subtle)',
                  borderTop: isSelected ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? '800' : '600',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px'
                }}
              >
                {program.featured && (
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
                )}
                <span>{program.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Course Bento Card */}
        <div className="apple-glass" style={{
          padding: 'clamp(22px, 4.5vw, 38px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '18px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge-gold">
                    {activeCourse.badge}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
                    • {activeCourse.target}
                  </span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '900',
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}>
                  {activeCourse.name}
                </h3>
              </div>

              <button
                onClick={onOpenCallModal}
                className="btn-primary"
                style={{ padding: '11px 22px', fontSize: '0.92rem' }}
              >
                <span>{activeCourse.ctaText}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {activeCourse.description}
            </p>

            {/* Highlights Grid */}
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Key Curriculum &amp; Pedagogy
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '10px'
              }}>
                {activeCourse.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '9px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '11px 13px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <CheckCircle2 size={17} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Footer */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              paddingTop: '18px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
              color: 'var(--text-tertiary)'
            }}>
              <div>
                <strong style={{ color: 'var(--text-secondary)' }}>Subjects Covered:</strong> {activeCourse.subjects.join(', ')}
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary)' }}>Eligibility:</strong> {activeCourse.eligibility}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
