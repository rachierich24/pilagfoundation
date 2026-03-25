import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="main-nav" aria-label="Main Navigation">
        <div className="nav-container">
            <Link href="/">
                <img src="/pilaglogo.png" className="logo" alt="Pilag Foundation" />
            </Link>
            <ul className="nav-links">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/priorities">Priorities</Link></li>
                <li><Link href="/impact">Impact</Link></li>
            </ul>
            <div className="nav-actions">
                <Link href="/support" className="btn btn-primary" style={{ background: '#1A3626', color: '#FFF' }}>
                    Support Us
                </Link>
            </div>
        </div>
    </nav>
  );
}
