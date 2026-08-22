import { describe, it, expect } from 'vitest';
import { getWhatsAppUrl } from './whatsapp';
import siteConfig from '../data/site-config.json';

describe('WhatsApp Routing Utility (getWhatsAppUrl)', () => {
  const expectedNumber = siteConfig.contact.whatsappNumber;

  it('generates a valid WhatsApp URL with official WhatsApp number', () => {
    const url = getWhatsAppUrl();
    expect(url).toContain(`https://wa.me/${expectedNumber}`);
    expect(url).toContain('text=');
  });

  it('includes the Islamic greeting "As-salamu alaykum" in the general context', () => {
    const url = getWhatsAppUrl('general');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('As-salamu alaykum');
    expect(decodedMessage).toContain('Rehan Sir');
    expect(decodedMessage).toContain('SCIMEE admissions');
  });

  it('contextually tailors message for Repeater / Dropper batch', () => {
    const url = getWhatsAppUrl('repeater');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('As-salamu alaykum');
    expect(decodedMessage).toContain('NEET Repeater / Dropper Batch');
  });

  it('contextually tailors message for Class 11th & 12th Integrated batch', () => {
    const url = getWhatsAppUrl('Class 11 Integrated');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('Class 11th & 12th NEET Integrated');
  });

  it('contextually tailors message for MHT-CET / JEE batches', () => {
    const url = getWhatsAppUrl('mht-cet crash course');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('MHT-CET & JEE Foundation');
  });

  it('contextually tailors message for Pre-Foundation 5th-10th batch', () => {
    const url = getWhatsAppUrl('5th to 10th foundation');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('Class 5th to 10th Pre-Foundation');
  });

  it('contextually tailors message for Syllabus Explorer inquiry', () => {
    const url = getWhatsAppUrl('syllabus');
    const decodedMessage = decodeURIComponent(url.split('text=')[1]);
    expect(decodedMessage).toContain('As-salamu alaykum SCIMEE');
    expect(decodedMessage).toContain('official 2026 curriculum');
  });

  it('safely handles non-string and empty inputs with fallback default greeting', () => {
    expect(getWhatsAppUrl(null)).toContain('As-salamu%20alaykum');
    expect(getWhatsAppUrl(undefined)).toContain('As-salamu%20alaykum');
    expect(getWhatsAppUrl(12345)).toContain('As-salamu%20alaykum');
  });
});
