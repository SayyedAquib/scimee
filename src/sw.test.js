import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Service Worker (sw.js) Architecture & Offline Strategy', () => {
  const swPath = path.resolve(process.cwd(), 'public/sw.js');
  const swContent = fs.readFileSync(swPath, 'utf-8');

  it('defines unique versioned cache storage name', () => {
    expect(swContent).toMatch(/const CACHE_NAME = ['"]scimee-cache-v\d+['"]/);
  });

  it('pre-caches all essential application shell assets upon installation', () => {
    expect(swContent).toContain('STATIC_ASSETS');
    expect(swContent).toContain("'/'");
    expect(swContent).toContain("'/index.html'");
    expect(swContent).toContain("'/manifest.json'");
  });

  it('implements activate event for cache invalidation and client claiming', () => {
    expect(swContent).toContain("self.addEventListener('activate'");
    expect(swContent).toContain('caches.keys()');
    expect(swContent).toContain('caches.delete');
    expect(swContent).toContain('self.clients.claim()');
  });

  it('implements Network-First fetch handler with offline cache fallback', () => {
    expect(swContent).toContain("self.addEventListener('fetch'");
    expect(swContent).toContain('event.respondWith');
    expect(swContent).toContain('caches.open');
    expect(swContent).toContain('caches.match');
  });
});
