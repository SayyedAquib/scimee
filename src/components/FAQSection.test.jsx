import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FAQSection from './FAQSection';
import faqData from '../data/faq.json';

describe('FAQSection Component', () => {
  const faqList = faqData.faqs || faqData.items || [];

  it('renders all FAQ questions', () => {
    render(<FAQSection onOpenCallModal={vi.fn()} />);
    faqList.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('toggles question answer visibility when accordion item is clicked', async () => {
    render(<FAQSection onOpenCallModal={vi.fn()} />);
    const secondQuestionBtn = screen.getByText(faqList[1].question);

    await userEvent.click(secondQuestionBtn);
    expect(screen.getByText(faqList[1].answer)).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when Counselor Helpline CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<FAQSection onOpenCallModal={handleOpenModal} />);
    const helplineBtn = screen.getByRole('button', { name: /Speak with Admissions Counselor/i });
    await userEvent.click(helplineBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
