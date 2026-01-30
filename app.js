// =============================================================================
// CLAIR OBSCUR: EXPEDITION 33 - MAIN APPLICATION SCRIPT
// =============================================================================

console.log('%c🎮 Clair Obscur: Expedition 33 - Guia Completo', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cBem-vindo(a) à expedição!', 'font-size: 14px; color: #c9a961;');

// =============================================================================
// NAVIGATION & SMOOTH SCROLL
// =============================================================================

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

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================

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

// =============================================================================
// PARALLAX & VISUAL EFFECTS
// =============================================================================

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

// =============================================================================
// HAMBURGER MENU
// =============================================================================

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.main-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// =============================================================================
// EASTER EGG - KONAMI CODE
// =============================================================================

let konamiCode = [];
const konamiSequence = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    // Normaliza a tecla para minúscula
    const key = e.key.toLowerCase();
    konamiCode.push(key);
    konamiCode = konamiCode.slice(-10);

    // Debug no console para ver as teclas
    console.log('Tecla pressionada:', key);
    console.log('Sequência atual:', konamiCode);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('🎉 KONAMI CODE ATIVADO!');
        activateSecretMode();
    }
});

function activateSecretMode() {

    document.body.style.animation = 'glowPulse 1s ease-in-out 3';


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


const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text small');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}


async function loadCollectibles() {
    try {
        const response = await fetch('playthrough.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const collectibles = Array.from(doc.querySelectorAll('.collectible[data-type]:not([data-type="trofeu"])')).map(el => ({
            id: el.id,
            name: el.textContent.trim(),
            type: el.dataset.type,
            chapter: el.dataset.chapter,
            map: el.dataset.map,
            icon: el.dataset.icon
        }));

        if (collectibles.length === 0) {
            document.getElementById('collectiblesContent').innerHTML = `
                <div class="empty-message">
                    Nenhum coletável encontrado ainda. Continue escrevendo a playthrough!
                </div>
            `;
            return;
        }

        const grouped = groupCollectibles(collectibles);
        renderCollectibles(grouped);
    } catch (error) {
        console.error('Erro ao carregar coletáveis:', error);
        document.getElementById('collectiblesContent').innerHTML = `
            <div class="empty-message">
                Erro ao carregar coletáveis. Verifique se a playthrough existe.
            </div>
        `;
    }
}


async function loadTrophies() {
    try {
        const response = await fetch('playthrough.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const trophies = Array.from(doc.querySelectorAll('.collectible[data-type="trofeu"]')).map(el => ({
            id: el.id,
            name: el.textContent.trim(),
            chapter: el.dataset.chapter,
            map: el.dataset.map,
            icon: el.dataset.icon
        }));

        if (trophies.length === 0) {
            document.getElementById('trophiesContent').innerHTML = `
                <div class="empty-message">
                    Nenhum troféu encontrado ainda. Continue escrevendo a playthrough!
                </div>
            `;
            return;
        }

        const grouped = groupTrophies(trophies);
        renderTrophies(grouped);
    } catch (error) {
        console.error('Erro ao carregar troféus:', error);
        document.getElementById('trophiesContent').innerHTML = `
            <div class="empty-message">
                Erro ao carregar troféus. Verifique se a playthrough existe.
            </div>
        `;
    }
}


async function loadAudios() {
    try {
        const response = await fetch('playthrough.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const audios = Array.from(doc.querySelectorAll('.collectible[data-type="audio"]')).map(el => ({
            id: el.id,
            name: el.textContent.trim(),
            chapter: el.dataset.chapter,
            map: el.dataset.map,
            icon: el.dataset.icon
        }));

        if (audios.length === 0) {
            document.getElementById('audiosContent').innerHTML = `
                <div class="empty-message">
                    Nenhum áudio de expedição encontrado ainda. Continue escrevendo a playthrough!
                </div>
            `;
            return;
        }

        const grouped = groupAudios(audios);
        renderAudios(grouped);
    } catch (error) {
        console.error('Erro ao carregar áudios:', error);
        document.getElementById('audiosContent').innerHTML = `
            <div class="empty-message">
                Erro ao carregar áudios. Verifique se a playthrough existe.
            </div>
        `;
    }
}


async function loadCDs() {
    try {
        const response = await fetch('playthrough.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const cds = Array.from(doc.querySelectorAll('.collectible[data-type="cd"]')).map(el => ({
            id: el.id,
            name: el.textContent.trim(),
            chapter: el.dataset.chapter,
            map: el.dataset.map,
            icon: el.dataset.icon
        }));

        if (cds.length === 0) {
            document.getElementById('cdsContent').innerHTML = `
                <div class="empty-message">
                    Nenhum CD de música encontrado ainda. Continue escrevendo a playthrough!
                </div>
            `;
            return;
        }

        const grouped = groupCDs(cds);
        renderCDs(grouped);
    } catch (error) {
        console.error('Erro ao carregar CDs:', error);
        document.getElementById('cdsContent').innerHTML = `
            <div class="empty-message">
                Erro ao carregar CDs. Verifique se a playthrough existe.
            </div>
        `;
    }
}



function groupCollectibles(items) {
    const grouped = {};
    items.forEach(item => {
        if (!grouped[item.chapter]) grouped[item.chapter] = {};
        if (!grouped[item.chapter][item.map]) grouped[item.chapter][item.map] = [];
        grouped[item.chapter][item.map].push(item);
    });
    return grouped;
}

function groupTrophies(items) {
    return groupCollectibles(items);
}

function groupAudios(items) {
    return groupCollectibles(items);
}

function groupCDs(items) {
    return groupCollectibles(items);
}


function formatChapterName(chapter) {
    const names = {
        'prologo': 'Prólogo',
        'ato1': 'Ato 1',
        'ato2': 'Ato 2',
        'ato3': 'Ato 3'
    };
    return names[chapter] || chapter;
}

function formatMapName(map) {
    const mapNames = {
        'lumiere': 'Lumière',
        'prados-primaveris-parte-1': 'Prados Primaveris Parte 1'
    };
    return mapNames[map] || map.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatTypeName(type) {
    const names = {
        'missao': 'Item de Missão',
        'chromas': 'Chromas',
        'pictos': 'Picto',
        'luminas': 'Ponto de Lúmina',
        'equipamento': 'Equipamento',
        'interativo': 'Interativo'
    };
    return names[type] || type;
}


function renderCollectibles(grouped) {
    const container = document.getElementById('collectiblesContent');
    let html = '';

    for (const [chapter, maps] of Object.entries(grouped)) {
        html += `<div class="chapter-section">`;
        html += `<h2 class="chapter-title">${formatChapterName(chapter)}</h2>`;

        for (const [map, items] of Object.entries(maps)) {
            html += `<div class="map-group">`;
            html += `<h3 class="map-title">${formatMapName(map)}</h3>`;
            html += `<div class="collectible-list">`;

            items.forEach(item => {
                html += `
                    <div class="collectible-item" id="${item.id}">
                        <div class="collectible-icon">${item.icon}</div>
                        <div class="collectible-info">
                            <div class="collectible-name">${item.name}</div>
                            <div class="collectible-type">${formatTypeName(item.type)}</div>
                        </div>
                        <a href="playthrough.html#${item.id}" class="collectible-link">Ver na Playthrough →</a>
                    </div>
                `;
            });

            html += `</div></div>`;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}

function renderTrophies(grouped) {
    const container = document.getElementById('trophiesContent');
    let html = '';

    for (const [chapter, maps] of Object.entries(grouped)) {
        html += `<div class="chapter-section">`;
        html += `<h2 class="chapter-title">${formatChapterName(chapter)}</h2>`;

        for (const [map, items] of Object.entries(maps)) {
            html += `<div class="map-group">`;
            html += `<h3 class="map-title">${formatMapName(map)}</h3>`;
            html += `<div class="trophy-list">`;

            items.forEach(item => {
                html += `
                    <div class="trophy-item" id="${item.id}">
                        <div class="trophy-icon">${item.icon}</div>
                        <div class="trophy-info">
                            <div class="trophy-name">${item.name}</div>
                            <div class="trophy-type">Troféu</div>
                        </div>
                        <a href="playthrough.html#${item.id}" class="trophy-link">Ver na Playthrough →</a>
                    </div>
                `;
            });

            html += `</div></div>`;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}

function renderAudios(grouped) {
    const container = document.getElementById('audiosContent');
    let html = '';

    for (const [chapter, maps] of Object.entries(grouped)) {
        html += `<div class="chapter-section">`;
        html += `<h2 class="chapter-title">${formatChapterName(chapter)}</h2>`;

        for (const [map, items] of Object.entries(maps)) {
            html += `<div class="map-group">`;
            html += `<h3 class="map-title">${formatMapName(map)}</h3>`;
            html += `<div class="audio-list">`;

            items.forEach(item => {
                html += `
                    <div class="audio-item" id="${item.id}">
                        <div class="audio-icon">${item.icon}</div>
                        <div class="audio-info">
                            <div class="audio-name">${item.name}</div>
                            <div class="audio-type">Áudio de Expedição</div>
                        </div>
                        <a href="playthrough.html#${item.id}" class="audio-link">Ver na Playthrough →</a>
                    </div>
                `;
            });

            html += `</div></div>`;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}

function renderCDs(grouped) {
    const container = document.getElementById('cdsContent');
    let html = '';

    for (const [chapter, maps] of Object.entries(grouped)) {
        html += `<div class="chapter-section">`;
        html += `<h2 class="chapter-title">${formatChapterName(chapter)}</h2>`;

        for (const [map, items] of Object.entries(maps)) {
            html += `<div class="map-group">`;
            html += `<h3 class="map-title">${formatMapName(map)}</h3>`;
            html += `<div class="cd-list">`;

            items.forEach(item => {
                html += `
                    <div class="cd-item" id="${item.id}">
                        <div class="cd-icon">${item.icon}</div>
                        <div class="cd-info">
                            <div class="cd-name">${item.name}</div>
                            <div class="cd-type">CD de Música</div>
                        </div>
                        <a href="playthrough.html#${item.id}" class="cd-link">Ver na Playthrough →</a>
                    </div>
                `;
            });

            html += `</div></div>`;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}


function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.style.animation = 'highlight-pulse 2s ease-in-out';
            }
        }, 800);
    }
}


document.addEventListener('DOMContentLoaded', async () => {

    if (document.getElementById('collectiblesContent')) {
        await loadCollectibles();
        handleHashNavigation();
    }

    if (document.getElementById('trophiesContent')) {
        await loadTrophies();
        handleHashNavigation();
    }

    if (document.getElementById('audiosContent')) {
        await loadAudios();
        handleHashNavigation();
    }

    if (document.getElementById('cdsContent')) {
        await loadCDs();
        handleHashNavigation();
    }
});