import React from 'react';
import { PhoneCall, Award, BookOpen, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default function Hero({ onOpenCallModal }) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '48px',
      paddingBottom: '64px',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Glow Backdrops */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 80%)',
        filter: 'blur(70px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Urdu Tagline Banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)',
            border: '1px solid var(--border-gold)',
            padding: '8px 20px',
            borderRadius: '9999px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.15)'
          }}>
            <span className="urdu-font" style={{
              fontSize: '1.25rem',
              color: '#fef08a',
              fontWeight: '700',
              lineHeight: '1.4'
            }}>
              {siteConfig.brand.taglineUrdu}
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
            <span style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold-light)'
            }}>
              Bhusawal&apos;s Premier Medical Coaching
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 5vw, 3.8rem)',
            fontWeight: '900',
            lineHeight: '1.12',
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Crack NEET-UG with Proven Mastery at{' '}
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              SCIMEE
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.22rem)',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            margin: '0 auto 28px',
            lineHeight: '1.6'
          }}>
            Under the guidance of <strong>{siteConfig.brand.founder}</strong>, we transform medical aspirants into doctors through conceptual teaching, weekly OMR simulations, and dedicated library study facilities.
          </p>

          {/* Call to Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '42px'
          }}>
            <button
              onClick={onOpenCallModal}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1.02rem',
                minWidth: '220px'
              }}
            >
              <PhoneCall size={20} />
              <span>Direct Call Helpline</span>
            </button>

            <a
              href="#results"
              className="btn-secondary"
              style={{
                padding: '14px 26px',
                fontSize: '1rem'
              }}
            >
              <Trophy size={18} color="var(--accent-gold)" />
              <span>View 2026 Achievers</span>
            </a>

            <a
              href="#syllabus"
              className="btn-secondary"
              style={{
                padding: '14px 24px',
                fontSize: '0.96rem'
              }}
            >
              <BookOpen size={18} color="var(--accent-blue)" />
              <span>NEET 2026 Syllabus</span>
            </a>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid-responsive-4" style={{ textAlign: 'left' }}>
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="glass-panel"
                style={{
                  padding: '18px',
                  border: idx === 1 ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  background: idx === 1 ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)' : 'var(--bg-card)'
                }}
              >
                <div style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                  fontWeight: '900',
                  color: idx === 1 ? 'var(--accent-gold-light)' : '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '2px'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.3'
                }}>
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
