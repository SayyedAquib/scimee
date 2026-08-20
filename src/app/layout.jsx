import './globals.css';
import siteConfig from '../data/site-config.json';

export const metadata = {
  title: `${siteConfig.brand.name} - ${siteConfig.brand.fullName} | Bhusawal`,
  description: `${siteConfig.brand.shortDescription} By ${siteConfig.brand.founder}. 45+ doctors placed in MBBS, BDS, BAMS. 100% qualify rate. Call ${siteConfig.contact.primaryPhoneFormatted}.`,
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
  authors: [{ name: siteConfig.brand.founder }],
  creator: siteConfig.brand.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://scimee.in',
    title: `${siteConfig.brand.name} - NEET UG & Medical Entrance Coaching | Bhusawal`,
    description: `100% NEET Qualification Rate (16/16 qualified). 45+ Doctors in Medical Field. Under the guidance of ${siteConfig.brand.founder}.`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: '/assets/logo.svg',
        width: 800,
        height: 800,
        alt: `${siteConfig.brand.name} Logo`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand.name} - ${siteConfig.brand.fullName}`,
    description: `Leading NEET & Medical Entrance Coaching in Bhusawal. 45+ Medical Selections. By ${siteConfig.brand.founder}.`
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#060913'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ambient-grid">
        {children}
      </body>
    </html>
  );
}
