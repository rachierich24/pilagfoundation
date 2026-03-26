/**
 * animations.js - Extreme GSAP Engine (Lando Norris Inspired)
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    initPreloaderSequence();
});

function initPreloaderSequence() {
    // If no preloader exists (e.g. on sub-pages like about.html), skip straight to scroll logic
    if(!document.querySelector('.preloader')) {
        initScrollTriggers();
        return;
    }

    const tl = gsap.timeline({
        onComplete: () => {
            initScrollTriggers();
            document.body.style.overflow = 'auto'; // Re-enable scroll
            gsap.to('.main-nav', { autoAlpha: 1, duration: 0.5 });
        }
    });

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';
    gsap.set('.main-nav', { autoAlpha: 0 });

    // 1. Reveal "IMPACT" text up from mask
    tl.to('.preloader-text', {
        y: '0%', duration: 1, ease: 'power4.out', delay: 0.2
    })
    // 2. Hold momentarily
    .to({}, {duration: 0.5})
    // 3. Drop text down
    .to('.preloader-text', {
        y: '100%', duration: 0.8, ease: 'power4.in'
    })
    // 4. Split the doors open (Lando style)
    .to('.split-left', {
        x: '-100%', duration: 1.2, ease: 'power4.inOut'
    }, 'split')
    .to('.split-right', {
        x: '100%', duration: 1.2, ease: 'power4.inOut'
    }, 'split')
    .to(['.split-left', '.split-right'], {
        autoAlpha: 0, duration: 0.01
    }, 'split+=1.2')
    // 5. Fade out preloader background
    .to('.preloader', {
        autoAlpha: 0, duration: 0.5
    }, 'split+=0.5');
}

function initScrollTriggers() {
    
    // --- 1. Pinned Mask Reveal Hero --- 
    const heroSection = document.getElementById('hero-pin-trigger');
    const heroMaskImg = document.getElementById('hero-mask-img');
    
    if (heroSection && heroMaskImg) {
        // Pin the entire hero section so the user scrolls to 'open' the image over the text
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: '+=150%', // Pin for 1.5x viewport height
                scrub: true,
                pin: true
            }
        });

        // The image starts like a slit (30vw x 40vh) and grows to fill the entire screen (100vw, 100vh)
        heroTl.to(heroMaskImg, {
            width: '100vw',
            height: '100vh',
            ease: 'none'
        });
    }

    // --- 2. Infinite Continuous Marquee ---
    const marqueeTrack = document.getElementById('marquee-1');
    if (marqueeTrack) {
        // Move horizontally cleanly by 50% of the track (assuming duplicated content)
        gsap.to(marqueeTrack, {
            xPercent: -50,
            ease: "none",
            duration: 15,
            repeat: -1
        });
    }

    // --- 3. Scrub Text Fill Reveal ---
    const scrubContainer = document.getElementById('scrub-container-1');
    const scrubFill = document.getElementById('scrub-fill-1');
    
    if (scrubContainer && scrubFill) {
        // Image unmasking effect but applied to text color (via clip-path)
        gsap.to(scrubFill, {
            clipPath: 'inset(0 0% 0 0)', // End fully revealed to the right
            ease: 'none',
            scrollTrigger: {
                trigger: scrubContainer,
                start: 'top 80%', // Start filling when text hits bottom 20% of screen
                end: 'top 30%',   // Finish filling when it hits top 30%
                scrub: true
            }
        });
    }

    // --- 4. Extreme Floating Parallax Scatter ---
    const rapidImages = document.querySelectorAll('.parallax-rapid');
    rapidImages.forEach(img => {
        const speed = parseFloat(img.getAttribute('data-speed')) || 1;
        gsap.to(img, {
            y: () => `${-100 * speed}px`,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // --- 5. Nav Blend Mode Toggle on scroll ---
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                // If past hero, make it solid so it's readable
                nav.classList.add('scrolled');
            } else {
                // In hero, let the mix-blend-mode shine
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- 6. Base Elegance Fades (for sub-pages) ---
    const fadeUps = document.querySelectorAll('.gs-fade-up');
    if (fadeUps.length > 0) {
        fadeUps.forEach(elem => {
            gsap.fromTo(elem,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    // --- 7. Pinned Crossfade Gallery (The Apple-Style Sequence) ---
    const pinnedSection = document.getElementById('pinned-quotes');
    const pinnedSlides = gsap.utils.toArray('.pinned-slide');
    
    if (pinnedSection && pinnedSlides.length > 0) {
        // Init first slide visibility
        gsap.set(pinnedSlides[0], { autoAlpha: 1 });
        gsap.set(pinnedSlides[0].querySelector('.pinned-content'), { y: 0, autoAlpha: 1 });

        // Create master pinning timeline spanning 3x window height
        const crossfadeTl = gsap.timeline({
            scrollTrigger: {
                trigger: pinnedSection,
                start: "top top",
                end: "+=300%", // Scroll distance for 3 slides
                scrub: 1, // Smooth dragging
                pin: true
            }
        });

        // Chain the animations sequentially
        pinnedSlides.forEach((slide, i) => {
            if (i === 0) return; // Skip slide 1 since it's the starting state

            const prevSlide = pinnedSlides[i - 1];
            const prevContent = prevSlide.querySelector('.pinned-content');
            const currentBg = slide.querySelector('.pinned-bg');
            const currentContent = slide.querySelector('.pinned-content');

            crossfadeTl
                // Wait briefly
                .to({}, { duration: 0.5 })
                // Fade out previous content (slides up)
                .to(prevContent, { y: -50, autoAlpha: 0, duration: 0.8 }, "transition" + i)
                // Fade in current slide background smoothly over previous while bumping zIndex
                .to(slide, { autoAlpha: 1, zIndex: i + 5, duration: 1 }, "transition" + i)
                // Slow zoom out on current background as it fades in
                .to(currentBg, { scale: 1, duration: 1.5, ease: "power1.out" }, "transition" + i)
                // Drop in current content
                .to(currentContent, { y: 0, autoAlpha: 1, duration: 0.8 }, "transition" + i + "+=0.3")
                // Fade out the previous slide's wrapper completely to prevent DOM stacking issues
                .to(prevSlide, { autoAlpha: 0, duration: 0.1 }, "transition" + i + "+=1.5");
        });
    }

    // --- 8. Horizontal Museum Scroll Segment ---
    const horizontalWrapper = document.getElementById('horizontal-wrapper');
    const horizontalContainer = document.getElementById('horizontal-container');

    if (horizontalWrapper && horizontalContainer) {
        // Calculate the total scroll distance (container width minus viewport width)
        // 300vw container minus 100vw viewport = 200vw of scrollable track
        let scrollWidth = horizontalContainer.offsetWidth - window.innerWidth;
        
        gsap.to(horizontalContainer, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalWrapper,
                pin: true,
                scrub: 1,
                start: "top top",
                // Keep the pin active for a distance proportional to the width to ensure smooth scrolling
                end: () => `+=${scrollWidth}`
            }
        });

        // Add extreme parallax to the images inside the horizontal scrolling track
        gsap.utils.toArray('.museum-card img').forEach(img => {
            gsap.fromTo(img, 
                { x: '-10vw' }, 
                { 
                    x: '10vw', 
                    ease: "none", 
                    scrollTrigger: {
                        trigger: horizontalWrapper,
                        start: "top top",
                        end: () => `+=${scrollWidth}`,
                        scrub: 1
                    }
                }
            );
        });
    }

    // --- 9. Impact Page: Savor.it Style Sticky Stack Cards ---
    const impactCards = gsap.utils.toArray('.impact-card');
    if (impactCards.length > 0) {
        impactCards.forEach((card, i) => {
            const bgImg = card.querySelector('.impact-bg-img');
            const clipTexts = card.querySelectorAll('.clip-mask-up');
            const fadeTexts = card.querySelectorAll('.fade-up-delay');

            // Set up a ScrollTrigger specifically for this card acting as a sticky pane
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top top", // When this card hits the top and sticks
                    end: "bottom top", 
                    scrub: true
                }
            })
            // Move the background image slightly UP (parallax) while the card itself is sticky,
            // to give movement even though the card is locked.
            .to(bgImg, { y: '-15%', ease: "none" });

            // Set up a separate trigger just for the entrance animations when the card slides into view
            ScrollTrigger.create({
                trigger: card,
                start: "top 70%", // Triggers as soon as the card starts sliding over the previous one
                onEnter: () => {
                    // Massive clip-path reveal for the Colossal Typography
                    if (clipTexts.length) {
                        gsap.to(clipTexts, {
                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            y: 0,
                            duration: 1.2,
                            stagger: 0.1,
                            ease: "power4.out"
                        });
                    }
                    if (fadeTexts.length) {
                        gsap.to(fadeTexts, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            delay: 0.4,
                            ease: "power3.out"
                        });
                    }
                },
                // Re-hide them if scrolling back up (optional, nice for replayability)
                onLeaveBack: () => {
                    gsap.to(clipTexts, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 50, duration: 0.5 });
                    gsap.to(fadeTexts, { opacity: 0, y: 30, duration: 0.5 });
                }
            });
        });
    }
}
