import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Users, ArrowRight, GraduationCap } from 'lucide-react';
import coursesData from '../data/courses.json';

export default function CourseExplorer({ onOpenCallModal }) {
  const [selectedId, setSelectedId] = useState(coursesData.programs[0].id);

  const activeCourse = coursesData.programs.find((p) => p.id === selectedId) || coursesData.programs[0];

  return (
    <section id="courses" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px' }}>
            <div className="badge-blue" style={{ marginBottom: '10px' }}>
              <GraduationCap size={13} />
              <span>Academic Programs</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: '#ffffff'
            }}>
              {coursesData.sectionTitle}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              {coursesData.sectionSubtitle}
            </p>
          </div>

          {/* Apple Segmented Tab Switcher */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            {coursesData.programs.map((program) => {
              const isSelected = program.id === selectedId;
              return (
                <button
                  key={program.id}
                  onClick={() => setSelectedId(program.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-pill)',
                    border: isSelected ? '1px solid var(--border-gold-specular)' : '1px solid var(--border-glass)',
                    borderTop: isSelected ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid var(--border-glass)',
                    background: isSelected ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#fef08a' : 'var(--text-sub)',
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
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--apple-gold)' }} />
                  )}
                  <span>{program.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Course Bento Card */}
          <div className="bento-card" style={{
            padding: 'clamp(22px, 4.5vw, 36px)',
            borderRadius: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '22px'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                borderBottom: '1px solid var(--border-glass)',
                paddingBottom: '16px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-gold">
                      {activeCourse.badge}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      • {activeCourse.target}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
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
                  style={{ padding: '11px 22px', fontSize: '0.9rem' }}
                >
                  <span>{activeCourse.ctaText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                {activeCourse.description}
              </p>

              {/* Highlights Grid */}
              <div>
                <h4 style={{ fontSize: '0.86rem', fontWeight: '800', color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--apple-emerald-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.86rem', color: 'var(--text-title)', lineHeight: '1.4' }}>
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
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-glass)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}>
                <div>
                  <strong style={{ color: 'var(--text-sub)' }}>Subjects Covered:</strong> {activeCourse.subjects.join(', ')}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-sub)' }}>Eligibility:</strong> {activeCourse.eligibility}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
