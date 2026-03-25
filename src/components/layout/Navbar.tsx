'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`main-nav ${isOpen ? 'mobile-nav-open' : ''}`} aria-label="Main Navigation">
        <div className="nav-container">
            <Link href="/" className="logo-link">
                <img src="/pilaglogo.png" className="logo" alt="Pilag Foundation" />
            </Link>
            
            <button 
                className="nav-toggle" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation"
            >
                <span className="hamburger"></span>
            </button>

            <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
                <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                <li><Link href="/priorities" onClick={() => setIsOpen(false)}>Priorities</Link></li>
                <li><Link href="/impact" onClick={() => setIsOpen(false)}>Impact</Link></li>
                <li className="mobile-only">
                    <Link href="/support" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ background: '#1A3626', color: '#FFF' }}>
                        Support Us
                    </Link>
                </li>
            </ul>

            <div className="nav-actions desktop-only">
                <Link href="/support" className="btn btn-primary" style={{ background: '#1A3626', color: '#FFF' }}>
                    Support Us
                </Link>
            </div>
        </div>
    </nav>
  );
}
