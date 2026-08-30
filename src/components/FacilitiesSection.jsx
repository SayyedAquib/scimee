import React from 'react';
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
  Users,
  ShieldCheck,
  ArrowRight,
  Shield,
  Award,
  Laptop,
  ExternalLink
} from 'lucide-react';
import facilitiesData from '../data/facilities.json';
import { getCbtUrl, openCbtPortal } from '../utils/cbt';

export default function FacilitiesSection({ onOpenCallModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'laptop':
        return <Laptop size={22} color="#059669" />;
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

  const facilitiesList = Array.isArray(facilitiesData?.items)
    ? facilitiesData.items
    : Array.isArray(facilitiesData?.features)
      ? facilitiesData.features
      : [];

  const sectionTitle =
    facilitiesData?.sectionTitle ?? facilitiesData?.title ?? 'State-of-the-Art Learning Ecosystem';
  const sectionSubtitle =
    facilitiesData?.sectionSubtitle ??
    facilitiesData?.subtitle ??
    'A distraction-free, results-driven atmosphere engineered for serious medical aspirants.';

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
              {sectionTitle}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>{sectionSubtitle}</p>
          </div>

          {/* Feature Cards Grid (Apple Bento Grid) */}
          <div className="grid-responsive-2" style={{ marginBottom: '32px' }}>
            {facilitiesList.map((feat, idx) => (
              <div
                key={feat?.id ?? idx}
                className="bento-card"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {getIcon(feat?.icon)}
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: '800',
                        color: 'var(--text-heading)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {feat?.title}
                    </h3>
                    {feat?.tag && (
                      <span
                        className="badge-gold"
                        style={{ fontSize: '0.62rem', padding: '1px 6px' }}
                      >
                        {feat.tag}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                    {feat?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CBT Online Test Simulator & Reading Room Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '18px'
            }}
          >
            {/* CBT Simulator Highlight Callout */}
            <div
              className="bento-card-emerald"
              style={{
                padding: 'clamp(20px, 3.5vw, 28px)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(5, 150, 105, 0.12)',
                      border: '1px solid rgba(5, 150, 105, 0.3)',
                      color: '#065f46',
                      fontWeight: '800',
                      fontSize: '0.72rem',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Laptop size={12} />
                    <span>NTA Exam Replica</span>
                  </span>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      color: '#047857',
                      background: '#ecfdf5',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    AI Analytics
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: '900',
                    color: '#065f46',
                    letterSpacing: '-0.02em',
                    marginBottom: '6px'
                  }}
                >
                  SCIMEE NTA NEET CBT Online Portal
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#047857',
                    lineHeight: '1.55',
                    marginBottom: '16px'
                  }}
                >
                  Real-time exam screen, authentic 5-state question palette, negative marking
                  telemetry, subject wise timers, and 200,000+ chapterwise NEET-UG test bank.
                </p>
              </div>

              <a
                href={getCbtUrl('/tests')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e?.preventDefault?.();
                  openCbtPortal('/tests', 'facilities_cbt_card');
                }}
                className="btn-emerald"
                style={{
                  width: '100%',
                  padding: '11px 20px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <span>Launch CBT Online Simulator</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* Reading Room Highlight Callout */}
            <div
              className="bento-card-gold"
              style={{
                padding: 'clamp(20px, 3.5vw, 28px)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span
                  className="badge-gold"
                  style={{ marginBottom: '8px', display: 'inline-block' }}
                >
                  On-Campus Facility
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: '900',
                    color: '#78350f',
                    letterSpacing: '-0.02em',
                    marginBottom: '6px'
                  }}
                >
                  Dedicated Quiet Study &amp; Reading Room
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#92400e',
                    lineHeight: '1.55',
                    marginBottom: '16px'
                  }}
                >
                  Air-conditioned silent study space equipped with reference medical textbooks,
                  curated question banks, individual desks, and personal doubt resolution by Rehan
                  Sir.
                </p>
              </div>

              <button
                onClick={() => onOpenCallModal?.()}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '11px 20px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Book a Campus Visit</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
