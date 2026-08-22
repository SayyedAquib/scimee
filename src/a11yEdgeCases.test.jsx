import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PhoneCallModal from './components/PhoneCallModal';
import SyllabusExplorer from './components/SyllabusExplorer';
import { trackEvent } from './utils/analytics';
import { getWhatsAppUrl } from './utils/whatsapp';
import { downloadVCard } from './utils/vcard';
import siteConfig from './data/site-config.json';

describe('Accessibility (a11y) & Utility Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Keyboard Navigation & ARIA Semantics', () => {
    it('traps and manages Escape key safely within dialog', () => {
      const handleClose = vi.fn();
      render(<PhoneCallModal isOpen={true} onClose={handleClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'call-modal-title');

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('renders accessible tablist with correct aria-selected states in SyllabusExplorer', () => {
      render(<SyllabusExplorer onOpenCallModal={vi.fn()} />);

      const tablist = screen.getByRole('tablist', { name: /Exam Syllabus Selection/i });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Analytics Utility Error Resilience', () => {
    it('silently recovers without crashing the application when window.gtag throws an error', () => {
      window.gtag = vi.fn().mockImplementation(() => {
        throw new Error('Analytics Tracking Network Timeout');
      });

      expect(() => {
        trackEvent('test_event_resilience', { category: 'admissions' });
      }).not.toThrow();

      delete window.gtag;
    });

    it('silently recovers when window.va throws an error', () => {
      window.va = vi.fn().mockImplementation(() => {
        throw new Error('Vercel Analytics Blocked By Client');
      });

      expect(() => {
        trackEvent('vercel_test_event', { page: '/results' });
      }).not.toThrow();

      delete window.va;
    });
  });

  describe('WhatsApp URL Generator Edge Cases', () => {
    it('falls back safely to general admissions message for unrecognized context keys', () => {
      const url = getWhatsAppUrl('unrecognized_random_context');
      expect(url).toContain('wa.me');
      expect(url).toContain(siteConfig.contact.primaryPhone);
      expect(url).toContain('As-salamu');
    });

    it('handles null or undefined context arguments gracefully', () => {
      const urlNull = getWhatsAppUrl(null);
      const urlUndefined = getWhatsAppUrl(undefined);

      expect(urlNull).toContain('wa.me');
      expect(urlUndefined).toContain('wa.me');
    });

    it('correctly formats and encodes specific course inquiries (e.g. repeater)', () => {
      const url = getWhatsAppUrl('repeater');
      expect(url).toContain('Repeater');
      expect(url).toContain('As-salamu');
    });
  });

  describe('vCard Generator Edge Cases', () => {
    it('executes download and cleans up DOM elements cleanly without leaving leaked links', () => {
      const appendChildSpy = vi.spyOn(document.body, 'appendChild');
      const removeChildSpy = vi.spyOn(document.body, 'removeChild');

      downloadVCard();

      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
    });
  });
});
