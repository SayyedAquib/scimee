import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CbtShowcaseSection from './CbtShowcaseSection';
import * as cbtUtils from '../utils/cbt';

describe('CbtShowcaseSection Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders section title, badge, and metrics correctly', () => {
    render(<CbtShowcaseSection />);
    expect(
      screen.getByRole('heading', { name: /Official NTA NEET Computer-Based Test/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Digital Assessment Platform')).toBeInTheDocument();
    expect(screen.getByText('200,000+')).toBeInTheDocument();
    expect(screen.getByText('Official NTA Palette')).toBeInTheDocument();
  });

  it('renders authentic 5-state question palette items', () => {
    render(<CbtShowcaseSection />);
    expect(screen.getByText('Not Visited')).toBeInTheDocument();
    expect(screen.getByText('Not Answered')).toBeInTheDocument();
    expect(screen.getByText('Answered')).toBeInTheDocument();
    expect(screen.getByText('Marked for Review')).toBeInTheDocument();
    expect(screen.getByText(/Answered & Review/i)).toBeInTheDocument();
  });

  it('renders all 4 CBT feature cards and key bullet points', () => {
    render(<CbtShowcaseSection />);
    expect(screen.getByText(/200,000\+ Multi-Format Question Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Live AI Proctoring & Timed Test Hall/i)).toBeInTheDocument();
    expect(screen.getByText(/Instant Diagnostic Scorecard & Analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/NCERT Fingertips & Standard Textbook MCQs/i)).toBeInTheDocument();
  });

  it('triggers openCbtPortal when Start Free Mock Exam CTA is clicked', async () => {
    const openSpy = vi.spyOn(cbtUtils, 'openCbtPortal').mockImplementation(() => {});
    render(<CbtShowcaseSection />);

    const startBtn = screen.getByRole('link', { name: /Start Free Mock Exam/i });
    await userEvent.click(startBtn);

    expect(openSpy).toHaveBeenCalledWith(cbtUtils.CBT_ROUTES.TESTS, 'cbt_showcase_action_primary');
  });
});
