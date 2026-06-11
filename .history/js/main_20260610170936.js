document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. MOBILE MENU FUNCTIONALITY
  // ============================================

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const closeMenu = document.getElementById('closeMenu');
  const searchIcon = document.getElementById('searchIcon');

  function openMobileMenu() {
    hamburger?.classList.add('active');
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', openMobileMenu);
  closeMenu?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const parentLi = toggle.closest('li');
      const dropdown = parentLi?.querySelector('.mobile-dropdown');

      if (dropdown) {
        document.querySelectorAll('.mobile-dropdown.active').forEach(drop => {
          if (drop !== dropdown) {
            drop.classList.remove('active');
            drop.previousElementSibling?.querySelector('.mobile-dropdown-toggle')?.classList.remove('active');
          }
        });
        dropdown.classList.toggle('active');
        toggle.classList.toggle('active');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (mobileMenu?.classList.contains('active')) closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  searchIcon?.addEventListener('click', () => {
    alert('Search feature coming soon! 🔍');
  });

  // ✅ FIX 1: شيل الـ JS hover تمامًا — خليه في CSS
  // مش محتاج mouseenter/mouseleave هنا خالص
  // في CSS بس حط: .btn > div:hover, .mobile-signin:hover { transform: scale(1.02); }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) closeMobileMenu();
    }, 250);
  });

  // ✅ FIX 2: Lazy loading بـ IntersectionObserver بدل setAttribute على الكل
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
          imgObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img').forEach(img => imgObserver.observe(img));
  }

  // ============================================
  // 2. SLIDER FUNCTIONALITY
  // ============================================

  const slidesData = [
    { image: 'img/gallery/gallery01.jpg', title: 'CYBER WARRIOR',     rate: '72%' },
    { image: 'img/gallery/gallery02.jpg', title: "ASSASSIN'S CREED",  rate: '65%' },
    { image: 'img/gallery/gallery03.jpg', title: 'DARK FANTASY',      rate: '80%' },
    { image: 'img/gallery/gallery05.jpg', title: 'NEON CITY',         rate: '58%' },
  ];

  let currentIndex = 1;
  let autoSlideInterval = null;

  const sliderWrapper  = document.getElementById('sliderWrapper');
  const slideTitle     = document.getElementById('slideTitle');
  const slideRate      = document.getElementById('slideRate');
  const progressBar    = document.getElementById('progressBar');
  const dotsContainer  = document.getElementById('dotsContainer');

  if (!sliderWrapper) {
    console.warn('⚠️ Slider wrapper not found');
    return;
  }

  // ✅ FIX 3: preload الصور الأول قبل ما تبني الـ slider
  function preloadImages(data) {
    return Promise.all(
      data.map(slide => new Promise(resolve => {
        const img = new Image();
        img.onload  = () => resolve({ ...slide, loaded: true });
        img.onerror = () => resolve({ ...slide, loaded: false });
        img.src = slide.image;
      }))
    );
  }

  function buildSlider() {
    sliderWrapper.innerHTML = '';
    dotsContainer.innerHTML = '';

    slidesData.forEach((slide, index) => {
      const slideEl = document.createElement('div');
      slideEl.classList.add('slide');
      slideEl.style.backgroundImage = slide.loaded
        ? `url(${slide.image})`
        : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
      slideEl.addEventListener('click', () => goToSlide(index));
      sliderWrapper.appendChild(slideEl);

      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn', 'prev');
    prevBtn.innerHTML = '❮';
    prevBtn.addEventListener('click', prevSlide);
    sliderWrapper.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-btn', 'next');
    nextBtn.innerHTML = '❯';
    nextBtn.addEventListener('click', nextSlide);
    sliderWrapper.appendChild(nextBtn);

    updateSlider();
  }

  function updateSlider() {
    // ✅ FIX 4: استخدم requestAnimationFrame عشان التحديث يبقى smooth
    requestAnimationFrame(() => {
      document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      slideTitle.textContent = slidesData[currentIndex].title;
      slideRate.textContent  = `RATE ${slidesData[currentIndex].rate}`;
      progressBar.style.width = `${((currentIndex + 1) / slidesData.length) * 100}%`;
    });
  }

  function nextSlide() { currentIndex = (currentIndex + 1) % slidesData.length; updateSlider(); resetAutoSlide(); }
  function prevSlide() { currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length; updateSlider(); resetAutoSlide(); }
  function goToSlide(i) { currentIndex = i; updateSlider(); resetAutoSlide(); }

  // ✅ FIX 5: تأكد الـ interval بيتـclear صح دايمًا
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
    startAutoSlide();
  }

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
  });

  // Mouse drag
  let startX = 0, isDragging = false;
  sliderWrapper.addEventListener('mousedown',  (e) => { startX = e.clientX; isDragging = true; });
  sliderWrapper.addEventListener('mouseleave', ()  => { isDragging = false; });
  sliderWrapper.addEventListener('mouseup',    (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(startX - e.clientX) > 50) {
      startX - e.clientX > 0 ? nextSlide() : prevSlide();
    }
  });

  // Touch swipe
  let touchStartX = 0;
  sliderWrapper.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  sliderWrapper.addEventListener('touchend',   (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  }, { passive: true });

  // ✅ ابدأ بعد ما الصور تتحمل
  preloadImages(slidesData).then(loadedData => {
    loadedData.forEach((d, i) => slidesData[i].loaded = d.loaded);
    buildSlider();
    startAutoSlide();
    console.log('✅ Slider ready');
  });

});