import React from 'react';
import {
  Laptop,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Clock,
  ShieldCheck,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import cbtData from '../data/cbt-features.json';
import { getCbtUrl, openCbtPortal, CBT_ROUTES } from '../utils/cbt';

export default function CbtShowcaseSection() {
  const getFeatureIcon = (id) => {
    switch (id) {
      case 'palette':
        return <Layers size={22} color="#059669" />;
      case 'question-bank':
        return <Cpu size={22} color="#0284c7" />;
      case 'proctoring':
        return <Clock size={22} color="#9333ea" />;
      case 'telemetry':
        return <BarChart3 size={22} color="#d97706" />;
      default:
        return <ShieldCheck size={22} color="#059669" />;
    }
  };

  const metricsList = Array.isArray(cbtData?.metrics) ? cbtData.metrics : [];
  const featuresList = Array.isArray(cbtData?.features) ? cbtData.features : [];

  const sectionBadge = cbtData?.sectionBadge ?? 'Digital Assessment Platform';
  const sectionTitle =
    cbtData?.sectionTitle ?? 'Official NTA NEET Computer-Based Test (CBT) Simulator';
  const sectionSubtitle =
    cbtData?.sectionSubtitle ??
    'Simulate actual test-day pressure with the official 5-state question palette, 200,000+ curated MCQs, timed auto-submit, and instantaneous performance telemetry.';

  return (
    <section id="cbt-portal" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container-custom">
        <div className="bento-section-canvas">
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px' }}>
            <div className="badge-emerald" style={{ marginBottom: '12px' }}>
              <Laptop size={13} />
              <span>{sectionBadge}</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: '900',
                lineHeight: '1.12',
                letterSpacing: '-0.03em',
                marginBottom: '12px',
                color: 'var(--text-heading)'
              }}
            >
              {sectionTitle}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
              {sectionSubtitle}
            </p>
          </div>

          {/* Quick Telemetry Metric Bento Badges (4 Columns) */}
          <div className="grid-responsive-4" style={{ marginBottom: '32px', textAlign: 'left' }}>
            {metricsList.map((metric, idx) => {
              const isEmerald = idx === 0 || idx === 1;
              return (
                <div
                  key={metric?.id ?? idx}
                  className={isEmerald ? 'bento-card-emerald' : 'bento-card'}
                  style={{
                    padding: '20px 18px',
                    borderRadius: '20px'
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                      fontWeight: '900',
                      color: isEmerald ? '#065f46' : 'var(--text-heading)',
                      letterSpacing: '-0.03em',
                      lineHeight: '1',
                      marginBottom: '6px'
                    }}
                  >
                    {metric?.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: '800',
                      color: isEmerald ? '#047857' : 'var(--text-title)',
                      marginBottom: '3px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {metric?.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: isEmerald ? '#065f46' : 'var(--text-muted)',
                      lineHeight: '1.3'
                    }}
                  >
                    {metric?.subtext}
                  </div>
                </div>
              );
            })}
          </div>

          {/* NTA 5-State Interactive Palette Showcase Banner */}
          <div
            className="bento-card"
            style={{
              padding: 'clamp(20px, 3.5vw, 28px)',
              borderRadius: '24px',
              marginBottom: '32px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.65) 100%)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                marginBottom: '16px'
              }}
            >
              <div>
                <span className="badge-emerald" style={{ marginBottom: '6px' }}>
                  Official NTA Scoring Compliance
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)',
                    fontWeight: '900',
                    color: 'var(--text-heading)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Authentic 5-State Question Palette Architecture
                </h3>
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#047857',
                  background: '#d1fae5',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)'
                }}
              >
                Exact Test-Day Simulation
              </span>
            </div>

            {/* 5-State Visual Palette Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    color: '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  1
                </div>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#1e293b', display: 'block' }}>
                    Not Visited
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Yet to attempt</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(225, 29, 72, 0.2)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#e11d48',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.82rem'
                  }}
                >
                  2
                </div>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#9f1239', display: 'block' }}>
                    Not Answered
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Visited, skipped</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(5, 150, 105, 0.2)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#059669',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.82rem'
                  }}
                >
                  3
                </div>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#065f46', display: 'block' }}>
                    Answered
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#047857' }}>+4 / -1 Evaluated</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(147, 51, 234, 0.2)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#9333ea',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.82rem'
                  }}
                >
                  4
                </div>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#6b21a8', display: 'block' }}>
                    Marked for Review
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Not evaluated</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(147, 51, 234, 0.35)',
                  boxShadow: '0 2px 8px rgba(147, 51, 234, 0.1)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#9333ea',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    position: 'relative'
                  }}
                >
                  5
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981',
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      border: '1px solid #ffffff'
                    }}
                  />
                </div>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#6b21a8', display: 'block' }}>
                    Answered &amp; Review
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#047857', fontWeight: '700' }}>
                    +4 / -1 Evaluated ✓
                  </span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#065f46', lineHeight: '1.5', margin: 0 }}>
              <strong>NTA Critical Rule:</strong> Questions marked{' '}
              <em>&apos;Answered &amp; Marked for Review&apos;</em> are automatically evaluated for
              your final 720-mark score, safeguarding your scores during high-pressure last-minute
              submissions.
            </p>
          </div>

          {/* 4 Feature Cards (Apple Bento Grid) */}
          <div className="grid-responsive-2" style={{ marginBottom: '32px' }}>
            {featuresList.map((feat, idx) => (
              <div
                key={feat?.id ?? idx}
                className="bento-card"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {getFeatureIcon(feat?.id)}
                    </div>
                    <span className="badge-emerald" style={{ fontSize: '0.66rem' }}>
                      {feat?.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      color: 'var(--text-heading)',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {feat?.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-sub)',
                      lineHeight: '1.55',
                      marginBottom: '14px'
                    }}
                  >
                    {feat?.description}
                  </p>

                  {/* Bullet Points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Array.isArray(feat?.bulletPoints) &&
                      feat.bulletPoints.map((bp, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.82rem',
                            color: 'var(--text-title)'
                          }}
                        >
                          <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} />
                          <span>{bp}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Launch & Action Callout Bar */}
          <div
            className="bento-card-emerald"
            style={{
              padding: 'clamp(22px, 4vw, 32px)',
              borderRadius: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <span className="badge-emerald" style={{ marginBottom: '8px' }}>
                <Laptop size={13} />
                <span>Immediate Aspirant Access</span>
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  fontWeight: '900',
                  color: '#065f46',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                Ready to Test Your NEET Preparation in the Real CBT Engine?
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#047857',
                  lineHeight: '1.55',
                  fontWeight: '500'
                }}
              >
                Launch an instant practice mock test or log in to your SCIMEE student account to
                review detailed question telemetry.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
              <a
                href={getCbtUrl(CBT_ROUTES?.TESTS ?? '/tests')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e?.preventDefault?.();
                  openCbtPortal(CBT_ROUTES?.TESTS ?? '/tests', 'cbt_showcase_action_primary');
                }}
                className="btn-whatsapp"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
                }}
              >
                <span>Start Free Mock Exam</span>
                <ExternalLink size={16} />
              </a>

              <a
                href={getCbtUrl(CBT_ROUTES?.LOGIN ?? '/login')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e?.preventDefault?.();
                  openCbtPortal(CBT_ROUTES?.LOGIN ?? '/login', 'cbt_showcase_action_login');
                }}
                className="btn-secondary"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid rgba(0, 0, 0, 0.12)'
                }}
              >
                <span>Student Login</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
