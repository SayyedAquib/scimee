import React from 'react';
import { BookOpen, GraduationCap, ClipboardCheck, UserCheck, Users, ShieldCheck, ArrowRight, Shield, Award } from 'lucide-react';
import facilitiesData from '../data/facilities.json';

export default function FacilitiesSection({ onOpenCallModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen size={22} color="#fbbf24" />;
      case 'graduation-cap':
        return <GraduationCap size={22} color="#38bdf8" />;
      case 'clipboard-check':
        return <ClipboardCheck size={22} color="#34d399" />;
      case 'user-check':
        return <UserCheck size={22} color="#c084fc" />;
      case 'users':
        return <Users size={22} color="#fbbf24" />;
      case 'shield-check':
        return <ShieldCheck size={22} color="#34d399" />;
      default:
        return <Award size={22} color="#fbbf24" />;
    }
  };

  const facilitiesList = facilitiesData.items || facilitiesData.features || [];

  return (
    <section id="facilities" style={{
      paddingTop: 'clamp(48px, 8vw, 76px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      background: 'var(--apple-bg-base)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 34px' }}>
          <div className="badge-emerald" style={{ marginBottom: '10px' }}>
            <Shield size={13} />
            <span>Infrastructure &amp; Pedagogy</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: '900',
            lineHeight: '1.14',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            {facilitiesData.sectionTitle || facilitiesData.title}
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
            {facilitiesData.sectionSubtitle || facilitiesData.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid (Apple Bento Grid) */}
        <div className="grid-responsive-2" style={{ marginBottom: '36px' }}>
          {facilitiesList.map((feat) => (
            <div
              key={feat.id}
              className="apple-glass"
              style={{
                padding: '24px',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {getIcon(feat.icon)}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.01em' }}>
                    {feat.title}
                  </h3>
                  {feat.tag && (
                    <span className="badge-gold" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                      {feat.tag}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Library & Reading Room Highlight Callout */}
        <div className="apple-glass-gold" style={{
          padding: 'clamp(20px, 4vw, 32px)',
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
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)', fontWeight: '900', color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              Dedicated Quiet Reading Room &amp; Medical Reference Library
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#fef08a', lineHeight: '1.55' }}>
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
    </section>
  );
}
