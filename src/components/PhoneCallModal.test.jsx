import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PhoneCallModal from './PhoneCallModal';
import siteConfig from '../data/site-config.json';
import * as vcardModule from '../utils/vcard';

describe('PhoneCallModal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<PhoneCallModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal dialog with contact details when isOpen is true', () => {
    render(<PhoneCallModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Rehan Sir/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(siteConfig.contact.primaryPhone, 'i'))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(siteConfig.contact.secondaryPhone, 'i'))
    ).toBeInTheDocument();
  });

  it('renders tailored counseling header when context is counseling', () => {
    render(<PhoneCallModal isOpen={true} onClose={vi.fn()} context="post-neet-counseling" />);
    expect(screen.getByText(/1-on-1 Admission Counseling/i)).toBeInTheDocument();
    expect(screen.getByText(/Consult Rehan Sir \(Parents & Students\)/i)).toBeInTheDocument();
  });

  it('locks background scroll when modal opens and unlocks on close', () => {
    const { unmount } = render(<PhoneCallModal isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<PhoneCallModal isOpen={true} onClose={handleClose} />);
    const closeBtn = screen.getByLabelText('Close dialog');
    await userEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<PhoneCallModal isOpen={true} onClose={handleClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('provides tel: dialing links for primary and secondary numbers', () => {
    render(<PhoneCallModal isOpen={true} onClose={vi.fn()} />);
    const dialLinks = screen.getAllByRole('link');
    expect(
      dialLinks.some((l) => l.getAttribute('href') === `tel:${siteConfig.contact.primaryPhone}`)
    ).toBe(true);
  });

  it('triggers downloadVCard when Save Contact button is clicked', async () => {
    const vcardSpy = vi.spyOn(vcardModule, 'downloadVCard').mockImplementation(() => {});
    render(<PhoneCallModal isOpen={true} onClose={vi.fn()} />);
    const saveContactBtn = screen.getByRole('button', { name: /Save Rehan Sir/i });
    await userEvent.click(saveContactBtn);
    expect(vcardSpy).toHaveBeenCalledTimes(1);
    vcardSpy.mockRestore();
  });
});
