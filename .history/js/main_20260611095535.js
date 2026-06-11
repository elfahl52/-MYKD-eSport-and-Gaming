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
    // 2. السلايدر المحسّن (مع أزرار التنقل)
    // ==========================================
    const slidesData = [
        { image: 'img/gallery/gallery01.jpg', title: 'CYBER WARRIOR', rate: '72%' },
        { image: 'img/gallery/gallery02.jpg', title: "ASSASSIN'S CREED", rate: '65%' },
        { image: 'img/gallery/gallery03.jpg', title: 'DARK FANTASY', rate: '80%' },
        { image: 'img/gallery/gallery05.jpg', title: 'NEON CITY', rate: '58%' }
    ];

    const sliderWrapper = document.getElementById('sliderWrapper');
    const slideTitle = document.getElementById('slideTitle');
    const slideRate = document.getElementById('slideRate');
    const progressBar = document.getElementById('progressBar');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    let autoSlideInterval;

    function buildSlider() {
        sliderWrapper.innerHTML = '';
        dotsContainer.innerHTML = '';

        // 1. بناء الشرائح والنقاط
        slidesData.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.style.backgroundImage = `url(${slide.image})`;
            if (index === 0) slideEl.classList.add('active');
            sliderWrapper.appendChild(slideEl);

            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // ✅ 2. إضافة زر السابق (Prev) - اللي كنت نسيتة
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-btn prev';
        prevBtn.innerHTML = '❮';
        prevBtn.setAttribute('aria-label', 'Previous Slide');
        prevBtn.addEventListener('click', prevSlide);
        sliderWrapper.appendChild(prevBtn);

        // ✅ 3. إضافة زر التالي (Next) - اللي كنت نسيتة
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-btn next';
        nextBtn.innerHTML = '❯';
        nextBtn.setAttribute('aria-label', 'Next Slide');
        nextBtn.addEventListener('click', nextSlide);
        sliderWrapper.appendChild(nextBtn);

        updateDisplay();
    }

    function updateDisplay() {
        requestAnimationFrame(() => {
            document.querySelectorAll('.slide').forEach((el, i) => el.classList.toggle('active', i === currentIndex));
            document.querySelectorAll('.dot').forEach((el, i) => el.classList.toggle('active', i === currentIndex));

            slideTitle.textContent = slidesData[currentIndex].title;
            slideRate.textContent = `RATE ${slidesData[currentIndex].rate}`;
            progressBar.style.width = `${((currentIndex + 1) / slidesData.length) * 100}%`;
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slidesData.length;
        updateDisplay();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
        updateDisplay();
        resetAutoSlide();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateDisplay();
        resetAutoSlide();
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // دعم لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    if (sliderWrapper) {
        buildSlider();
        startAutoSlide();
    }
});