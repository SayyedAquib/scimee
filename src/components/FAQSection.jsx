import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, PhoneCall } from 'lucide-react';
import faqData from '../data/faq.json';

export default function FAQSection({ onOpenCallModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqList = faqData.faqs || faqData.items || [];

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
      <div className="container-custom" style={{ maxWidth: '920px' }}>
        <div className="bento-section-canvas">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div className="badge-gold" style={{ marginBottom: '10px' }}>
              <HelpCircle size={13} />
              <span>Got Questions?</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.03em',
              marginBottom: '10px',
              color: '#ffffff'
            }}>
              {faqData.sectionTitle || faqData.title}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)' }}>
              {faqData.sectionSubtitle || faqData.subtitle}
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {faqList.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bento-card"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: isOpen ? '1px solid var(--border-gold-specular)' : '1px solid var(--border-glass)',
                    borderTop: isOpen ? '1px solid rgba(251, 191, 36, 0.45)' : '1px solid var(--border-specular-top)',
                    transition: 'border-color 150ms ease'
                  }}
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      background: isOpen ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
                      border: 'none',
                      color: '#fff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      fontSize: '0.96rem',
                      fontWeight: '700',
                      color: isOpen ? '#fef08a' : '#ffffff',
                      letterSpacing: '-0.01em'
                    }}>
                      {item.question}
                    </span>
                    <div style={{
                      color: isOpen ? 'var(--apple-gold)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 20px 18px 20px',
                      color: 'var(--text-sub)',
                      fontSize: '0.88rem',
                      lineHeight: '1.65',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '12px'
                    }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Callout */}
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '18px',
            border: '1px dashed var(--border-glass)'
          }}>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem', marginBottom: '12px' }}>
              Have more questions regarding admissions, batch timings, or fee structure?
            </p>
            <button
              onClick={onOpenCallModal}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.84rem' }}
            >
              <PhoneCall size={14} color="var(--apple-gold)" />
              <span>Speak with Admissions Counselor</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
