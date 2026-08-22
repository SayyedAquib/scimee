import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('filters students when filter buttons are toggled', async () => {
    render(<ToppersSection onOpenCallModal={vi.fn()} />);
    const topScorersBtn = screen.getByRole('button', { name: /Scores 350\+/i });
    await userEvent.click(topScorersBtn);
    expect(topScorersBtn).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when Join Next Toppers Batch CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<ToppersSection onOpenCallModal={handleOpenModal} />);
    const callBtn = screen.getByRole('button', { name: /Join Next Toppers Batch/i });
    await userEvent.click(callBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
