import React from 'react';
import { BookOpen, GraduationCap, ClipboardCheck, UserCheck, Users, ShieldCheck, ArrowRight, Shield, Award } from 'lucide-react';
import facilitiesData from '../data/facilities.json';

export default function FacilitiesSection({ onOpenCallModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen size={22} color="#d97706" />;
      case 'graduation-cap':
        return <GraduationCap size={22} color="#0284c7" />;
      case 'clipboard-check':
        return <ClipboardCheck size={22} color="#059669" />;
      case 'user-check':
        return <UserCheck size={22} color="#9333ea" />;
      case 'users':
        return <Users size={22} color="#d97706" />;
      case 'shield-check':
        return <ShieldCheck size={22} color="#059669" />;
      default:
        return <Award size={22} color="#d97706" />;
    }
  };

  const facilitiesList = facilitiesData.items || facilitiesData.features || [];

  return (
    <section id="facilities" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px' }}>
            <div className="badge-emerald" style={{ marginBottom: '10px' }}>
              <Shield size={13} />
              <span>Infrastructure &amp; Pedagogy</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: 'var(--text-heading)'
            }}>
              {facilitiesData.sectionTitle || facilitiesData.title}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              {facilitiesData.sectionSubtitle || facilitiesData.subtitle}
            </p>
          </div>

          {/* Feature Cards Grid (Apple Bento Grid) */}
          <div className="grid-responsive-2" style={{ marginBottom: '32px' }}>
            {facilitiesList.map((feat) => (
              <div
                key={feat.id}
                className="bento-card"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(0, 0, 0, 0.06)'
                }}>
                  {getIcon(feat.icon)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: '800', color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
                      {feat.title}
                    </h3>
                    {feat.tag && (
                      <span className="badge-gold" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {feat.tag}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Library & Reading Room Highlight Callout */}
          <div className="bento-card-gold" style={{
            padding: 'clamp(20px, 4vw, 30px)',
            borderRadius: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <span className="badge-gold" style={{ marginBottom: '6px' }}>
                Special Campus Facility
              </span>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)', fontWeight: '900', color: '#78350f', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                Dedicated Quiet Reading Room &amp; Medical Reference Library
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#92400e', lineHeight: '1.55', fontWeight: '500' }}>
                Distraction-free environment with individual study cubicles, NCERT line-by-line problem sets, and past 20-year NEET PYQ archives.
              </p>
            </div>

            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.92rem' }}
            >
              <span>Book a Campus Visit</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
