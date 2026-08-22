import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import siteConfig from '../data/site-config.json';

describe('Header Component', () => {
  it('renders brand name and logo image', () => {
    render(<Header onOpenCallModal={vi.fn()} />);
    expect(screen.getAllByText(siteConfig.brand.name)[0]).toBeInTheDocument();
    expect(screen.getByAltText(/SCIMEE/i)).toBeInTheDocument();
  });

  it('renders all desktop navigation links', () => {
    render(<Header onOpenCallModal={vi.fn()} />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Syllabus')).toBeInTheDocument();
    expect(screen.getByText('Facilities')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when Call Helpline CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<Header onOpenCallModal={handleOpenModal} />);
    const callButtons = screen.getAllByRole('button', { name: /Call/i });
    await userEvent.click(callButtons[0]);
    expect(handleOpenModal).toHaveBeenCalled();
  });

  it('toggles mobile drawer when hamburger button is clicked', async () => {
    render(<Header onOpenCallModal={vi.fn()} />);
    const toggleBtn = screen.getByLabelText('Toggle menu');
    await userEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });
});
