'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // ─── 1. Lenis Smooth Scroll ───
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ─── 2. Magnetic Buttons ───
    const magneticItems = document.querySelectorAll('.btn-magnetic');
    
    magneticItems.forEach((item) => {
        item.addEventListener('mousemove', (e: any) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
