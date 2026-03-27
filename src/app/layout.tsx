import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ClientLayout from '../components/layout/ClientLayout';

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
        <ClientLayout>
          <div id="eco-cursor"></div>
          <div id="scroll-progress-bar"></div>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
