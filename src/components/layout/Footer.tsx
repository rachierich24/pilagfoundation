import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-premium section" style={{ paddingBottom: '3rem', marginTop: '10vh' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            <div className="footer-col-1">
                <img src="/pilaglogo.png" alt="Pilag Foundation" style={{ height: '40px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
                <p style={{ opacity: 0.8, fontSize: '0.95rem', color: '#fff' }}>Advancing sovereign data and defending global climate justice since 2018.</p>
            </div>
            <div className="footer-col-2">
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Initiatives</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>About Us</Link></li>
                    <li><Link href="/impact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Our Impact</Link></li>
                    <li><Link href="/drives" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Upcoming Drives</Link></li>
                    <li><Link href="/support" style={{ color: 'var(--clr-accent-bright)', fontWeight: 600, textDecoration: 'none' }}>Donate to the Fund</Link></li>
                </ul>
            </div>
            <div className="footer-col-3">
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Contact</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>contact@pilagfoundation.org</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>New Delhi, India</p>
            </div>
            <div className="footer-col-4">
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Social</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
                    <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Twitter/X</a></li>
                    <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Instagram</a></li>
                    <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>LinkedIn</a></li>
                </ul>
            </div>
        </div>
        <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Pilag Foundation. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <span>Registration No. 49281-ACF</span>
                <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
        </div>
    </footer>
  );
}
