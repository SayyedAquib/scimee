import React from 'react';
import { PhoneCall, Trophy, BookOpen, Sparkles } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Hero({ onOpenCallModal }) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: 'clamp(36px, 6vw, 64px)',
      paddingBottom: 'clamp(48px, 8vw, 80px)',
      overflow: 'hidden'
    }}>
      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Apple Ornate Urdu Tagline Pill (Light Theme) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: '#fffbeb',
            border: '1px solid rgba(217, 119, 6, 0.28)',
            padding: '8px 22px',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '24px',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.12)'
          }}>
            <span className="urdu-font" style={{
              fontSize: '1.35rem',
              color: '#92400e',
              fontWeight: '700',
              lineHeight: '1.2'
            }}>
              {siteConfig.brand.taglineUrdu}
            </span>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--apple-gold)' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#b45309'
            }}>
              Bhusawal Medical Entrance
            </span>
          </div>

          {/* Luminous Apple Keynote Display Title (Deep Charcoal / Black) */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: '900',
            lineHeight: '1.06',
            letterSpacing: '-0.04em',
            marginBottom: '20px',
            color: 'var(--text-heading)'
          }}>
            Crack NEET-UG with Proven Mastery at{' '}
            <span style={{
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 60%, #92400e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              SCIMEE
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            color: 'var(--text-sub)',
            maxWidth: '780px',
            margin: '0 auto 36px',
            lineHeight: '1.6',
            letterSpacing: '-0.01em'
          }}>
            Under the mentorship of <strong style={{ color: 'var(--text-heading)' }}>{siteConfig.brand.founder}</strong>, we prepare medical aspirants through conceptual clarity, weekly OMR examination drills, and dedicated on-campus reading room facilities.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                minWidth: '220px'
              }}
            >
              <PhoneCall size={18} />
              <span>Direct Call Helpline</span>
            </button>

            <a
              href="#results"
              className="btn-secondary"
              style={{
                padding: '14px 24px',
                fontSize: '0.96rem'
              }}
            >
              <Trophy size={17} color="#d97706" />
              <span>100% NEET 2026 Results</span>
            </a>

            <a
              href="#syllabus"
              className="btn-secondary"
              style={{
                padding: '14px 22px',
                fontSize: '0.94rem'
              }}
            >
              <BookOpen size={17} color="#0284c7" />
              <span>NMC 2026 Syllabus</span>
            </a>
          </div>

          {/* Apple Bento Metric Cards (4 Columns) */}
          <div className="grid-responsive-4" style={{ textAlign: 'left' }}>
            {siteConfig.stats.map((stat, idx) => {
              const isGold = idx === 1;
              return (
                <div
                  key={stat.id}
                  className={isGold ? 'bento-card-gold' : 'bento-card'}
                  style={{
                    padding: '22px 18px',
                    borderRadius: '22px'
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
                    fontWeight: '900',
                    color: isGold ? '#92400e' : 'var(--text-heading)',
                    letterSpacing: '-0.04em',
                    lineHeight: '1',
                    marginBottom: '6px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    color: isGold ? '#78350f' : 'var(--text-title)',
                    marginBottom: '3px',
                    letterSpacing: '-0.01em'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    color: isGold ? '#92400e' : 'var(--text-muted)',
                    lineHeight: '1.3'
                  }}>
                    {stat.subtext}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
