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
    hamburger.classList.toggle('active');
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
  // 2. السلايدر المحسّن
  // ==========================================
  const sliderWrapper = document.getElementById('sliderWrapper');
  const dotsContainer = document.getElementById('dotsContainer');
  const slideTitle = document.getElementById('slideTitle');
  const slideRate = document.getElementById('slideRate');
  const progressBar = document.getElementById('progressBar');

  // ⚠️ تأكد إن المسارات دي صحيحة في مشروعك
  const slidesData = [
    { 
      img: "img/gallery/gallery01.jpg", 
      title: "ASSASSIN'S CREED", 
      rate: "RATE 65%" 
    },
    { 
      img: "img/gallery/gallery0.jpg", 
      title: "CYBERPUNK 2077", 
      rate: "RATE 82%" 
    },
    { 
      img: "img/gallery/gallery01.jpg", 
      title: "ELDEN RING", 
      rate: "RATE 95%" 
    }
  ];

  // Check if elements exist
  if (!sliderWrapper || !dotsContainer) {
    console.warn('Slider elements not found!');
    return;
  }

  let currentIndex = 0;
  const slideDuration = 5000;

  // Generate Slides
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
  const totalSlides = slidesData.length;

  // Initialize Swiper
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

  // Pause on hover (Desktop only)
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