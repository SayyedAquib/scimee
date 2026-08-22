import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import siteConfig from '../data/site-config.json';

const FaultyComponent = () => {
  throw new Error('Simulated Component Crash');
};

const SafeComponent = () => <div>Safe Component Content</div>;

describe('ErrorBoundary Component', () => {
  it('renders children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Component Content')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback recovery card with admissions contact', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went slightly off/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload Application/i })).toBeInTheDocument();
    const callLink = screen.getByRole('link', { name: /Call Admissions/i });
    expect(callLink).toHaveAttribute('href', `tel:${siteConfig.contact.primaryPhone}`);

    consoleSpy.mockRestore();
  });

  it('triggers window.location.reload when Reload Application button is clicked', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadSpy },
      writable: true
    });

    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    const reloadBtn = screen.getByRole('button', { name: /Reload Application/i });
    await userEvent.click(reloadBtn);
    expect(reloadSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
