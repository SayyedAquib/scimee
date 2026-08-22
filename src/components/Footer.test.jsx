import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';
import siteConfig from '../data/site-config.json';

describe('Footer Component', () => {
  it('renders institute brand, founder, and Urdu motto', () => {
    render(<Footer onOpenCallModal={vi.fn()} />);
    expect(screen.getByText(siteConfig.brand.name)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.brand.taglineUrdu)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(siteConfig.brand.founder, 'i'))).toBeInTheDocument();
  });

  it('renders current year in copyright notice', () => {
    render(<Footer onOpenCallModal={vi.fn()} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(currentYear), 'i'))).toBeInTheDocument();
  });

  it('renders WhatsApp action button with valid link', () => {
    render(<Footer onOpenCallModal={vi.fn()} />);
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp Enquiry/i });
    expect(whatsappLink).toHaveAttribute('href');
    expect(whatsappLink.getAttribute('href')).toContain('wa.me');
  });
});
