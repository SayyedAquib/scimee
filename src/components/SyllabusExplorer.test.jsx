import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SyllabusExplorer from './SyllabusExplorer';
import syllabusData from '../data/syllabus.json';

describe('SyllabusExplorer Component', () => {
  it('renders all exams and subject tab buttons', () => {
    render(<SyllabusExplorer onOpenCallModal={vi.fn()} />);
    syllabusData.exams.forEach((exam) => {
      expect(screen.getByRole('tab', { name: exam.name })).toBeInTheDocument();
    });
  });

  it('switches exam syllabus when clicking exam buttons (NEET / JEE)', async () => {
    render(<SyllabusExplorer onOpenCallModal={vi.fn()} />);
    const jeeExam = syllabusData.exams.find((e) => e.id === 'jee');
    if (jeeExam) {
      const jeeBtn = screen.getByRole('tab', { name: jeeExam.name });
      await userEvent.click(jeeBtn);
      expect(screen.getByRole('heading', { level: 3, name: jeeExam.title })).toBeInTheDocument();
    }
  });

  it('filters syllabus units by search query input', async () => {
    render(<SyllabusExplorer onOpenCallModal={vi.fn()} />);
    const searchInput = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(searchInput, 'Kinematics');
    expect(screen.getByText(/Kinematics/i)).toBeInTheDocument();
  });

  it('expands unit details when accordion unit header is clicked', async () => {
    render(<SyllabusExplorer onOpenCallModal={vi.fn()} />);
    const unitHeaders = screen.getAllByRole('button', { name: /View Topics/i });
    if (unitHeaders.length > 0) {
      await userEvent.click(unitHeaders[0]);
      expect(screen.getByText(/Topics & Key Focus Areas:/i)).toBeInTheDocument();
    }
  });
});
