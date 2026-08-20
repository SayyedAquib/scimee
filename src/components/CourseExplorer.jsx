import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Users, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import coursesData from '../data/courses.json';

export default function CourseExplorer({ onOpenCallModal }) {
  const [selectedId, setSelectedId] = useState(coursesData.programs[0].id);

  const activeCourse = coursesData.programs.find((p) => p.id === selectedId) || coursesData.programs[0];

  return (
    <section id="courses" style={{
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div className="badge-blue" style={{ marginBottom: '10px' }}>
            <GraduationCap size={14} />
            <span>Academic Programs</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            {coursesData.sectionTitle}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {coursesData.sectionSubtitle}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
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
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? '800' : '600',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {program.featured && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
                )}
                <span>{program.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Course Detail Card */}
        <div className="glass-panel" style={{
          padding: 'clamp(20px, 4vw, 36px)',
          border: '1px solid var(--border-highlight)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(11, 18, 38, 0.95) 100%)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '28px'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="badge-gold">
                    {activeCourse.badge}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <span>{activeCourse.ctaText}</span>
                <ArrowRight size={17} />
              </button>
            </div>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {activeCourse.description}
            </p>

            {/* Highlights Grid */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Key Curriculum & Teaching Highlights
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px'
              }}>
                {activeCourse.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
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
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <div>
                <strong>Subjects Covered:</strong> {activeCourse.subjects.join(', ')}
              </div>
              <div>
                <strong>Eligibility:</strong> {activeCourse.eligibility}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
