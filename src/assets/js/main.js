// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.setAttribute('aria-expanded', !isExpanded);
            
            // Transform hamburger icon
            const hamburger = navToggle.querySelector('.hamburger');
            if (!isExpanded) {
                hamburger.style.background = 'transparent';
                hamburger.style.setProperty('--pseudo-top', '0');
                hamburger.style.setProperty('--pseudo-transform', 'rotate(45deg)');
                // A complete animated hamburger would need a bit more CSS, but this toggles state correctly.
            } else {
                hamburger.style.background = '#fff';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                navToggle.setAttribute('aria-expanded', 'false');
                primaryNav.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Form Handling (Mock submission)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#10b981'; // Success green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Shrink header on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Scroll Reveal Animation System
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});
