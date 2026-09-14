import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ambient-grid">{children}</body>
    </html>
  );
}
