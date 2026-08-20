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
    <section id="faq" style={{
      paddingTop: 'clamp(48px, 8vw, 76px)',
      paddingBottom: 'clamp(54px, 8vw, 84px)',
      background: 'var(--apple-bg-base)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom" style={{ maxWidth: '880px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '34px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <HelpCircle size={13} />
            <span>Got Questions?</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: '900',
            lineHeight: '1.14',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: '#ffffff'
          }}>
            {faqData.sectionTitle || faqData.title}
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
            {faqData.sectionSubtitle || faqData.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="apple-glass"
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid var(--border-gold-glow)' : '1px solid var(--border-subtle)',
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
                    fontSize: '0.98rem',
                    fontWeight: '700',
                    color: isOpen ? '#fef08a' : '#ffffff',
                    letterSpacing: '-0.01em'
                  }}>
                    {item.question}
                  </span>
                  <div style={{
                    color: isOpen ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 18px 20px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
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
          padding: '22px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-subtle)'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
            Have more questions regarding admissions, batch timings, or fee structure?
          </p>
          <button
            onClick={onOpenCallModal}
            className="btn-secondary"
            style={{ padding: '9px 20px', fontSize: '0.86rem' }}
          >
            <PhoneCall size={15} color="var(--accent-gold)" />
            <span>Speak with Admissions Counselor</span>
          </button>
        </div>

      </div>
    </section>
  );
}
