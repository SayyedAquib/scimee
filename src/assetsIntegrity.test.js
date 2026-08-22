import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Static Assets & Social Previews Integrity Audit', () => {
  const publicDir = path.resolve(process.cwd(), 'public');

  it('verifies existence and non-zero size of primary favicons', () => {
    const faviconIco = path.join(publicDir, 'favicon.ico');
    const faviconPng = path.join(publicDir, 'favicon.png');

    expect(fs.existsSync(faviconIco)).toBe(true);
    expect(fs.existsSync(faviconPng)).toBe(true);
    expect(fs.statSync(faviconIco).size).toBeGreaterThan(1000);
    expect(fs.statSync(faviconPng).size).toBeGreaterThan(1000);
  });

  it('verifies high-resolution OpenGraph preview banner adheres to WhatsApp < 300KB limit', () => {
    const ogAssetsPath = path.join(publicDir, 'assets/og-preview.jpg');
    const ogRootPath = path.join(publicDir, 'og-preview.jpg');

    expect(fs.existsSync(ogAssetsPath)).toBe(true);
    expect(fs.existsSync(ogRootPath)).toBe(true);

    const assetSize = fs.statSync(ogAssetsPath).size;
    const rootSize = fs.statSync(ogRootPath).size;

    expect(assetSize).toBeGreaterThan(10000);
    // Critical: WhatsApp link crawler drops images larger than 300KB (307,200 bytes)
    expect(assetSize).toBeLessThan(300 * 1024);
    expect(rootSize).toBeLessThan(300 * 1024);
  });

  it('verifies existence and integrity of brand logos and vectors', () => {
    const logoPng = path.join(publicDir, 'assets/logo.png');
    const logoSvg = path.join(publicDir, 'assets/logo.svg');

    expect(fs.existsSync(logoPng)).toBe(true);
    expect(fs.existsSync(logoSvg)).toBe(true);
    expect(fs.statSync(logoPng).size).toBeGreaterThan(1000);
    expect(fs.statSync(logoSvg).size).toBeGreaterThan(500);
  });

  it('verifies existence and syntax of Google verification token file', () => {
    const gVerify = path.join(publicDir, 'google34fead6c1b66776b.html');
    expect(fs.existsSync(gVerify)).toBe(true);
    const content = fs.readFileSync(gVerify, 'utf-8');
    expect(content).toContain('google-site-verification');
  });
});
