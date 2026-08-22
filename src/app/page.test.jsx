import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import HomePage from './page';

describe('HomePage Component (App Router Composition)', () => {
  it('renders all core landing page sections and interactive action bars', () => {
    render(<HomePage />);

    // Brand and Hero
    expect(screen.getAllByText(/SCIMEE/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Outstanding Achievers Wall of Fame/i)).toBeInTheDocument();

    // Key Section Headings
    expect(
      screen.getByText(/Targeted Programs for Medical & Engineering Aspirants/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Entrance Examination Syllabus Explorer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Why SCIMEE is the First Choice for Medical Aspirants/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Convenient Location in Bhusawal/i)).toBeInTheDocument();
  });

  it('opens and closes Admissions modal when triggered from page CTA', async () => {
    render(<HomePage />);

    // Initially modal is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click Hero CTA
    const heroBtn = screen.getByRole('button', { name: /Direct Call Helpline/i });
    await userEvent.click(heroBtn);

    // Modal dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByLabelText('Close dialog');
    await userEvent.click(closeBtn);

    // Modal dialog is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
