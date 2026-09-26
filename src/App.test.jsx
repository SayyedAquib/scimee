import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';
import siteConfig from './data/site-config.json';

describe('App Integration Test (End-to-End Component Tree)', () => {
  it('renders all core landing page sections and footer', async () => {
    render(<App />);

    // Header & Brand
    expect(screen.getAllByText(siteConfig.brand.name)[0]).toBeInTheDocument();

    // Hero section
    expect(screen.getAllByText(siteConfig.brand.taglineUrdu)[0]).toBeInTheDocument();

    // Toppers section
    expect(screen.getAllByText(/NEET UG/i)[0]).toBeInTheDocument();

    // Academic Programs section
    expect(screen.getByText(/Academic Programs/i)).toBeInTheDocument();

    // Syllabus section
    expect(
      await screen.findByPlaceholderText(/Search/i, {}, { timeout: 10000 })
    ).toBeInTheDocument();

    // Facilities section
    expect(
      await screen.findByText(/Infrastructure & Pedagogy/i, {}, { timeout: 10000 })
    ).toBeInTheDocument();

    // Campus location
    expect(await screen.findByText(/Campus Location/i, {}, { timeout: 10000 })).toBeInTheDocument();

    // FAQ section
    expect(await screen.findByText(/Got Questions\?/i, {}, { timeout: 10000 })).toBeInTheDocument();
  }, 15000);

  it('opens Admissions modal when Hero CTA is clicked and closes when closed', async () => {
    render(<App />);

    const callHeroBtn = screen.getByRole('button', { name: /Direct Call Helpline/i });
    await userEvent.click(callHeroBtn);

    // Modal dialog is now visible in the DOM
    expect(await screen.findByRole('dialog', {}, { timeout: 10000 })).toBeInTheDocument();
    expect(
      (await screen.findAllByText(/Rehan Sir/i, {}, { timeout: 10000 }))[0]
    ).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByLabelText('Close dialog');
    await userEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  }, 15000);
});
