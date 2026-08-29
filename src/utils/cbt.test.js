import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCbtUrl, openCbtPortal, DEFAULT_CBT_URL, CBT_ROUTES } from './cbt';
import * as analytics from './analytics';

describe('CBT Portal Integration Utility (src/utils/cbt.js)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('exports default CBT portal url correctly', () => {
    expect(DEFAULT_CBT_URL).toBe('https://cbt-frontend-pied.vercel.app');
  });

  it('resolves root CBT URL with fallback or env', () => {
    const url = getCbtUrl();
    expect(url).toContain('cbt-frontend-pied.vercel.app');
  });

  it('normalizes path correctly without double slashes', () => {
    expect(getCbtUrl('/tests')).toMatch(/\/tests$/);
    expect(getCbtUrl('tests')).toMatch(/\/tests$/);
    expect(getCbtUrl('/login')).toMatch(/\/login$/);
    expect(getCbtUrl('signup')).toMatch(/\/signup$/);
  });

  it('dispatches analytics and triggers window.open on openCbtPortal', () => {
    const trackSpy = vi.spyOn(analytics, 'trackEvent');
    const openSpy = vi.fn();
    window.open = openSpy;

    openCbtPortal(CBT_ROUTES.TESTS, 'hero_banner');

    expect(trackSpy).toHaveBeenCalledWith('cbt_portal_click', {
      url: expect.stringContaining('/tests'),
      path: '/tests',
      source: 'hero_banner'
    });
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('/tests'),
      '_blank',
      'noopener,noreferrer'
    );
  });
});
