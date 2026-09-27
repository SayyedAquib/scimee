import React from 'react';
import { PhoneCall, Trophy, BookOpen, Laptop, ExternalLink } from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import { getCbtUrl, openCbtPortal } from '@/utils/cbt';

export default function Hero({ onOpenCallModal }) {
  const taglineUrdu = siteConfig?.brand?.taglineUrdu ?? 'ہم جذبہِ تعمیر جہاں لے کے اٹھے ہیں';
  const founder = siteConfig?.brand?.founder ?? 'Ansari Rehan Ahmed';
  const statsList = Array.isArray(siteConfig?.stats) ? siteConfig.stats : [];

  return (
    <section id="about" className="hero-section">
      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content-wrap">
          {/* Header Badges Row */}
          <div className="hero-badges-row">
            {/* Apple Ornate Urdu Tagline Pill (Light Theme) */}
            <div className="hero-urdu-pill">
              <span className="urdu-font hero-urdu-text">{taglineUrdu}</span>
            </div>

            {/* Apple CBT Online Simulator Live Pill */}
            <a
              href={getCbtUrl('/tests')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e?.preventDefault?.();
                openCbtPortal('/tests', 'hero_top_pill');
              }}
              className="hero-cbt-pill"
              title="Launch SCIMEE NTA NEET CBT Online Test Simulator"
            >
              <span className="live-radar-dot" />
              <Laptop size={14} color="#059669" />
              <span className="hero-cbt-pill-label">NTA NEET CBT Simulator Live</span>
              <ExternalLink size={12} color="#047857" style={{ opacity: 0.8 }} />
            </a>
          </div>

          {/* Luminous Apple Keynote Display Title (Deep Charcoal / Black) */}
          <h1 className="hero-display-title">
            Crack NEET-UG with Proven Mastery at <span className="text-gradient-gold">SCIMEE</span>
          </h1>

          {/* Subheading */}
          <p className="hero-lead-text">
            Under the mentorship of{' '}
            <strong style={{ color: 'var(--text-heading)' }}>{founder}</strong>, we prepare medical
            aspirants through conceptual clarity, weekly OMR examination drills, and dedicated
            on-campus reading room facilities.
          </p>

          {/* CTA Buttons (Unified Symmetry) */}
          <div className="hero-cta-group" style={{ marginBottom: '48px' }}>
            <button onClick={() => onOpenCallModal?.()} className="btn-primary btn-lg">
              <PhoneCall size={17} style={{ flexShrink: 0 }} />
              <span>Direct Call Helpline</span>
            </button>

            <a href="#results" className="btn-secondary btn-lg">
              <Trophy size={17} color="#d97706" style={{ flexShrink: 0 }} />
              <span>100% NEET 2026 Results</span>
            </a>

            <a href="#syllabus" className="btn-secondary btn-lg">
              <BookOpen size={17} color="#0284c7" style={{ flexShrink: 0 }} />
              <span>NMC 2026 Syllabus</span>
            </a>
          </div>

          {/* Apple Bento Metric Cards (4 Columns) */}
          <div className="grid-responsive-4" style={{ textAlign: 'left' }}>
            {statsList.map((stat, idx) => {
              const isGold = idx === 1;
              return (
                <div
                  key={stat?.id ?? idx}
                  className={`hero-stats-card ${isGold ? 'bento-card-gold' : 'bento-card'}`}
                >
                  <div className={`hero-stat-value${isGold ? ' gold' : ''}`}>{stat?.value}</div>
                  <div className={`hero-stat-label${isGold ? ' gold' : ''}`}>{stat?.label}</div>
                  <div className={`hero-stat-subtext${isGold ? ' gold' : ''}`}>{stat?.subtext}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
