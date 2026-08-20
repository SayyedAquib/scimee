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
      paddingTop: '64px',
      paddingBottom: '72px',
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container-custom" style={{ maxWidth: '880px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: '#ffffff'
          }}>
            {faqData.sectionTitle || faqData.title}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {faqData.sectionSubtitle || faqData.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: isOpen ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    fontSize: '1.02rem',
                    fontWeight: '700',
                    color: isOpen ? 'var(--accent-gold-light)' : '#ffffff'
                  }}>
                    {item.question}
                  </span>
                  <div style={{
                    color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 22px 20px 22px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.94rem',
                    lineHeight: '1.7',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '14px'
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-subtle)'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '14px' }}>
            Have more questions regarding admissions, batch timings, or fee structure?
          </p>
          <button
            onClick={onOpenCallModal}
            className="btn-secondary"
            style={{ padding: '10px 22px', fontSize: '0.9rem' }}
          >
            <PhoneCall size={16} color="var(--accent-gold)" />
            <span>Speak with Admissions Counselor</span>
          </button>
        </div>

      </div>
    </section>
  );
}
