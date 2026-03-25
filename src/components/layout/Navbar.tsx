'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = () => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    return (
        <nav className={`main-nav ${isOpen ? 'mobile-nav-open' : ''}`} aria-label="Main Navigation">
            <div className="nav-container">
                <div className="logo-link">
                    <Link href="/">
                        <img src="/pilaglogo.png" className="logo" alt="Pilag Foundation" />
                    </Link>
                </div>
                
                <button 
                    className="nav-toggle" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Navigation"
                >
                    <span className="hamburger"></span>
                </button>
    
                <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <li><Link href="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link href="/priorities" onClick={closeMenu}>Priorities</Link></li>
                    <li><Link href="/impact" onClick={closeMenu}>Impact</Link></li>
                    <li className="mobile-only">
                        <Link href="/support" className="btn btn-primary" onClick={closeMenu} style={{ background: '#1A3626', color: '#FFF' }}>
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
