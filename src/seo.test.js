import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('SEO, Social Link Previews & OpenGraph Meta Tags (index.html)', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  it('contains valid canonical and responsive viewport meta tags', () => {
    expect(htmlContent).toContain('<link rel="canonical" href="https://scimee.vercel.app/"');
    expect(htmlContent).toContain('name="viewport"');
    expect(htmlContent).toContain('name="google-site-verification"');
  });

  it('contains full OpenGraph metadata for WhatsApp, Facebook, and LinkedIn link previews', () => {
    expect(htmlContent).toContain('property="og:type" content="website"');
    expect(htmlContent).toContain('property="og:url" content="https://scimee.vercel.app/"');
    expect(htmlContent).toContain('property="og:title"');
    expect(htmlContent).toContain('property="og:description"');
    expect(htmlContent).toContain(
      'property="og:image" content="https://scimee.vercel.app/assets/og-preview.jpg"'
    );
    expect(htmlContent).toContain(
      'property="og:image:secure_url" content="https://scimee.vercel.app/assets/og-preview.jpg"'
    );
    expect(htmlContent).toContain('property="og:image:width" content="1200"');
    expect(htmlContent).toContain('property="og:image:height" content="630"');
    expect(htmlContent).toContain('property="og:site_name" content="SCIMEE"');
    expect(htmlContent).toContain('property="og:locale" content="en_IN"');
  });

  it('contains Twitter summary_large_image card metadata for rich Twitter/X previews', () => {
    expect(htmlContent).toContain('name="twitter:card" content="summary_large_image"');
    expect(htmlContent).toContain('name="twitter:title"');
    expect(htmlContent).toContain('name="twitter:description"');
    expect(htmlContent).toContain(
      'name="twitter:image" content="https://scimee.vercel.app/assets/og-preview.jpg"'
    );
  });

  it('contains root favicon and web manifest links for Google search bots and browsers', () => {
    expect(htmlContent).toContain('<link rel="icon" href="/favicon.ico"');
    expect(htmlContent).toContain('<link rel="shortcut icon" href="/favicon.ico"');
    expect(htmlContent).toContain('<link rel="manifest" href="/manifest.json"');
  });

  it('contains valid Schema.org JSON-LD structured data with WebSite, EducationalOrganization, and FAQPage', () => {
    expect(htmlContent).toContain('"@context": "https://schema.org"');
    expect(htmlContent).toContain('"@type": "WebSite"');
    expect(htmlContent).toContain('"@type": ["EducationalOrganization", "LocalBusiness"]');
    expect(htmlContent).toContain('"@type": "FAQPage"');
  });

  it('verifies that og-preview.jpg social image asset exists and is non-empty', () => {
    const assetPath = path.resolve(process.cwd(), 'public/assets/og-preview.jpg');
    expect(fs.existsSync(assetPath)).toBe(true);
    const stats = fs.statSync(assetPath);
    expect(stats.size).toBeGreaterThan(1000);
  });
});
