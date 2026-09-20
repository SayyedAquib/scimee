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
    expect(htmlContent).toMatch(/property=["']og:type["']\s+content=["']website["']/);
    expect(htmlContent).toMatch(/property=["']og:url["']\s+content=["']https:\/\/scimee\.vercel\.app\/["']/);
    expect(htmlContent).toContain('property="og:title"');
    expect(htmlContent).toContain('property="og:description"');
    expect(htmlContent).toMatch(
      /property=["']og:image["']\s+content=["']https:\/\/scimee\.vercel\.app\/assets\/og-preview\.jpg["']/
    );
    expect(htmlContent).toMatch(
      /property=["']og:image:secure_url["']\s+content=["']https:\/\/scimee\.vercel\.app\/assets\/og-preview\.jpg["']/
    );
    expect(htmlContent).toMatch(/property=["']og:image:width["']\s+content=["']1200["']/);
    expect(htmlContent).toMatch(/property=["']og:image:height["']\s+content=["']630["']/);
    expect(htmlContent).toMatch(/property=["']og:site_name["']\s+content=["']SCIMEE["']/);
    expect(htmlContent).toMatch(/property=["']og:locale["']\s+content=["']en_IN["']/);
  });

  it('contains Twitter summary_large_image card metadata for rich Twitter/X previews', () => {
    expect(htmlContent).toMatch(/name=["']twitter:card["']\s+content=["']summary_large_image["']/);
    expect(htmlContent).toContain('name="twitter:title"');
    expect(htmlContent).toContain('name="twitter:description"');
    expect(htmlContent).toMatch(
      /name=["']twitter:image["']\s+content=["']https:\/\/scimee\.vercel\.app\/assets\/og-preview\.jpg["']/
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

  it('contains live Google Analytics 4 (gtag.js) script with Measurement ID G-DP9LT3BX5P', () => {
    expect(htmlContent).toContain(
      '<script async src="https://www.googletagmanager.com/gtag/js?id=G-DP9LT3BX5P"></script>'
    );
    expect(htmlContent).toContain("gtag('config', 'G-DP9LT3BX5P');");
  });
});
