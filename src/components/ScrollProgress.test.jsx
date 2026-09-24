import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollProgress from './ScrollProgress';

describe('ScrollProgress Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a progressbar with initial value', () => {
    render(<ScrollProgress />);
    const bar = screen.getByTestId('scroll-progress');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-hidden', 'true');
  });

  it('updates progress on window scroll event', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      configurable: true
    });
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true, writable: true });

    render(<ScrollProgress />);
    fireEvent.scroll(window);

    const bar = screen.getByTestId('scroll-progress');
    expect(bar).toBeInTheDocument();
    expect(bar.style.width).toBe('50%');
  });
});
