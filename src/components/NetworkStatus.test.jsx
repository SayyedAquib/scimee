import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NetworkStatus from './NetworkStatus';

describe('NetworkStatus Component', () => {
  it('renders nothing when browser is online initially', () => {
    const { container } = render(<NetworkStatus />);
    expect(container.firstChild).toBeNull();
  });

  it('displays offline pill toast when window triggers offline event', () => {
    render(<NetworkStatus />);
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText(/Offline Mode Active/i)).toBeInTheDocument();
  });

  it('displays connection restored toast when online event fires after offline', () => {
    render(<NetworkStatus />);
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText(/Offline Mode Active/i)).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(screen.getByText(/Connection Restored/i)).toBeInTheDocument();
  });
});
