import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MobileActionBar from './MobileActionBar';
import siteConfig from '../data/site-config.json';

describe('MobileActionBar Component (Sticky Mobile Footer Bar)', () => {
  it('renders all three mobile quick-action buttons (Call, WhatsApp, Syllabus)', () => {
    render(<MobileActionBar onOpenCallModal={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Call Now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Syllabus/i })).toBeInTheDocument();
  });

  it('triggers onOpenCallModal callback when Call Now button is tapped', async () => {
    const handleOpenModal = vi.fn();
    render(<MobileActionBar onOpenCallModal={handleOpenModal} />);

    const callBtn = screen.getByRole('button', { name: /Call Now/i });
    await userEvent.click(callBtn);

    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  it('links to WhatsApp with valid phone number and prefilled Islamic greeting', () => {
    render(<MobileActionBar onOpenCallModal={vi.fn()} />);

    const whatsappLink = screen.getByRole('link', { name: /WhatsApp/i });
    const href = whatsappLink.getAttribute('href');

    expect(href).toContain('wa.me');
    expect(href).toContain(siteConfig.contact.primaryPhone);
    expect(href).toContain('As-salamu');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
  });

  it('links to #syllabus section anchor for smooth scrolling', () => {
    render(<MobileActionBar onOpenCallModal={vi.fn()} />);

    const syllabusLink = screen.getByRole('link', { name: /Syllabus/i });
    expect(syllabusLink).toHaveAttribute('href', '#syllabus');
  });
});
