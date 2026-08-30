import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import coursesData from '../data/courses.json';

export default function CourseExplorer({ onOpenCallModal }) {
  const programsList = Array.isArray(coursesData?.programs) ? coursesData.programs : [];
  const initialSelectedId = programsList[0]?.id ?? 'neet-repeater';

  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const activeCourse = programsList.find((p) => p?.id === selectedId) || programsList[0] || {};
  const highlightsList = Array.isArray(activeCourse?.highlights) ? activeCourse.highlights : [];

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
              {coursesData?.sectionTitle ?? 'Excellence Programs Tailored for Medical Entrance'}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              {coursesData?.sectionSubtitle ??
                'From foundation building in 5th grade to intensive repeater batches.'}
            </p>
          </div>

          {/* Apple Segmented Tab Switcher */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '30px'
            }}
          >
            {programsList.map((program, idx) => {
              const programId = program?.id ?? `prog-${idx}`;
              const isSelected = programId === selectedId;
              return (
                <button
                  key={programId}
                  onClick={() => setSelectedId(programId)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-pill)',
                    border: isSelected
                      ? '1px solid rgba(217, 119, 6, 0.4)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    background: isSelected ? '#fffbeb' : '#ffffff',
                    color: isSelected ? '#b45309' : 'var(--text-sub)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    boxShadow: isSelected
                      ? '0 2px 10px rgba(217, 119, 6, 0.15)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px'
                  }}
                >
                  {program?.featured && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#d97706'
                      }}
                    />
                  )}
                  <span>{program?.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Course Bento Card */}
          <div
            className="bento-card"
            style={{
              padding: 'clamp(22px, 4.5vw, 36px)',
              borderRadius: '24px'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '22px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  borderBottom: '1px solid var(--border-glass)',
                  paddingBottom: '16px'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px'
                    }}
                  >
                    <span className="badge-gold">{activeCourse?.badge}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      • {activeCourse?.target}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
                      fontWeight: '900',
                      color: 'var(--text-heading)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {activeCourse?.name}
                  </h3>
                </div>

                <button
                  onClick={() => onOpenCallModal?.()}
                  className="btn-primary"
                  style={{ padding: '11px 22px', fontSize: '0.9rem' }}
                >
                  <span>{activeCourse?.ctaText ?? 'Enquire for Batch'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                {activeCourse?.description}
              </p>

              {/* Highlights Grid */}
              <div>
                <h4
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    color: 'var(--text-heading)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '14px'
                  }}
                >
                  Key Program Highlights &amp; Inclusions:
                </h4>

                <div className="grid-responsive-2">
                  {highlightsList.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        background: '#f8fafc',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <CheckCircle2
                        size={17}
                        color="#059669"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                      />
                      <span
                        style={{
                          fontSize: '0.86rem',
                          color: 'var(--text-title)',
                          lineHeight: '1.5'
                        }}
                      >
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Footer */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-glass)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-sub)' }}>Subjects Covered:</strong>{' '}
                  {Array.isArray(activeCourse?.subjects)
                    ? activeCourse.subjects.join(', ')
                    : 'Physics, Chemistry, Biology'}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-sub)' }}>Eligibility:</strong>{' '}
                  {activeCourse?.eligibility ?? '10th / 11th / 12th Pass Aspirants'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
