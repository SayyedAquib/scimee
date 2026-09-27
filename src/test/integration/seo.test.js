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
    expect(htmlContent).toMatch(
      /property=["']og:url["']\s+content=["']https:\/\/scimee\.vercel\.app\/["']/
    );
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

  it('contains valid Geo-targeting meta tags for regional and local search ranking', () => {
    expect(htmlContent).toContain('<meta name="geo.region" content="IN-MH" />');
    expect(htmlContent).toContain('<meta name="geo.placename" content="Bhusawal" />');
    expect(htmlContent).toContain('<meta name="geo.position" content="21.036551;75.795913" />');
    expect(htmlContent).toContain('<meta name="ICBM" content="21.036551, 75.795913" />');
  });

  it('contains valid Schema.org JSON-LD structured data with WebSite, EducationalOrganization, FAQPage, BreadcrumbList, and areaServed', () => {
    expect(htmlContent).toContain('"@context": "https://schema.org"');
    expect(htmlContent).toContain('"@type": "WebSite"');
    expect(htmlContent).toContain('"@type": "BreadcrumbList"');
    expect(htmlContent).toContain('"@type": ["EducationalOrganization", "LocalBusiness"]');
    expect(htmlContent).toContain('"@type": "FAQPage"');
    expect(htmlContent).toContain('"areaServed": [');
    expect(htmlContent).toContain('"name": "Bhusawal"');
    expect(htmlContent).toContain('"name": "Jalgaon"');
    expect(htmlContent).toContain('"name": "Varangaon"');
    expect(htmlContent).toContain('"sameAs": [');
    expect(htmlContent).toContain('"courseMode": "onsite"');
  });

  it('contains crawlable semantic noscript fallback in body for non-JS search spiders', () => {
    expect(htmlContent).toContain(
      '<!-- Accessible, Crawlable Fallback for Search Engines & Non-JS Environments -->'
    );
    expect(htmlContent).toContain('<noscript>');
    expect(htmlContent).toContain(
      '<h1>SCIMEE - Sara Coaching Institute of Medical Entrance Examination</h1>'
    );
    expect(htmlContent).toContain('NEET Repeater / Dropper Batch (12th Pass)');
    expect(htmlContent).toContain('100% NEET 2026 qualification rate');
    expect(htmlContent).toContain('+91 9175013140');
  });

  it('verifies that public/sitemap.xml exists, is valid XML, and does not contain fragment # hashes', () => {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('<loc>https://scimee.vercel.app/</loc>');
    // URL fragment identifiers (#) must never be in sitemaps per Google Search Central specifications
    expect(sitemapContent).not.toContain('/#');
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
