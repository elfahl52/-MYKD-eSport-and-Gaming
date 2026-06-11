document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. القائمة المتنقلة (Mobile Menu)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('mobileOverlay');

    // دالة فتح وإغلاق القائمة
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    hamburger?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    // إغلاق القائمة بزر Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            toggleMenu();
        }
    });

    // فتح وإغلاق القوائم المنسدلة (Dropdowns) في الموبايل
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = e.target.closest('li').querySelector('.mobile-dropdown');
            dropdown?.classList.toggle('active');
            e.target.classList.toggle('active');
        });
    });

    // ==========================================
    // 2. عرض السلايدر بسهولة (Simple Slider Render)
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

    // دالة لعرض (Render) السلايدر والـ Dots
    function renderSlider() {
        sliderWrapper.innerHTML = '';
        dotsContainer.innerHTML = '';

        slidesData.forEach((slide, index) => {
            // إنشاء شريحة السلايدر
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.style.backgroundImage = `url(${slide.image})`;
            if (index === 0) slideEl.classList.add('active');
            sliderWrapper.appendChild(slideEl);

            // إنشاء نقاط التنقل (Dots)
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        updateSliderInfo();
    }

    // دالة لتحديث البيانات (العنوان، النسبة، شريط التقدم)
    function updateSliderInfo() {
        // تحديث الشرائح والنقاط النشطة
        document.querySelectorAll('.slide').forEach((el, i) => el.classList.toggle('active', i === currentIndex));
        document.querySelectorAll('.dot').forEach((el, i) => el.classList.toggle('active', i === currentIndex));

        // تحديث النصوص وشريط التقدم
        slideTitle.textContent = slidesData[currentIndex].title;
        slideRate.textContent = `RATE ${slidesData[currentIndex].rate}`;
        progressBar.style.width = `${((currentIndex + 1) / slidesData.length) * 100}%`;
    }

    // دوال التنقل بين الشرائح
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slidesData.length;
        updateSliderInfo();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
        updateSliderInfo();
        resetAutoSlide();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSliderInfo();
        resetAutoSlide();
    }

    // التشغيل التلقائي
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // التنقل بلوحة المفاتيح (أسهم يمين ويسار)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // تشغيل السلايدر إذا كان العنصر موجوداً في الصفحة
    if (sliderWrapper) {
        renderSlider();
        startAutoSlide();
    }

    // ==========================================
    // 3. عرض البطاقات (NFT Cards) ديناميكياً (اختياري)
    // ==========================================
    /*
    // إذا كنت تريد عرض البطاقات عبر JS بدلاً من كتابتها في HTML، يمكنك استخدام هذا الكود البسيط:
    
    const nftData = [
        { img: 'img/nft/nft_img01.jpg', title: 'WOLF GAMING ART', price: '1.002' },
        { img: 'img/nft/nft_img02.jpg', title: 'FOREST PRINCESS', price: '1.053' },
        { img: 'img/nft/nft_img03.jpg', title: 'GIRL FIREFLY ART', price: '1.024' }
    ];

    const cardSection = document.querySelector('#card-section .container');
    
    function renderCards() {
        cardSection.innerHTML = ''; // مسح البطاقات القديمة من HTML
        
        nftData.forEach(nft => {
            const card = document.createElement('div');
            card.className = 'nft-card';
            // استخدام Template Literals لعرض الـ HTML بسهولة
            card.innerHTML = `
                <div class="card-img"><img src="${nft.img}" alt="NFT Art"></div>
                <div class="card-info">
                    <h3 class="card-title">${nft.title}</h3>
                    <div class="card-creator">
                        <img src="img/nft/nft_avatar.png" alt="Avatar">
                        <span class="creator-name">Alax Max</span>
                        <span class="separator"></span>
                        <span class="creator-role">CREATOR</span>
                    </div>
                    <div class="card-bottom-box">
                        <div class="price-tag">
                            <span class="amount">${nft.price}</span>
                            <span class="currency">ETH</span>
                        </div>
                        <a href="#" class="btn-bid">Bid <i class="bx bx-right-arrow-alt"></i></a>
                    </div>
                </div>
            `;
            cardSection.appendChild(card);
        });
    }
    
    // renderCards(); // قم بإلغاء علامة التعليق (//) لتشغيلها
    */
});