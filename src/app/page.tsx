"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Preloader from '../components/home/Preloader';
import HeroSection from '../components/hero/HeroSection';
import PinnedEditorial from '../components/home/PinnedEditorial';
import MuseumDrives from '../components/home/MuseumDrives';
import ImpactStrip from '../components/home/ImpactStrip';
import ConversionSection from '../components/home/ConversionSection';
import TrustSection from '../components/home/TrustSection';
import CommunitySection from '../components/home/CommunitySection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Prep nav for preloader
        document.body.style.overflow = 'hidden';
        const navEl = document.querySelector('.main-nav');
        if (navEl) gsap.set(navEl, { autoAlpha: 0, y: -24 });

        // Delayed recalculation to ensure all pinned sections calculate in sequence
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => clearTimeout(timeout);
    }, { scope: containerRef });

    const handlePreloaderComplete = () => {
        document.body.style.overflow = 'auto';
        const nav = document.querySelector('.main-nav');
        if (nav) {
            gsap.to(nav, { autoAlpha: 1, y: 0, duration: 1.0, delay: 0.25, ease: 'power3.out' });
        }
        ScrollTrigger.refresh();
    };

    return (
        <div ref={containerRef}>
            <Preloader onComplete={handlePreloaderComplete} />
            <main id="smooth-wrapper">
                <div id="smooth-content">
                    <HeroSection />
                    <PinnedEditorial />
                    <MuseumDrives />
                    <ImpactStrip />
                    <ConversionSection />
                    <TrustSection />
                    <CommunitySection />
                    <FinalCTA />
                </div>
            </main>
        </div>
    );
}
