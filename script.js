document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
});

// 4. Gallery: category filter + lightbox (runs only on gallery.html)
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    const items = grid.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    const emptyMsg = document.querySelector('.gallery-empty');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            let shown = 0;
            items.forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.hidden = !match;
                if (match) shown++;
            });
            emptyMsg.hidden = shown !== 0;
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');

    const close = () => { lightbox.hidden = true; lbImg.src = ''; };

    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lbCaption.textContent = item.querySelector('strong').textContent;
            lightbox.hidden = false;
        });
    });

    lightbox.addEventListener('click', e => { if (e.target !== lbImg) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});

// 5. Mobile menu toggle (the button existed but had no behaviour)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
});
