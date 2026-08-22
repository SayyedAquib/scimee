import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent } from './analytics';

describe('Analytics & Telemetry Utility (trackEvent)', () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.va;
  });

  it('dispatches events to window.gtag if available', () => {
    window.gtag = vi.fn();
    trackEvent('admissions_call_click', { location: 'hero' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'admissions_call_click', {
      location: 'hero'
    });
  });

  it('dispatches events to window.va if available', () => {
    window.va = vi.fn();
    trackEvent('whatsapp_click', { course: 'NEET Repeater' });
    expect(window.va).toHaveBeenCalledWith('event', {
      name: 'whatsapp_click',
      data: { course: 'NEET Repeater' }
    });
  });

  it('fails silently and gracefully if analytics throw or are blocked by adblockers', () => {
    window.gtag = vi.fn().mockImplementation(() => {
      throw new Error('Adblocker blocked gtag');
    });

    expect(() => trackEvent('test_event')).not.toThrow();
  });
});
