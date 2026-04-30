'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const navLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const nav = navRef.current;
            if (!nav) return;

            setScrolled(currentY > 60);

            // The pill remains sticky and shrinks via the 'nav-scrolled' CSS class toggle.
            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate mobile overlay open/close
    useEffect(() => {
        const overlay = overlayRef.current;
        const links = navLinksRef.current?.querySelectorAll('.mobile-nav-item');
        if (!overlay) return;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.set(overlay, { display: 'flex' });
            gsap.fromTo(overlay,
                { opacity: 0, backdropFilter: 'blur(0px)' },
                { opacity: 1, backdropFilter: 'blur(24px)', duration: 0.5, ease: 'power3.out' }
            );
            if (links) {
                gsap.fromTo(links,
                    { y: 60, opacity: 0, rotateX: -20 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.15 }
                );
            }
        } else {
            document.body.style.overflow = '';
            gsap.to(overlay, {
                opacity: 0, duration: 0.4, ease: 'power3.in',
                onComplete: () => { gsap.set(overlay, { display: 'none' }); }
            });
        }
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav
                ref={navRef}
                className={`main-nav${scrolled ? ' nav-scrolled' : ''}`}
                aria-label="Main Navigation"
            >
                <div className="nav-pill">
                    {/* Logo */}
                    <Link href="/" className="nav-logo-link" onClick={closeMenu}>
                        <img src="/pilaglogo.png" className="logo" alt="PILAG Foundation" />
                    </Link>

                    {/* Desktop Links */}
                    <ul className="nav-links desktop-only" role="list">
                        <li><Link href="/about" className="nav-link-item">About</Link></li>
                        <li><Link href="/impact" className="nav-link-item">Impact</Link></li>
                        <li><Link href="/drives" className="nav-link-item">Drives</Link></li>
                    </ul>

                    {/* Desktop CTA */}
                    <Link
                        href="/support"
                        className="nav-cta-btn desktop-only btn-magnetic"
                        id="nav-dynamic-cta"
                    >
                        Support Us
                    </Link>

                    {/* Hamburger */}
                    <button
                        className={`nav-hamburger mobile-only${isOpen ? ' is-open' : ''}`}
                        onClick={() => setIsOpen(v => !v)}
                        aria-label="Toggle Navigation"
                        aria-expanded={isOpen}
                    >
                        <span className="ham-bar ham-bar--top"></span>
                        <span className="ham-bar ham-bar--mid"></span>
                        <span className="ham-bar ham-bar--bot"></span>
                    </button>
                </div>
            </nav>

            {/* Fullscreen Mobile Overlay */}
            <div ref={overlayRef} className="mobile-overlay" style={{ display: 'none' }} aria-hidden={!isOpen}>
                <div className="mobile-overlay-bg"></div>
                <div ref={navLinksRef} className="mobile-nav-inner">
                    <div className="mobile-nav-eyebrow">Navigation</div>
                    {[
                        { href: '/about', label: 'About', num: '01' },
                        { href: '/impact', label: 'Impact', num: '02' },
                        { href: '/drives', label: 'Drives', num: '03' },
                        { href: '/support', label: 'Support Us', num: '04' },
                    ].map(({ href, label, num }) => (
                        <Link
                            key={href}
                            href={href}
                            className="mobile-nav-item"
                            onClick={closeMenu}
                        >
                            <span className="mobile-nav-num">{num}</span>
                            <span className="mobile-nav-label">{label}</span>
                            <span className="mobile-nav-arrow">→</span>
                        </Link>
                    ))}
                    <div className="mobile-overlay-footer">
                        <span>PILAG Foundation — People&apos;s Initiative for Local Administration and Governance</span>
                    </div>
                </div>
            </div>
        </>
    );
}
