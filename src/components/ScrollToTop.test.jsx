import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is hidden initially when scroll position is at the top', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true });
    render(<ScrollToTop />);
    expect(screen.queryByRole('button', { name: /Scroll back to top/i })).not.toBeInTheDocument();
  });

  it('becomes visible after scrolling down past 500px and scrolls to top on click', () => {
    Object.defineProperty(window, 'scrollY', { value: 600, configurable: true, writable: true });
    render(<ScrollToTop />);
    fireEvent.scroll(window);

    const btn = screen.getByRole('button', { name: /Scroll back to top/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
