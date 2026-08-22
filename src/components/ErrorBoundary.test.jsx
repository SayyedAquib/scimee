import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

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
    expect(screen.getByRole('link', { name: /Call Admissions/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
