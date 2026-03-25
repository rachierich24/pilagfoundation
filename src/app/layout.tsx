import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'PILAG Foundation | High-Kinetic Redesign',
  description: 'Climate & Social Change Foundation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--clr-bg-panel)', color: 'var(--clr-text-prime)' }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
