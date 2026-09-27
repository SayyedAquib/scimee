import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PWA, Security Headers, Robots & Web Crawlers Validation', () => {
  describe('robots.txt', () => {
    const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');

    it('exists and allows all search engines to crawl', () => {
      expect(robotsContent).toContain('User-agent: *');
      expect(robotsContent).toContain('Allow: /');
    });

    it('contains the absolute sitemap index URL', () => {
      expect(robotsContent).toContain('Sitemap: https://scimee.vercel.app/sitemap.xml');
    });
  });

  describe('sitemap.xml', () => {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

    it('is a valid XML sitemap with urlset namespace', () => {
      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapContent).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      );
    });

    it('includes all primary page anchors and high priority rating for home', () => {
      expect(sitemapContent).toContain('<loc>https://scimee.vercel.app/</loc>');
      expect(sitemapContent).toContain('<loc>https://scimee.vercel.app/#results</loc>');
      expect(sitemapContent).toContain('<loc>https://scimee.vercel.app/#courses</loc>');
      expect(sitemapContent).toContain('<loc>https://scimee.vercel.app/#syllabus</loc>');
      expect(sitemapContent).toContain('<priority>1.0</priority>');
    });
  });

  describe('manifest.json (PWA Web App Manifest)', () => {
    const manifestPath = path.resolve(process.cwd(), 'public/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    it('contains valid PWA names, start_url, and standalone display mode', () => {
      expect(manifest.name).toContain('SCIMEE');
      expect(manifest.short_name).toBe('SCIMEE');
      expect(manifest.start_url).toBe('/');
      expect(manifest.display).toBe('standalone');
      expect(manifest.theme_color).toBe('#ffffff');
    });

    it('contains valid 192x192 and 512x512 maskable app icons', () => {
      expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
      const iconSizes = manifest.icons.map((i) => i.sizes);
      expect(iconSizes).toContain('192x192');
      expect(iconSizes).toContain('512x512');
    });
  });

  describe('_headers (Edge Security & Caching Directives)', () => {
    const headersPath = path.resolve(process.cwd(), 'public/_headers');
    const headersContent = fs.readFileSync(headersPath, 'utf-8');

    it('defines long-term immutable caching for static assets', () => {
      expect(headersContent).toContain('/assets/*');
      expect(headersContent).toContain('max-age=31536000, immutable');
    });

    it('enforces hardened web security headers across all routes', () => {
      expect(headersContent).toContain('X-Frame-Options: SAMEORIGIN');
      expect(headersContent).toContain('X-Content-Type-Options: nosniff');
      expect(headersContent).toContain('Strict-Transport-Security');
      expect(headersContent).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    });
  });
});
