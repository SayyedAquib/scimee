import React from 'react';
import { BookOpen, GraduationCap, ClipboardCheck, UserCheck, Users, ShieldCheck, ArrowRight, Shield, Award } from 'lucide-react';
import facilitiesData from '../data/facilities.json';

export default function FacilitiesSection({ onOpenCallModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen size={24} color="#f59e0b" />;
      case 'graduation-cap':
        return <GraduationCap size={24} color="#38bdf8" />;
      case 'clipboard-check':
        return <ClipboardCheck size={24} color="#34d399" />;
      case 'user-check':
        return <UserCheck size={24} color="#c084fc" />;
      case 'users':
        return <Users size={24} color="#fbbf24" />;
      case 'shield-check':
        return <ShieldCheck size={24} color="#34d399" />;
      default:
        return <Award size={24} color="#fbbf24" />;
    }
  };

  const facilitiesList = facilitiesData.items || facilitiesData.features || [];

  return (
    <section id="facilities" style={{
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div className="badge-emerald" style={{ marginBottom: '10px' }}>
            <Shield size={14} />
            <span>Infrastructure &amp; Pedagogy</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            {facilitiesData.sectionTitle || facilitiesData.title}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {facilitiesData.sectionSubtitle || facilitiesData.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-responsive-2" style={{ marginBottom: '40px' }}>
          {facilitiesList.map((feat) => (
            <div
              key={feat.id}
              className="glass-panel"
              style={{
                padding: '28px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                gap: '20px'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#fff' }}>
                    {feat.title}
                  </h3>
                  {feat.tag && (
                    <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      {feat.tag}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Library & Reading Room Highlight Callout */}
        <div className="glass-panel-gold" style={{
          padding: 'clamp(20px, 4vw, 36px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ maxWidth: '680px' }}>
            <span className="badge-gold" style={{ marginBottom: '8px' }}>
              Special Campus Facility
            </span>
            <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
              Dedicated Quiet Reading Room &amp; Medical Entrance Reference Library
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-gold)', lineHeight: '1.6' }}>
              Distraction-free environment with individual study desks, NCERT line-by-line problem sets, and past 20-year NEET PYQ archives.
            </p>
          </div>

          <button
            onClick={onOpenCallModal}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          >
            <span>Book a Campus Visit</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
