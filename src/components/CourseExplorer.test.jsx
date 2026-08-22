import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CourseExplorer from './CourseExplorer';
import coursesData from '../data/courses.json';

describe('CourseExplorer Component', () => {
  it('renders all program category tabs including Post-NEET Counseling', () => {
    render(<CourseExplorer onOpenCallModal={vi.fn()} />);
    coursesData.programs.forEach((program) => {
      expect(screen.getAllByRole('button', { name: program.name })[0]).toBeInTheDocument();
    });
  });

  it('switches displayed course details when another tab is clicked', async () => {
    render(<CourseExplorer onOpenCallModal={vi.fn()} />);
    const secondProgram = coursesData.programs[1];
    const secondTab = screen.getAllByRole('button', { name: secondProgram.name })[0];

    await userEvent.click(secondTab);
    expect(screen.getAllByText(secondProgram.badge)[0]).toBeInTheDocument();
    expect(screen.getByText(new RegExp(secondProgram.target, 'i'))).toBeInTheDocument();
  });

  it('switches to Post-NEET Admission Counseling tab and shows 1-on-1 highlights', async () => {
    render(<CourseExplorer onOpenCallModal={vi.fn()} />);
    const counselingTab = screen.getAllByRole('button', {
      name: /Post-NEET Admission & Choice-Filling Counseling/i
    })[0];

    await userEvent.click(counselingTab);
    expect(screen.getByText(/NEET Qualified Aspirants & Parents/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive Score & Rank evaluation for AIQ \(15%\)/i)
    ).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when Course CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<CourseExplorer onOpenCallModal={handleOpenModal} />);
    const ctaBtn = screen.getByRole('button', { name: coursesData.programs[0].ctaText });
    await userEvent.click(ctaBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
