import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: '3rem', marginTop: '10vh', background: 'var(--clr-bg-deep)', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
        <div className="container grid-cols-2">
            <div>
                <img src="/pilaglogo.png" alt="Pilag Foundation" style={{ height: '40px', marginBottom: '2rem' }} />
                <p className="lead-text" style={{ fontSize: '1.2rem', maxWidth: '300px' }}>Advancing sovereign data and defending global climate justice since 2018.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Initiatives</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><Link href="/impact" style={{ color: 'var(--clr-text-prime)', textDecoration: 'none' }}>Our Impact</Link></li>
                    <li><Link href="/support" style={{ color: 'var(--clr-accent-bright)', fontWeight: 600, textDecoration: 'none' }}>Donate to the Fund</Link></li>
                </ul>
            </div>
        </div>
        <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(34,34,34,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', opacity: 0.6 }}>
            <p>© {new Date().getFullYear()} Pilag Foundation. All rights reserved.</p>
            <p>Registration No. 49281-ACF</p>
        </div>
    </footer>
  );
}
