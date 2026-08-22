import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MapLocation from './MapLocation';
import siteConfig from '../data/site-config.json';

describe('MapLocation Component', () => {
  it('renders institute address and landmark info', () => {
    render(<MapLocation onOpenCallModal={vi.fn()} />);
    expect(
      screen.getAllByText(new RegExp(siteConfig.location.addressLine1, 'i'))[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(siteConfig.location.city, 'i'))[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(new RegExp(siteConfig.location.pincode, 'i'))[0]
    ).toBeInTheDocument();
  });

  it('renders Google Maps direction link with target _blank', () => {
    render(<MapLocation onOpenCallModal={vi.fn()} />);
    const mapsLink = screen.getByRole('link', { name: /Open in Google Maps/i });
    expect(mapsLink).toHaveAttribute('href', siteConfig.location.googleMapsUrl);
    expect(mapsLink).toHaveAttribute('target', '_blank');
  });

  it('renders responsive Google Maps iframe', () => {
    render(<MapLocation onOpenCallModal={vi.fn()} />);
    const iframe = screen.getByTitle('SCIMEE Google Maps Location');
    expect(iframe).toBeInTheDocument();
  });
});
