import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "PILAG Foundation | People's Initiative for Local Administration and Governance",
  description: 'Building a sustainable future through local action and data-driven impact.',
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
