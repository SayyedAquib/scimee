import React from 'react';
import { Laptop, ExternalLink, ArrowRight } from 'lucide-react';
import cbtData from '../data/cbt-features.json';
import { getCbtUrl, openCbtPortal, CBT_ROUTES } from '../utils/cbt';
import CbtMetricsGrid from './cbt/CbtMetricsGrid';
import CbtPaletteBanner from './cbt/CbtPaletteBanner';
import CbtFeatureCard from './cbt/CbtFeatureCard';

export default function CbtShowcaseSection() {
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
          <CbtMetricsGrid metricsList={metricsList} />

          {/* NTA 5-State Interactive Palette Showcase Banner */}
          <CbtPaletteBanner />

          {/* 4 Feature Cards (Apple Bento Grid) */}
          <div className="grid-responsive-2" style={{ marginBottom: '32px' }}>
            {featuresList.map((feat) => (
              <CbtFeatureCard key={feat?.id || feat?.title} feat={feat} />
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
