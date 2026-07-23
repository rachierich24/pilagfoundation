'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import '../../styles/sections/Navbar.css';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const navLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let scrollTimeout: ReturnType<typeof setTimeout>;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const currentY = window.scrollY;
                const nav = navRef.current;
                if (!nav) return;

                setScrolled(currentY > 40);
                lastScrollY.current = currentY;
            }, 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
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
                { opacity: 0 },
                { opacity: 1, duration: 0.45, ease: 'power3.out' }
            );
            if (links) {
                gsap.fromTo(links,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
                );
            }
        } else {
            document.body.style.overflow = '';
            gsap.to(overlay, {
                opacity: 0, duration: 0.35, ease: 'power3.in',
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
                    {/* Logo & Brand Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link href="/" className="nav-logo-link" onClick={closeMenu}>
                            <img src="/pilaglogo.png" className="logo" alt="PILAG Foundation" />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="nav-links desktop-only" role="list">
                        <li>
                            <Link href="/about" className={`nav-link-item${pathname === '/about' ? ' active' : ''}`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/impact" className={`nav-link-item${pathname === '/impact' ? ' active' : ''}`}>
                                Impact
                            </Link>
                        </li>
                        <li>
                            <Link href="/drives" className={`nav-link-item${pathname === '/drives' ? ' active' : ''}`}>
                                Drives
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop Action CTA Button */}
                    <Link
                        href="/support"
                        className="nav-cta-btn desktop-only"
                        id="nav-dynamic-cta"
                    >
                        <span>Support Us</span>
                        <HeartHandshake className="w-3.5 h-3.5" />
                    </Link>

                    {/* Hamburger Button for Mobile */}
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

            {/* Fullscreen Mobile Drawer Overlay */}
            <div ref={overlayRef} className="mobile-overlay" style={{ display: 'none' }} aria-hidden={!isOpen}>
                <div ref={navLinksRef} className="mobile-nav-inner">
                    <div className="mobile-nav-eyebrow">PILAG Foundation Navigation</div>
                    {[
                        { href: '/', label: 'Home', num: '01' },
                        { href: '/about', label: 'About PILAG', num: '02' },
                        { href: '/impact', label: 'Grassroots Impact', num: '03' },
                        { href: '/drives', label: 'Community Drives', num: '04' },
                        { href: '/support', label: 'Support Legal Defense', num: '05' },
                    ].map(({ href, label, num }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`mobile-nav-item${pathname === href ? ' active' : ''}`}
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
