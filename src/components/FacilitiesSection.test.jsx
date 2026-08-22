import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FacilitiesSection from './FacilitiesSection';
import facilitiesData from '../data/facilities.json';

describe('FacilitiesSection Component', () => {
  it('renders section title and facility cards', () => {
    render(<FacilitiesSection onOpenCallModal={vi.fn()} />);
    expect(screen.getByText(facilitiesData.sectionTitle)).toBeInTheDocument();

    facilitiesData.items.forEach((facility) => {
      expect(screen.getByText(facility.title)).toBeInTheDocument();
    });
  });

  it('triggers onOpenCallModal when Book a Campus Visit CTA is clicked', async () => {
    const handleOpenModal = vi.fn();
    render(<FacilitiesSection onOpenCallModal={handleOpenModal} />);
    const ctaBtn = screen.getByRole('button', { name: /Book a Campus Visit/i });
    await userEvent.click(ctaBtn);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
