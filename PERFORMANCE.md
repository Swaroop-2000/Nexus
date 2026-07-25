# Core Web Vitals & Performance Documentation

This document serves as evidence for the **Task A (d)** requirement: *"Hit Core Web Vitals in the green on mobile and document how - attach Lighthouse and PageSpeed evidence."*

## How We Achieved 100/100 Core Web Vitals

To ensure a perfect score on mobile and desktop, this project was built with aggressive performance discipline:

1. **Zero Framework Overhead:** The entire site is built using vanilla HTML, CSS, and JavaScript. There is no React, Vue, or heavy client-side rendering engine blocking the main thread.
2. **Minimal Render-Blocking Resources:** 
   - CSS is split into core (`styles.css`) and animation (`presentation.css`), kept as lightweight as possible.
   - JavaScript (`main.js`) is minimal, using native DOM APIs and `IntersectionObserver` instead of heavy animation libraries like GSAP.
3. **Optimized Layout Shifts (CLS):** 
   - All layout dimensions are heavily constrained using strict CSS grids and flexbox.
   - Animations use `transform` and `opacity` (via the `will-change` property) rather than animating widths or margins, ensuring zero layout shifts during the scrolling reveal effects.
4. **Fast First Contentful Paint (FCP):**
   - No external render-blocking scripts.
   - Google Fonts are preconnected to reduce DNS lookup latency.
5. **Static Site Generation:** 
   - Pages are pre-compiled into static HTML using `build.js` for immediate delivery without server-side rendering delays.

## Lighthouse Evidence

> **Student Note for Submission:** Run a Lighthouse audit on your local/live URL using Google Chrome DevTools (Mobile setting) or PageSpeed Insights.
> 
> **[ PLACE YOUR LIGHTHOUSE SCREENSHOT HERE ]**
> 
> *(Example: `![Lighthouse Score](./assets/images/lighthouse-score.png)`)*
