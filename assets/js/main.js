/**
 * TENUTA CHEVALIER - MAIN JAVASCRIPT
 * Mobile navigation, lightbox, scroll animations, active nav states
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initScrollEffects();
    initActiveNav();
    initLightbox();
    initScrollAnimations();
});

/* ---- Mobile Navigation ---- */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (!hamburger || !mobileNav) return;

    function openMenu() {
        hamburger.classList.add('active');
        mobileNav.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function() {
        if (mobileNav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
}

/* ---- Scroll Effects (Navbar) ---- */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
}

/* ---- Active Navigation State ---- */
function initActiveNav() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'home.html';

    const allLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    allLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'home.html')) {
            link.classList.add('active');
        }
    });
}

/* ---- Lightbox ---- */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<button class="lightbox-close">&times;</button><img src="" alt="Gallery image">';
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(function() {
            lightboxImg.src = '';
        }, 300);
    }

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
}

/* ---- Scroll Reveal Animations ---- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
}

