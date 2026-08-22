// ==============================================================================
// SCIMEE OFFICIAL VCARD / CONTACT CARD GENERATOR (.vcf)
// Enables parents & students to save institute contact with 1 tap
// ==============================================================================

import siteConfig from '../data/site-config.json';

export function downloadVCard() {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${siteConfig.brand.founder} (${siteConfig.brand.name} Admissions)`,
    `ORG:${siteConfig.brand.fullName}`,
    'TITLE:Founder & Director',
    `TEL;TYPE=CELL,VOICE:${siteConfig.contact.primaryPhoneFormatted}`,
    `TEL;TYPE=WORK,VOICE:${siteConfig.contact.secondaryPhoneFormatted}`,
    `EMAIL:${siteConfig.contact.email}`,
    `URL:https://scimee.vercel.app`,
    `ADR;TYPE=WORK:;;${siteConfig.location.addressLine1}, ${siteConfig.location.addressLine2};${siteConfig.location.city};${siteConfig.location.state};${siteConfig.location.pincode};India`,
    `NOTE:${siteConfig.brand.shortDescription}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'SCIMEE_Admissions_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
