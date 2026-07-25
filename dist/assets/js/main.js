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
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-center-up');
    
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

    // Pricing Plan Toggle Logic
    const btnProf = document.getElementById('btn-prof');
    const btnEnt = document.getElementById('btn-ent');
    const cardProf = document.getElementById('card-prof');
    const cardEnt = document.getElementById('card-ent');

    if (btnProf && btnEnt && cardProf && cardEnt) {
        btnProf.addEventListener('click', () => {
            btnProf.classList.add('active');
            btnEnt.classList.remove('active');
            cardProf.classList.add('active-plan');
            cardEnt.classList.remove('active-plan');
        });
        
        btnEnt.addEventListener('click', () => {
            btnEnt.classList.add('active');
            btnProf.classList.remove('active');
            cardEnt.classList.add('active-plan');
            cardProf.classList.remove('active-plan');
        });
    }

    // Live Pricing Calculator Logic
    const calcTabProf = document.getElementById('calc-tab-prof');
    const calcTabEnt = document.getElementById('calc-tab-ent');
    const calcPriceProf = document.getElementById('calc-price-prof');
    const calcPriceEnt = document.getElementById('calc-price-ent');
    
    const sliderUsers = document.getElementById('calc-slider-users');
    const labelUsers = document.getElementById('calc-label-users');
    const sliderApi = document.getElementById('calc-slider-api');
    const labelApi = document.getElementById('calc-label-api');
    
    const totalMonthly = document.getElementById('calc-total-monthly');
    const totalPerUser = document.getElementById('calc-total-per-user');
    const totalAnnual = document.getElementById('calc-total-annual');
    
    // Breakdown elements
    const breakdownTitle = document.getElementById('breakdown-title');
    const breakdownText = document.getElementById('breakdown-text');
    const tcoText = document.getElementById('tco-text');
    
    if (calcTabProf && sliderUsers) {
        let currentCalcPlan = 'prof'; // 'prof' or 'ent'
        
        const updateCalculator = () => {
            const users = parseInt(sliderUsers.value);
            const apiLevel = parseInt(sliderApi.value);
            
            let apiCost = 0;
            let apiText = '1M';
            if(apiLevel === 2) { apiCost = 100; apiText = '5M'; }
            if(apiLevel === 3) { apiCost = 250; apiText = '10M'; }
            if(apiLevel === 4) { apiCost = 1000; apiText = '50M+'; }
            
            labelUsers.textContent = `USER SEATS: ${users}`;
            labelApi.textContent = `API VOLUME (MONTHLY): ${apiText}`;
            
            if (currentCalcPlan === 'prof') {
                const monthly = (users * 99) + apiCost;
                totalMonthly.textContent = `$${monthly.toLocaleString()}`;
                totalPerUser.textContent = `$${Math.round(monthly / users).toLocaleString()}`;
                totalAnnual.textContent = `$${(monthly * 12).toLocaleString()}/yr`;
                
                if (breakdownTitle && breakdownText && tcoText) {
                    const userTextUpper = users === 1 ? '1 USER' : `${users} USERS`;
                    const userTextLower = users === 1 ? '1 user' : `${users} users`;
                    breakdownTitle.innerHTML = `PROFESSIONAL &middot; PER SEAT &middot; ${userTextUpper}`;
                    breakdownText.innerHTML = `Base $99 per user &times; ${userTextLower}` + (apiCost > 0 ? ` + $${apiCost} API add-on` : '') + `<br>= <strong>$${monthly.toLocaleString()} / month</strong> &middot; billed annually`;
                    tcoText.innerHTML = `${userTextLower} &times; $99/mo` + (apiCost > 0 ? ` + API add-on` : '') + ` = $${(monthly * 12).toLocaleString()} annually<br>3-year Total Cost of Ownership: <strong>$${(monthly * 36).toLocaleString()}</strong>`;
                }
                
                calcTabProf.classList.add('active');
                calcTabEnt.classList.remove('active');
                calcPriceProf.classList.add('active');
                calcPriceEnt.classList.remove('active');
            } else {
                const monthly = 4999 + apiCost;
                totalMonthly.textContent = `$${monthly.toLocaleString()}`;
                totalPerUser.textContent = `Unlimited`;
                totalAnnual.textContent = `$${(monthly * 12).toLocaleString()}/yr`;
                
                if (breakdownTitle && breakdownText && tcoText) {
                    breakdownTitle.innerHTML = `ENTERPRISE &middot; SITE LICENSE &middot; UNLIMITED USERS`;
                    breakdownText.innerHTML = `Base $4,999 per month` + (apiCost > 0 ? ` + $${apiCost} API add-on` : '') + `<br>= <strong>$${monthly.toLocaleString()} / month</strong> &middot; billed annually`;
                    tcoText.innerHTML = `$4,999/mo` + (apiCost > 0 ? ` + API add-on` : '') + ` = $${(monthly * 12).toLocaleString()} annually<br>3-year Total Cost of Ownership: <strong>$${(monthly * 36).toLocaleString()}</strong>`;
                }
                
                calcTabEnt.classList.add('active');
                calcTabProf.classList.remove('active');
                calcPriceEnt.classList.add('active');
                calcPriceProf.classList.remove('active');
            }
        };
        
        calcTabProf.addEventListener('click', () => { currentCalcPlan = 'prof'; updateCalculator(); });
        calcTabEnt.addEventListener('click', () => { currentCalcPlan = 'ent'; updateCalculator(); });
        sliderUsers.addEventListener('input', updateCalculator);
        sliderApi.addEventListener('input', updateCalculator);
        
        updateCalculator(); // initialize values
    }
});
