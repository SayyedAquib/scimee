// ==============================================================================
// SCIMEE SMART CONTEXTUAL WHATSAPP ROUTING
// Generates pre-filled, respectful Islamic greetings based on course context
// ==============================================================================

import siteConfig from '../data/site-config.json';

const DEFAULT_GREETING =
  'As-salamu alaykum Rehan Sir, I would like to enquire about SCIMEE admissions, batch timings, and counseling.';

export function getWhatsAppUrl(context = 'general') {
  const number = siteConfig?.contact?.whatsappNumber ?? '919175013140';

  // Early return default if context is falsy or not a string
  if (!context || typeof context !== 'string') {
    return `https://wa.me/${number}?text=${encodeURIComponent(DEFAULT_GREETING)}`;
  }

  const lower = context.trim().toLowerCase();
  let message = DEFAULT_GREETING;

  if (lower.includes('repeater') || lower.includes('dropper')) {
    message =
      'As-salamu alaykum Rehan Sir, I would like to enquire about the NEET Repeater / Dropper Batch (12th Pass) admissions and fee structure.';
  } else if (
    lower.includes('counseling') ||
    lower.includes('counselling') ||
    lower.includes('choice') ||
    lower.includes('post-neet')
  ) {
    message =
      'As-salamu alaykum Rehan Sir, I would like to schedule a 1-on-1 Post-NEET Medical College Admission & Choice Filling Counseling session with you for my son/daughter.';
  } else if (lower.includes('11') || lower.includes('12') || lower.includes('integrated')) {
    message =
      'As-salamu alaykum Rehan Sir, I would like to enquire about the Class 11th & 12th NEET Integrated Two-Year batch.';
  } else if (lower.includes('cet') || lower.includes('jee')) {
    message =
      'As-salamu alaykum Rehan Sir, I would like to enquire about the MHT-CET & JEE Foundation batch admissions.';
  } else if (
    lower.includes('foundation') ||
    lower.includes('5th') ||
    lower.includes('10th') ||
    lower.includes('pre')
  ) {
    message =
      'As-salamu alaykum Rehan Sir, I would like to enquire about the Class 5th to 10th Pre-Foundation Olympiad & Science batch.';
  } else if (lower.includes('syllabus')) {
    message =
      'As-salamu alaykum SCIMEE, I was exploring the official 2026 curriculum on your website and want to know more about the test series schedule.';
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
