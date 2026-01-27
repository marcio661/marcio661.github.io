// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for anchor links
        if (href.startsWith('#')) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Smooth scroll to section
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Card link smooth scroll
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation on scroll
document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Parallax effect for background
let lastScrollTop = 0;
const backgroundTexture = document.querySelector('.background-texture');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollSpeed = 0.3;

    if (backgroundTexture) {
        backgroundTexture.style.transform = `translateY(${scrollTop * scrollSpeed}px)`;
    }

    lastScrollTop = scrollTop;
});

// Add hover effect sound feedback (visual only, no actual sound)
document.querySelectorAll('.info-card, .nav-link').forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text small');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Ornamental corner glow animation on scroll
let ticking = false;

function updateCornerGlow() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const corners = document.querySelectorAll('.frame-corner');

    corners.forEach((corner, index) => {
        const baseOpacity = 0.4;
        const glowIntensity = baseOpacity + (scrollPercentage / 100) * 0.3;
        corner.style.opacity = glowIntensity;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateCornerGlow();
        });
        ticking = true;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateSecretMode();
    }
});

function activateSecretMode() {
    // Add special visual effect
    document.body.style.animation = 'glowPulse 1s ease-in-out 3';

    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = '✨ Expedição Secreta Desbloqueada! ✨';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(139, 115, 85, 0.95));
        color: #0d0d0f;
        padding: 2rem 3rem;
        border-radius: 8px;
        font-family: var(--font-display);
        font-size: 1.5rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(212, 175, 55, 0.8);
        animation: fadeIn 0.5s ease-out;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeIn 0.5s ease-out reverse';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Initialize
console.log('%c🎮 Clair Obscur: Expedition 33 - Guia Completo', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cBem-vindo(a) à expedição!', 'font-size: 14px; color: #c9a961;');