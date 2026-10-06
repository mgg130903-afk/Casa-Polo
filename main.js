document.addEventListener('DOMContentLoaded', () => {
    // --- LIVE CLOCK & DATE ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const clockEl = document.getElementById('live-clock');
        const dateEl = document.getElementById('live-date');

        if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;

        if (dateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('es-MX', options);
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- AUTOMATED CAROUSEL SLIDER ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentSlide = 0;
    const SLIDE_INTERVAL = 6000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0');
                slide.classList.add('opacity-100');
            } else {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0');
            }
        });

        if (dotsContainer) {
            const dots = dotsContainer.children;
            Array.from(dots).forEach((dot, i) => {
                if (i === index) {
                    dot.className = "w-6 h-2.5 rounded-full bg-amberGold-400 transition-all duration-300";
                } else {
                    dot.className = "w-2.5 h-2.5 rounded-full bg-gray-600 transition-all duration-300";
                }
            });
        }
    }

    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, SLIDE_INTERVAL);
    }

    // --- FULLSCREEN LOGIC ---
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Pantalla completa no disponible: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFullscreen();
        });
    }

    // Double Click anywhere on screen to toggle Fullscreen
    let clickCount = 0;
    document.body.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
            toggleFullscreen();
            clickCount = 0;
        }
        setTimeout(() => { clickCount = 0; }, 400);
    });
});