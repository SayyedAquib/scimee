import './globals.css';
import siteConfig from '../data/site-config.json';

const brandName = siteConfig?.brand?.name ?? 'SCIMEE';
const brandFullName =
  siteConfig?.brand?.fullName ?? 'Sara Coaching Institute of Medical Entrance Examination';
const founder = siteConfig?.brand?.founder ?? 'Ansari Rehan Ahmed';
const shortDescription =
  siteConfig?.brand?.shortDescription ?? 'NEET-UG & Medical Entrance Coaching in Bhusawal.';
const primaryPhoneFormatted = siteConfig?.contact?.primaryPhoneFormatted ?? '+91 9175013140';

export const metadata = {
  title: `${brandName} - ${brandFullName} | Bhusawal`,
  description: `${shortDescription} By ${founder}. 45+ doctors placed in MBBS, BDS, BAMS. 100% qualify rate. Call ${primaryPhoneFormatted}.`,
  keywords: [
    'SCIMEE',
    'SCIMEE Bhusawal',
    'Sara Coaching Institute of Medical Entrance Examination',
    'Ansari Rehan Ahmed',
    'NEET Coaching Bhusawal',
    'NEET Repeaters Bhusawal',
    'Best NEET Classes Jalgaon',
    'MHT CET Classes Bhusawal',
    'Foundation 5th to 10th Bhusawal',
    'NEET Syllabus 2026'
  ],
  authors: [{ name: founder }],
  creator: brandName,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://scimee.in',
    title: `${brandName} - NEET UG & Medical Entrance Coaching | Bhusawal`,
    description: `100% NEET Qualification Rate (16/16 qualified). 45+ Doctors in Medical Field. Under the guidance of ${founder}.`,
    siteName: brandName,
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 800,
        alt: `${brandName} Logo`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brandName} - ${brandFullName}`,
    description: `Leading NEET & Medical Entrance Coaching in Bhusawal. 45+ Medical Selections. By ${founder}.`
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ambient-grid">{children}</body>
    </html>
  );
}
