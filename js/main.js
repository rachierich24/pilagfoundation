/**
 * main.js - Core UI Interactions, Custom Cursor, Magnetic Effects, Text Splitting
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove loading class after a brief delay for initial renders
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);

    // 2. Custom Cursor Logic
    initCustomCursor();

    // 3. Magnetic Hover Effects
    initMagneticElements();

    // 4. Parallax Tracker (for elements tracking mouse but not magnetic)
    initPerspectiveHover();

    // 5. Text Splitting for GSAP
    splitTextElements();
});

/**
 * Custom Cursor Tracker
 */
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    // Performance optimized cursor tracking using requestAnimationFrame
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth trailing ring
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const render = () => {
        // Dot follows exactly
        if (cursorDot) {
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }

        // Ring follows with easing (Lerp)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        if (cursorRing) {
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(render);
    };
    render();

    // Add hover states to interactive elements
    const interactives = document.querySelectorAll('a, button, .magnetic-btn, .interactive-hover');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

/**
 * Magnetic button hover effects
 * Elements pull towards the cursor when hovered
 */
function initMagneticElements() {
    const magneticItems = document.querySelectorAll('.magnetic-btn, .magnetic-icon, .magnetic');
    
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const bound = item.getBoundingClientRect();
            // Get center of element
            const cx = bound.left + bound.width / 2;
            const cy = bound.top + bound.height / 2;
            
            // Calculate distance from center to mouse
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            
            // Magnetism strength (movement limits)
            const strength = parseFloat(item.getAttribute('data-movement')) || 20;
            
            // Move item towards mouse
            gsap.to(item, {
                x: (dx / bound.width) * strength,
                y: (dy / bound.height) * strength,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            // Reset position
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * Perspective 3D Tilt on Hover for Cards/Icons
 */
function initPerspectiveHover() {
    const tiltItems = document.querySelectorAll('.perspective-hover, [data-tilt]');
    
    tiltItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const bound = item.getBoundingClientRect();
            const cx = bound.left + bound.width / 2;
            const cy = bound.top + bound.height / 2;
            
            // Calculate relative mouse position (-1 to 1)
            const xVal = (e.clientX - cx) / (bound.width / 2);
            const yVal = (e.clientY - cy) / (bound.height / 2);
            
            const maxTilt = 15; // degrees
            
            gsap.to(item, {
                rotationX: -yVal * maxTilt, // Inverted Y for natural tilt
                rotationY: xVal * maxTilt,
                transformPerspective: 1000,
                ease: 'power1.out',
                duration: 0.5
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotationX: 0,
                rotationY: 0,
                ease: 'elastic.out(1, 0.3)',
                duration: 1
            });
        });
    });
}

/**
 * Custom logic to split text into chars or words for GSAP animations
 * avoiding the need for the paid SplitText plugin.
 */
function splitTextElements() {
    const elements = document.querySelectorAll('.split-text');
    
    elements.forEach(el => {
        const type = el.getAttribute('data-split'); // 'chars' or 'words'
        const text = el.innerText;
        el.innerHTML = ''; // clear
        
        if (type === 'chars') {
            const chars = text.split('');
            chars.forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                el.appendChild(span);
            });
        } else if (type === 'words') {
            const words = text.split(' ');
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                // Internal wrapper for overflow hiding animations
                span.innerHTML = `<span class="word-inner" style="display:inline-block">${word}</span>`;
                el.appendChild(span);
                if (index < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });
        }
        
        // Remove the zero-opacity hiding class now that it's split
        el.style.opacity = 1;
    });
}
