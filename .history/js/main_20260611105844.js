/* ============================================================
   main.js — Gaming Website Scripts
   ============================================================ */

/* ============================================================
   1. MOBILE MENU
   ============================================================ */
(function () {
  const hamburger   = document.getElementById("hamburger");
  const mobileMenu  = document.getElementById("mobileMenu");
  const closeMenu   = document.getElementById("closeMenu");
  const overlay     = document.getElementById("mobileOverlay");

  function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenuFn() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuFn);
  if (overlay)   overlay.addEventListener("click", closeMenuFn);

  // Keyboard close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenuFn();
    }
  });

  /* Mobile dropdown toggles */
  document.querySelectorAll(".mobile-has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const toggle   = this.querySelector(".mobile-dropdown-toggle");
      const dropdown = this.nextElementSibling;
      if (!dropdown) return;

      const isOpen = dropdown.classList.contains("active");

      // Close all open dropdowns first
      document.querySelectorAll(".mobile-dropdown.active").forEach(function (d) {
        d.classList.remove("active");
      });
      document.querySelectorAll(".mobile-dropdown-toggle.active").forEach(function (t) {
        t.classList.remove("active");
      });

      if (!isOpen) {
        dropdown.classList.add("active");
        if (toggle) toggle.classList.add("active");
      }
    });
  });
})();

/* ============================================================
   2. SCROLL TO TOP (visibility)
   ============================================================ */
(function () {
  const scrollBtn = document.querySelector(".scroll-top");
  if (!scrollBtn) return;

  scrollBtn.style.opacity = "0";
  scrollBtn.style.pointerEvents = "none";
  scrollBtn.style.transition = "opacity 0.3s ease";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }
  });
})();

/* ============================================================
   3. ABOUT SECTION — AVATAR TABS
   ============================================================ */
(function () {
  const avatars    = document.querySelectorAll(".about-area .container-2 .avatar");
  const contentImg = document.querySelector(".about-area .container-3 .image img");

  // Map each avatar index to content (extend as needed)
  const tabContent = [
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "HUMAN GAME",
      rate   : "RATE 50%",
    },
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "SHADOW REALM",
      rate   : "RATE 65%",
    },
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "DRAGON WARS",
      rate   : "RATE 78%",
    },
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "FIRE FORGE",
      rate   : "RATE 45%",
    },
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "NEON KNIGHT",
      rate   : "RATE 90%",
    },
    {
      imgSrc : "img/others/about_img01.jpg",
      name   : "CRYPTO QUEST",
      rate   : "RATE 55%",
    },
  ];

  avatars.forEach(function (avatar, idx) {
    avatar.addEventListener("click", function () {
      avatars.forEach(function (a) { a.classList.remove("active"); });
      this.classList.add("active");

      const data = tabContent[idx];
      if (!data) return;

      // Update image with fade
      if (contentImg) {
        contentImg.style.opacity = "0";
        contentImg.style.transition = "opacity 0.3s ease";
        setTimeout(function () {
          contentImg.src = data.imgSrc;
          contentImg.style.opacity = "1";
        }, 300);
      }

      // Update heading & rate if elements exist
      const heading = document.querySelector(".about-area .container-3 .content .top .left h2");
      const rate    = document.querySelector(".about-area .container-3 .content .top .left b");
      if (heading) heading.textContent = data.name;
      if (rate)    rate.textContent    = data.rate;
    });
  });
})();

/* ============================================================
   4. SWIPER SLIDER
   ============================================================ */
(function () {
  const slides = [
    {
      bg    : "img/gallery/gallery01.jpg",
      title : "ASSASSIN'S CREED",
      rate  : "RATE 65%",
    },
    {
      bg    : "img/gallery/gallery02.jpg",
      title : "DRAGON QUEST",
      rate  : "RATE 78%",
    },
    {
      bg    : "img/gallery/gallery01.jpg",
      title : "SHADOW REALM",
      rate  : "RATE 55%",
    },
    {
      bg    : "img/slider/slider_img_04.jpg",
      title : "NEON RIDERS",
      rate  : "RATE 82%",
    },
    {
      bg    : "img/slider/slider_img_05.jpg",
      title : "CYBER STORM",
      rate  : "RATE 70%",
    },
  ];

  // Build slide HTML
  const wrapper = document.getElementById("sliderWrapper");
  if (wrapper) {
    slides.forEach(function (s) {
      const div       = document.createElement("div");
      div.className   = "swiper-slide";
      div.style.backgroundImage    = "url(" + s.bg + ")";
      div.style.backgroundSize     = "cover";
      div.style.backgroundPosition = "center";
      div.dataset.title            = s.title;
      div.dataset.rate             = s.rate;
      wrapper.appendChild(div);
    });
  }

  // Build dots
  const dotsContainer = document.getElementById("dotsContainer");
  if (dotsContainer) {
    slides.forEach(function (_, idx) {
      const dot       = document.createElement("div");
      dot.className   = "dot" + (idx === 0 ? " active" : "");
      dot.dataset.idx = idx;
      dotsContainer.appendChild(dot);
    });
  }

  // Wait for Swiper to load
  function initSwiper() {
    if (typeof Swiper === "undefined") {
      setTimeout(initSwiper, 100);
      return;
    }

    var swiper = new Swiper(".mySlider", {
      slidesPerView : 1.2,
      centeredSlides: true,
      spaceBetween  : 20,
      loop          : true,
      speed         : 600,
      autoplay      : {
        delay           : 3500,
        disableOnInteraction: false,
      },
      breakpoints: {
        480 : { slidesPerView: 1.5, spaceBetween: 20 },
        640 : { slidesPerView: 2,   spaceBetween: 25 },
        900 : { slidesPerView: 2.5, spaceBetween: 30 },
        1100: { slidesPerView: 3,   spaceBetween: 30 },
      },
    });

    function updateInfo(swiper) {
      var realIdx   = swiper.realIndex;
      var slideData = slides[realIdx];
      if (!slideData) return;

      var titleEl = document.getElementById("slideTitle");
      var rateEl  = document.getElementById("slideRate");
      var bar     = document.getElementById("progressBar");
      var dots    = document.querySelectorAll(".dot");

      if (titleEl) titleEl.textContent = slideData.title;
      if (rateEl)  rateEl.textContent  = slideData.rate;

      // Progress bar: percentage through slides
      if (bar) {
        var pct = ((realIdx + 1) / slides.length) * 100;
        bar.style.width = pct + "%";
      }

      // Dots
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === realIdx);
      });
    }

    swiper.on("slideChange", function () { updateInfo(swiper); });
    updateInfo(swiper);

    // Dot clicks
    if (dotsContainer) {
      dotsContainer.addEventListener("click", function (e) {
        var dot = e.target.closest(".dot");
        if (!dot) return;
        swiper.slideToLoop(parseInt(dot.dataset.idx, 10));
      });
    }
  }

  initSwiper();
})();

/* ============================================================
   5. TRENDING — SCROLL ARROWS (decorative nav)
   ============================================================ */
(function () {
  var btns  = document.querySelectorAll(".trending .right-icons button");
  var cards = document.querySelector(".trending .container .bottom");
  if (!btns.length || !cards) return;

  // Scroll left/right
  btns[0].addEventListener("click", function () {
    cards.scrollBy({ left: -320, behavior: "smooth" });
  });
  btns[1].addEventListener("click", function () {
    cards.scrollBy({ left: 320, behavior: "smooth" });
  });
})();

/* ============================================================
   6. HEART TOGGLE (wishlist)
   ============================================================ */
document.querySelectorAll(".trending .bx-heart").forEach(function (icon) {
  icon.addEventListener("click", function () {
    this.classList.toggle("bxs-heart");
    this.classList.toggle("bx-heart");
    this.style.color = this.classList.contains("bxs-heart") ? "#ff4757" : "";
  });
});
