import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';
import siteConfig from '../data/site-config.json';

describe('Hero Component', () => {
  it('renders Urdu tagline badge and official founder name', () => {
    render(<Hero onOpenCallModal={vi.fn()} />);
    expect(screen.getByText(siteConfig.brand.taglineUrdu)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(siteConfig.brand.founder, 'i'))[0]).toBeInTheDocument();
  });

  it('triggers onOpenCallModal when primary CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<Hero onOpenCallModal={handleOpenModal} />);
    const ctaBtn = screen.getByRole('button', { name: /Direct Call Helpline/i });
    await userEvent.click(ctaBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  it('contains secondary CTA linking to syllabus section', () => {
    render(<Hero onOpenCallModal={vi.fn()} />);
    const syllabusLink = screen.getByRole('link', { name: /NMC 2026 Syllabus/i });
    expect(syllabusLink).toHaveAttribute('href', '#syllabus');
  });

  it('renders all 4 statistics counters and achievement badges', () => {
    render(<Hero onOpenCallModal={vi.fn()} />);
    siteConfig.stats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });
});
