import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ToppersSection from './ToppersSection';
import toppersData from '../data/toppers.json';

describe('ToppersSection Component', () => {
  it('renders NEET toppers and exam year badge', () => {
    render(<ToppersSection onOpenCallModal={vi.fn()} />);
    expect(
      screen.getAllByText(new RegExp(`NEET UG ${toppersData.year}`, 'i'))[0]
    ).toBeInTheDocument();

    const topStudent = toppersData.students[0];
    expect(screen.getByText(topStudent.name)).toBeInTheDocument();
    expect(screen.getByText(String(topStudent.score))).toBeInTheDocument();
  });

  it('filters students when filter buttons are toggled', () => {
    render(<ToppersSection onOpenCallModal={vi.fn()} />);

    // Initially shows All 16 Achievers
    expect(screen.getByText(/All Qualified Candidates \(16\)/i)).toBeInTheDocument();

    // Switch to Scores 350+ (6 students: 552, 399, 394, 371, 358, 350)
    const topScorersBtn = screen.getByRole('button', { name: /Scores 350\+/i });
    fireEvent.click(topScorersBtn);
    expect(screen.getByText(/All Qualified Candidates \(6\)/i)).toBeInTheDocument();

    // Switch to Top Rank (1 student: 552)
    const topRankBtn = screen.getByRole('button', { name: /Top Rank/i });
    fireEvent.click(topRankBtn);
    expect(screen.getByText(/All Qualified Candidates \(1\)/i)).toBeInTheDocument();

    // Switch back to All 16 Achievers
    const allBtn = screen.getByRole('button', { name: /All 16 Achievers/i });
    fireEvent.click(allBtn);
    expect(screen.getByText(/All Qualified Candidates \(16\)/i)).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when Join Next Toppers Batch CTA is clicked', () => {
    const handleOpenModal = vi.fn();
    render(<ToppersSection onOpenCallModal={handleOpenModal} />);
    const callBtn = screen.getByRole('button', { name: /Join Next Toppers Batch/i });
    fireEvent.click(callBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
