import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';
import siteConfig from './data/site-config.json';

describe('App Integration Test (End-to-End Component Tree)', () => {
  it('renders all core landing page sections and footer', () => {
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
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

    // Facilities section
    expect(screen.getByText(/Infrastructure & Pedagogy/i)).toBeInTheDocument();

    // Campus location
    expect(screen.getByText(/Campus Location/i)).toBeInTheDocument();

    // FAQ section
    expect(screen.getByText(/Got Questions\?/i)).toBeInTheDocument();
  }, 15000);

  it('opens Admissions modal when Hero CTA is clicked and closes when closed', async () => {
    render(<App />);

    const callHeroBtn = screen.getByRole('button', { name: /Direct Call Helpline/i });
    await userEvent.click(callHeroBtn);

    // Modal dialog is now visible in the DOM
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getAllByText(/Rehan Sir/i)[0]).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByLabelText('Close dialog');
    await userEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  }, 15000);
});
