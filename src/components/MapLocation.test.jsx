import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders Google Maps direction link with target _blank and noopener', () => {
    render(<MapLocation onOpenCallModal={vi.fn()} />);
    const mapsLink = screen.getByRole('link', { name: /Open in Google Maps/i });
    expect(mapsLink).toHaveAttribute('href', siteConfig.location.googleMapsUrl);
    expect(mapsLink).toHaveAttribute('target', '_blank');
    expect(mapsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('triggers onOpenCallModal when Call Institute button is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<MapLocation onOpenCallModal={handleOpenModal} />);
    const callBtn = screen.getByRole('button', { name: /Call Institute/i });
    await userEvent.click(callBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  it('renders responsive Google Maps iframe with referrerPolicy', () => {
    render(<MapLocation onOpenCallModal={vi.fn()} />);
    const iframe = screen.getByTitle('SCIMEE Google Maps Location');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', siteConfig.location.googleMapsEmbed);
  });
});
