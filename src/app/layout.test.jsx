import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout, { metadata, viewport } from './layout';
import siteConfig from '../data/site-config.json';

describe('RootLayout Component & Next Metadata', () => {
  it('exports accurate SEO metadata aligned with site configuration', () => {
    expect(metadata.title).toContain(siteConfig.brand.name);
    expect(metadata.title).toContain(siteConfig.brand.fullName);
    expect(metadata.description).toContain(siteConfig.brand.founder);
    expect(metadata.keywords).toContain('SCIMEE');
    expect(metadata.keywords).toContain('NEET Syllabus 2026');
    expect(metadata.openGraph.siteName).toBe(siteConfig.brand.name);
  });

  it('exports responsive viewport configuration with touch zoom support', () => {
    expect(viewport.width).toBe('device-width');
    expect(viewport.initialScale).toBe(1);
    expect(viewport.maximumScale).toBe(5);
  });

  it('renders html and body shell wrapping child components', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Child Layout Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
