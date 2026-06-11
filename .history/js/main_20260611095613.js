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
    
});