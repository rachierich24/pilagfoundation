import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
    onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prgCounter = useRef({ value: 0 });

    useEffect(() => {
        // Fail-safe: Forcefully hide the preloader after 5 seconds if it gets stuck
        const timeout = setTimeout(() => {
            if (containerRef.current && getComputedStyle(containerRef.current).display !== 'none') {
                console.warn('Preloader fail-safe triggered after 5s.');
                containerRef.current.style.opacity = '0';
                setTimeout(() => {
                    if (containerRef.current) containerRef.current.style.display = 'none';
                    if (onComplete) onComplete();
                }, 500);
            }
        }, 5000);
        return () => clearTimeout(timeout);
    }, [onComplete]);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (containerRef.current) {
                    gsap.to(containerRef.current, {
                        autoAlpha: 0, duration: 0.5, onComplete: () => {
                            containerRef.current!.style.display = 'none';
                            containerRef.current!.style.willChange = 'auto';
                        }
                    });
                }
                if (onComplete) onComplete();
            }
        });

        // Preloader progress counter
        const pctEl = document.querySelector('.preloader-pct');
        const fillEl = document.querySelector('.preloader-progress-fill') as HTMLElement;
        
        tl.to('.preloader-text', { opacity: 1, y: -8, duration: 2.2, ease: 'power2.out' }, 0.4);

        // Subtle breathing for the logo
        gsap.to('.preloader-text', { scale: 1.03, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        tl.to(prgCounter.current, {
            value: 100, duration: 3.0, ease: 'expo.inOut',
            onUpdate: () => {
                const pct = Math.floor(prgCounter.current.value);
                if (pctEl) pctEl.textContent = `${pct.toString().padStart(3, '0')}`;
                if (fillEl) fillEl.style.width = `${pct}%`;
            }
        }, 0);

        tl.to('.preloader-text', { opacity: 0, scale: 1.1, duration: 0.7, ease: 'power2.inOut' }, '+=0.3')
            .to('.preloader-pct-wrapper', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.5')
            .to('.preloader', {
                clipPath: 'circle(0% at 50% 50%)',
                duration: 1.2,
                ease: 'power3.inOut',
            }, '+=0.1')
            .to('.preloader', {
                opacity: 0,
                duration: 0.4
            }, '+=0');

    }, { scope: containerRef });

    return (
        <div className="preloader" ref={containerRef}>
            <div className="preloader-noise"></div>
            <div className="preloader-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                <div className="preloader-track">
                    <span className="preloader-text">PILAG</span>
                </div>
                <div className="preloader-pct-wrapper">
                    <div className="preloader-pct">000</div>
                    <div className="preloader-progress-bar-bg">
                        <div className="preloader-progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
