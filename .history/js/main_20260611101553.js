document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. القائمة المتنقلة (Mobile Menu)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('mobileOverlay');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    hamburger?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = e.target.closest('li').querySelector('.mobile-dropdown');
            dropdown?.classList.toggle('active');
            e.target.classList.toggle('active');
        });
    });

    // ==========================================
    // 2. السلايدر (Swiper) - زي ما كان بالظبط
    // ==========================================
    const slidesData = [
        { img: 'img/gallery/gallery01.jpg', title: 'CYBER WARRIOR', rate: 'RATE 72%' },
        { img: 'img/gallery/gallery02.jpg', title: "ASSASSIN'S CREED", rate: 'RATE 65%' },
        { img: 'img/gallery/gallery03.jpg', title: 'DARK FANTASY', rate: 'RATE 80%' },
        { img: 'img/gallery/gallery05.jpg', title: 'NEON CITY', rate: 'RATE 58%' }
    ];

    const sliderWrapper = document.getElementById('sliderWrapper');
    const dotsContainer = document.getElementById('dotsContainer');
    const slideTitle = document.getElementById('slideTitle');
    const slideRate = document.getElementById('slideRate');
    const progressBar = document.getElementById('progressBar');

    if (!sliderWrapper || !dotsContainer) return;

    let currentIndex = 0;
    const slideDuration = 5000;

    // بناء الشرائح
    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide';
        slideDiv.innerHTML = `<img src="${slide.img}" alt="${slide.title}" loading="lazy">`;
        sliderWrapper.appendChild(slideDiv);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // تهيئة Swiper
    const swiper = new Swiper('.mySlider', {
        loop: true,
        speed: 600,
        grabCursor: true,
        touchRatio: 1,
        threshold: 10,
        autoplay: {
            delay: slideDuration,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        on: {
            init: function() {
                updateSliderInfo();
            },
            slideChange: function() {
                currentIndex = this.realIndex;
                updateSliderInfo();
            },
            autoplayTimeLeft: function(swiper, timeLeft, percentage) {
                if (progressBar) {
                    progressBar.style.width = `${(1 - percentage) * 100}%`;
                }
            }
        }
    });

    function updateSliderInfo() {
        if (slideTitle && slidesData[currentIndex]) {
            slideTitle.textContent = slidesData[currentIndex].title;
        }
        if (slideRate && slidesData[currentIndex]) {
            slideRate.textContent = slidesData[currentIndex].rate;
        }
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        swiper.slideToLoop(index);
    }

    // إيقاف مؤقت عند الوقوف بالماوس
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        sliderContainer.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    }
});