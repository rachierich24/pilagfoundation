'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Make the Lenis instance accessible globally so page-level
// ScrollTrigger setups can hook into it after mount.
declare global {
  interface Window { __lenis?: Lenis; }
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ─── 1. Lenis Smooth Scroll ─────────────────────────────────
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

    // Store globally so page-level ScrollTrigger can reference it
    window.__lenis = lenis;

    // ─── 2. Lenis → ScrollTrigger proxy ────────────────────────
    // Lenis 1.x does NOT update window.scrollY — we must proxy it.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0, left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    // Emit scroll so ScrollTrigger re-computes positions on every Lenis tick
    lenis.on('scroll', () => ScrollTrigger.update());

    // Sync Lenis RAF with GSAP ticker (single animation loop)
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ST after proxy is ready
    ScrollTrigger.refresh();

    // ─── 3. Scroll Progress Bar ─────────────────────────────────
    if (document.querySelector('#scroll-progress-bar')) {
      gsap.to('#scroll-progress-bar', {
        width: '100%', ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          scroller: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    // ─── 4. Magnetic Buttons ────────────────────────────────────
    const magneticItems = document.querySelectorAll('.btn-magnetic');
    magneticItems.forEach((item) => {
      item.addEventListener('mousemove', (e: any) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(item, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power2.out' });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.scrollerProxy(document.documentElement, {} as any); // reset proxy
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
