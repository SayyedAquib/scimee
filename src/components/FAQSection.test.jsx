import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FAQSection from './FAQSection';
import faqData from '../data/faq.json';

describe('FAQSection Component', () => {
  const faqList = faqData.faqs || faqData.items || [];

  it('renders all FAQ questions and initial open question 1', () => {
    render(<FAQSection onOpenCallModal={vi.fn()} />);
    faqList.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
    // First question is open by default
    expect(screen.getByText(faqList[0].answer)).toBeInTheDocument();
  });

  it('toggles question answer visibility when accordion item is clicked', async () => {
    render(<FAQSection onOpenCallModal={vi.fn()} />);

    // Click first question to collapse it
    const firstQuestionBtn = screen.getByText(faqList[0].question);
    await userEvent.click(firstQuestionBtn);
    expect(screen.queryByText(faqList[0].answer)).not.toBeInTheDocument();

    // Click second question to expand it
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
