import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MaintenancePage from './MaintenancePage';

describe('MaintenancePage (Payment Required Screen)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders HTTP 402 status badge, headline, and humor diagnostics', () => {
    render(<MaintenancePage />);

    expect(screen.getByText(/HTTP 402: Payment Required/i)).toBeInTheDocument();
    expect(screen.getByText(/Website Paused Due To Unfed Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Code Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/0% Received/i)).toBeInTheDocument();
  });

  it('displays UPI ID and renders Google Pay intent link', () => {
    render(<MaintenancePage />);

    expect(screen.getByText('aquibprivate@okhdfcbank')).toBeInTheDocument();

    const gpayLink = screen.getByRole('link', { name: /Pay via Google Pay \/ UPI/i });
    expect(gpayLink).toBeInTheDocument();
    expect(gpayLink.getAttribute('href')).toContain('upi://pay');
    expect(gpayLink.getAttribute('href')).toContain('aquibprivate%40okhdfcbank');
  });

  it('copies UPI ID to clipboard on button click', async () => {
    const writeTextMock = vi.fn().mockImplementation(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock
      },
      writable: true,
      configurable: true
    });

    render(<MaintenancePage />);

    const copyBtn = screen.getByRole('button', { name: /Copy UPI ID/i });
    await userEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('aquibprivate@okhdfcbank');
    expect(await screen.findByText(/Copied!/i)).toBeInTheDocument();
  });

  it('toggles QR code visibility when toggle button is clicked', async () => {
    render(<MaintenancePage />);

    expect(screen.queryByAltText(/Scan to pay/i)).not.toBeInTheDocument();

    const qrToggleBtn = screen.getByRole('button', { name: /Scan via Phone/i });
    await userEvent.click(qrToggleBtn);

    expect(screen.getByAltText(/Scan to pay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hide UPI QR Code/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Hide UPI QR Code/i }));
    expect(screen.queryByAltText(/Scan to pay/i)).not.toBeInTheDocument();
  });

  it('triggers payment verification and displays humorous WhatsApp follow-up', async () => {
    render(<MaintenancePage />);

    const checkBtn = screen.getByRole('button', { name: /I already paid!/i });
    await userEvent.click(checkBtn);

    expect(screen.getByText(/Querying RBI servers.../i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/₹0.00 detected/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const waLink = screen.getByRole('link', { name: /Send Receipt on WhatsApp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink.getAttribute('href')).toContain('https://wa.me/9175013140');
  });
});
