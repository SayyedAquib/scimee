import { describe, it, expect } from 'vitest';
import siteConfig from './data/site-config.json';
import coursesData from './data/courses.json';
import syllabusData from './data/syllabus.json';
import toppersData from './data/toppers.json';
import facilitiesData from './data/facilities.json';
import faqData from './data/faq.json';
import cbtFeaturesData from './data/cbt-features.json';

describe('JSON Data Integrity & Schema Validation', () => {
  describe('site-config.json', () => {
    it('contains complete brand information and valid founder details', () => {
      expect(siteConfig.brand.name).toBe('SCIMEE');
      expect(siteConfig.brand.founder).toBe('Ansari Rehan Ahmed');
      expect(siteConfig.brand.taglineUrdu).toBeTruthy();
    });

    it('contains valid 10-digit Indian phone numbers without formatting errors', () => {
      expect(siteConfig.contact.primaryPhone).toMatch(/^\d{10}$/);
      expect(siteConfig.contact.secondaryPhone).toMatch(/^\d{10}$/);
      expect(siteConfig.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('contains geographic coordinates and address in Bhusawal', () => {
      expect(siteConfig.location.city).toBe('Bhusawal');
      expect(siteConfig.location.state).toBe('Maharashtra');
      expect(siteConfig.location.pincode).toBe('425201');
      expect(siteConfig.location.latitude).toBeGreaterThan(20);
      expect(siteConfig.location.longitude).toBeGreaterThan(70);
    });

    it('contains non-empty navigation and stats items', () => {
      expect(siteConfig.navigation.length).toBeGreaterThanOrEqual(5);
      expect(siteConfig.stats.length).toBe(4);
    });
  });

  describe('courses.json', () => {
    it('contains unique IDs for all academic programs', () => {
      const ids = coursesData.programs.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('ensures each program has highlights, target audience, and valid CTA text', () => {
      coursesData.programs.forEach((program) => {
        expect(program.name).toBeTruthy();
        expect(program.badge).toBeTruthy();
        expect(program.target).toBeTruthy();
        expect(program.description.length).toBeGreaterThan(20);
        expect(program.highlights.length).toBeGreaterThanOrEqual(3);
        expect(program.ctaText).toBeTruthy();
      });
    });
  });

  describe('syllabus.json', () => {
    it('contains all 3 major entrance examinations (NEET, JEE, MHT-CET)', () => {
      const examIds = syllabusData.exams.map((e) => e.id);
      expect(examIds).toContain('neet');
      expect(examIds).toContain('jee');
      expect(examIds).toContain('mhtcet');
    });

    it('ensures all subjects have sequential unit numbering and detailed topics', () => {
      syllabusData.exams.forEach((exam) => {
        expect(exam.title).toBeTruthy();
        expect(exam.markingScheme).toBeTruthy();
        expect(exam.subjects.length).toBeGreaterThanOrEqual(3);

        exam.subjects.forEach((subject) => {
          expect(subject.name).toBeTruthy();
          expect(subject.units.length).toBeGreaterThan(0);

          subject.units.forEach((unit, idx) => {
            expect(unit.unitNumber).toBe(idx + 1);
            expect(unit.name.trim().length).toBeGreaterThan(2);
            expect(unit.topics.trim().length).toBeGreaterThan(15);
          });
        });
      });
    });
  });

  describe('toppers.json', () => {
    it('contains valid exam year and 100% qualification banner', () => {
      expect(toppersData.year).toBe('2026');
      expect(toppersData.highlight.badge).toContain('QUALIFIED');
    });

    it('validates each student score within 0 to 720 and has a non-empty name', () => {
      expect(toppersData.students.length).toBe(16);

      toppersData.students.forEach((student) => {
        expect(student.name.trim().length).toBeGreaterThan(2);
        expect(student.score).toBeGreaterThan(0);
        expect(student.score).toBeLessThanOrEqual(720);
        expect(student.badge).toBeTruthy();
      });
    });

    it('contains subject topper cards for Biology, Physics, and Chemistry', () => {
      expect(toppersData.subjectToppers.length).toBe(3);
      const subjects = toppersData.subjectToppers.map((st) => st.subject);
      expect(subjects).toContain('Biology');
      expect(subjects).toContain('Physics');
      expect(subjects).toContain('Chemistry');
    });
  });

  describe('facilities.json and faq.json', () => {
    it('validates that all campus facilities have icons and descriptions', () => {
      expect(facilitiesData.items.length).toBeGreaterThanOrEqual(5);
      facilitiesData.items.forEach((facility) => {
        expect(facility.title.trim().length).toBeGreaterThan(3);
        expect(facility.description.trim().length).toBeGreaterThan(15);
        expect(facility.icon).toBeTruthy();
      });
    });

    it('validates that all FAQs have valid questions and answers', () => {
      expect(faqData.faqs.length).toBeGreaterThanOrEqual(6);
      faqData.faqs.forEach((faq) => {
        expect(faq.question.trim().length).toBeGreaterThan(5);
        expect(faq.answer.trim().length).toBeGreaterThan(15);
      });
    });
  });

  describe('cbt-features.json', () => {
    it('validates CBT portal feature schema, metrics, and bullet points', () => {
      expect(cbtFeaturesData.sectionTitle).toContain('CBT');
      expect(cbtFeaturesData.metrics.length).toBe(4);
      expect(cbtFeaturesData.features.length).toBe(4);

      cbtFeaturesData.features.forEach((feature) => {
        expect(feature.title).toBeTruthy();
        expect(feature.tag).toBeTruthy();
        expect(feature.description.length).toBeGreaterThan(20);
        expect(feature.bulletPoints.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
