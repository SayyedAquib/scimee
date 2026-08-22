import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as vcardModule from './utils/vcard';
import siteConfig from './data/site-config.json';

describe('End-to-End User Conversion Journey', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes the full student admission journey seamlessly', async () => {
    const vcardSpy = vi.spyOn(vcardModule, 'downloadVCard').mockImplementation(() => {});

    render(<App />);

    // 1. User arrives on home page and sees SCIMEE brand & Urdu motto
    expect(screen.getAllByText(/SCIMEE/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(siteConfig.brand.taglineUrdu)[0]).toBeInTheDocument();

    // 2. User checks Toppers section and filters to Top Rank (552)
    const topRankBtn = screen.getByRole('button', { name: /Top Rank/i });
    fireEvent.click(topRankBtn);
    expect(screen.getByText(/All Qualified Candidates \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText('Naushin Ara')).toBeInTheDocument();

    // 3. User switches to NEET syllabus and searches for "Optics" in Physics
    const searchInput = screen.getByPlaceholderText(/Search Physics units/i);
    fireEvent.change(searchInput, { target: { value: 'Optics' } });
    expect(screen.getByText(/Optics/i)).toBeInTheDocument();

    // 4. User scrolls to FAQ and expands second question
    const secondQuestion = screen.getByText(/How do I enroll or book a counseling session\?/i);
    fireEvent.click(secondQuestion);
    expect(screen.getAllByText(/Khadka Square/i)[0]).toBeInTheDocument();

    // 5. User clicks "Call Now" in Floating Action Bar / Hero
    const heroCallBtn = screen.getByRole('button', { name: /Direct Call Helpline/i });
    await userEvent.click(heroCallBtn);

    // Modal dialog is open with Rehan Sir contact details
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Rehan Sir/i)).toBeInTheDocument();

    // 6. User clicks Save Contact to download vCard
    const saveContactBtn = screen.getByRole('button', { name: /Save Rehan Sir/i });
    await userEvent.click(saveContactBtn);
    expect(vcardSpy).toHaveBeenCalledTimes(1);

    // 7. User closes dialog via close button
    const closeBtn = screen.getByLabelText('Close dialog');
    await userEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    vcardSpy.mockRestore();
  }, 15000);
});
