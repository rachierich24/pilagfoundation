/**
 * upgrade.js — Premium cinematic enhancement script
 * ADDITIVE ONLY — extends animations.js without modifying it
 * Call initPremiumUpgrade() after DOMContentLoaded
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    // ── 1. Custom Cursor ────────────────────────────────
    const cursor = document.getElementById('eco-cursor');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.3, ease: 'power3.out' });
        });
        document.querySelectorAll('a, button, .donation-card, .testimonial-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // ── 2. Scroll Progress Bar ─────────────────────────
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ── 3. Enhanced Preloader: Blur→Sharp + Progress ──
    const preloaderText = document.querySelector('.preloader-text');
    const progressFill = document.querySelector('.preloader-progress-fill');
    const pctLabel = document.querySelector('.preloader-pct');
    if (preloaderText && progressFill) {
        let pct = 0;
        const counter = setInterval(() => {
            pct += Math.floor(Math.random() * 15) + 5;
            if (pct >= 100) { pct = 100; clearInterval(counter); }
            progressFill.style.width = pct + '%';
            if (pctLabel) pctLabel.textContent = pct + '%';
        }, 100);
        // Blur to sharp on text reveal
        setTimeout(() => preloaderText.classList.add('sharp'), 250);
    }

    // ── 4. Navbar: Dynamic CTA + Backdrop Blur ────────
    const nav = document.querySelector('.main-nav');
    const dynamicCTA = document.querySelector('.nav-dynamic-cta');
    const ctaTexts = ['Join Movement', 'See Impact', 'Donate Now'];
    const ctaLinks = ['#volunteer', '#trust-section', 'support.html'];
    if (nav && dynamicCTA) {
        const updateCTASection = () => {
            const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            let idx = 0;
            if (scrollRatio > 0.6) idx = 2;
            else if (scrollRatio > 0.3) idx = 1;
            if (dynamicCTA.textContent !== ctaTexts[idx]) {
                gsap.to(dynamicCTA, { opacity: 0, y: -5, duration: 0.2, onComplete: () => {
                    dynamicCTA.textContent = ctaTexts[idx];
                    dynamicCTA.href = ctaLinks[idx];
                    gsap.to(dynamicCTA, { opacity: 1, y: 0, duration: 0.3 });
                }});
            }
            // Backdrop blur
            if (window.scrollY > 80) nav.classList.add('scrolled-mid');
            else nav.classList.remove('scrolled-mid');
        };
        window.addEventListener('scroll', updateCTASection, { passive: true });
    }

    // ── 5. Marquee Speed Linked to Scroll ─────────────
    const marqueeTrack = document.getElementById('marquee-1');
    if (marqueeTrack) {
        let lastY = 0, marqueeSpeed = 15;
        const marqueeAnim = gsap.to(marqueeTrack, { xPercent: -50, ease: 'none', duration: marqueeSpeed, repeat: -1 });
        window.addEventListener('scroll', () => {
            const delta = Math.abs(window.scrollY - lastY);
            lastY = window.scrollY;
            const speed = gsap.utils.clamp(5, 15, marqueeSpeed - delta * 0.15);
            marqueeAnim.timeScale(15 / speed);
        }, { passive: true });
    }

    // ── 6. Donation Card Selection ────────────────────
    document.querySelectorAll('.donation-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.donation-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const amt = card.getAttribute('data-amount');
            const donateBtn = document.querySelector('.btn-donate');
            if (donateBtn && amt) donateBtn.href = 'support.html?amount=' + amt;
        });
    });
    // Select first by default
    const firstCard = document.querySelector('.donation-card');
    if (firstCard) firstCard.classList.add('selected');

    // ── 7. Count-up for Impact Stats ──────────────────
    document.querySelectorAll('.impact-stat-number[data-target]').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        gsap.from({ val: 0 }, {
            val: target, duration: 2, ease: 'power3.out',
            snap: { val: 1 },
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
            onUpdate: function() { el.textContent = Math.round(this.targets()[0].val).toLocaleString() + suffix; }
        });
    });

    // ── 8. Trust Bar Animations ────────────────────────
    document.querySelectorAll('.trust-bar-fill').forEach(bar => {
        const targetW = bar.getAttribute('data-width') || '0%';
        gsap.to(bar, {
            width: targetW, duration: 1.8, ease: 'power3.out',
            scrollTrigger: { trigger: bar.closest('.trust-bar-item'), start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // ── 9. Community Grid Stagger Reveal ──────────────
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } }
        );
    });

    // ── 10. Final CTA Sequential Text Reveal ──────────
    const ctaLines = document.querySelectorAll('.cta-line');
    const ctaButtons = document.querySelector('.final-cta-buttons');
    if (ctaLines.length > 0) {
        const ctaTl = gsap.timeline({
            scrollTrigger: { trigger: '.final-cta-section', start: 'top 60%', toggleActions: 'play none none none' }
        });
        ctaLines.forEach((line, i) => {
            ctaTl.add(() => line.classList.add('revealed'), i * 0.4);
        });
        ctaTl.add(() => { if (ctaButtons) ctaButtons.classList.add('visible'); }, ctaLines.length * 0.4 + 0.3);
    }

    // ── 11. Fade-up for New Sections ──────────────────
    gsap.utils.toArray('.gs-fade-up-new').forEach(el => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
        );
    });
});
