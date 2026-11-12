document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     0. Theme Switcher (Manual -> System -> Local Time Fallback)
     ======================================================================== */
  const THEME_STORAGE_KEY = 'theme';
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  let transitionTimer = null;

  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  };

  const getFallbackTimeTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 19 ? 'light' : 'dark';
  };

  const resolveAutoTheme = () => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return getFallbackTimeTheme();
  };

  const updateThemeButton = (theme) => {
    if (!themeToggle) return;
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
  };

  const applyTheme = (theme, animate = false) => {
    if (animate) {
      root.classList.add('theme-transitioning');
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 200);
    }

    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    updateThemeButton(theme);
  };

  // Sync button state with the pre-paint theme set in <head>
  updateThemeButton(root.getAttribute('data-theme') || resolveAutoTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage errors in restricted browsing modes
      }
      applyTheme(next, true);
    });
  }

  if (window.matchMedia) {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (getSavedTheme()) return;
      applyTheme(resolveAutoTheme(), true);
    };

    if (typeof darkQuery.addEventListener === 'function') {
      darkQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof darkQuery.addListener === 'function') {
      darkQuery.addListener(handleSystemThemeChange);
    }
  }

  /* ========================================================================
     1. Mobile Menu Toggle
     ======================================================================== */
  const menuToggle = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link, .nav-cta');

  const closeMenu = () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navItems.forEach((item) => {
      item.addEventListener('click', closeMenu);
    });
  }

  /* ========================================================================
     2. Navbar Scroll State & Active Section Highlighting
     ======================================================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main > section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const updateScrollState = () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 16);
    }

    let currentId = '';
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 160) {
        currentId = section.getAttribute('id') || '';
      }
    });

    navLinkEls.forEach((link) => {
      const target = link.getAttribute('href');
      link.classList.toggle('active', target === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  /* ========================================================================
     3. Section Entrance Reveal (Below the Fold, Trigger Once)
     ======================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('active');
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }

  /* ========================================================================
     4. Lightbox Gallery
     ======================================================================== */
  const galleries = {
    'cards-android': [
      'assests/Cards-Android/Screenshot_20260326-112905.png',
      'assests/Cards-Android/Screenshot_20260326-115636.png',
      'assests/Cards-Android/Screenshot_20260326-112836.png',
      'assests/Cards-Android/Screenshot_20260326-112846.png',
      'assests/Cards-Android/Screenshot_20260326-115705.png',
      'assests/Cards-Android/Screenshot_20260326-115755.png',
      'assests/Cards-Android/Screenshot_20260326-115801.png',
      'assests/Cards-Android/Screenshot_20260326-115824.png',
      'assests/Cards-Android/Screenshot_20260326-115945.png',
      'assests/Cards-Android/Screenshot_20260326-120927.png',
      'assests/Cards-Android/Screenshot_20260326-120931.png',
      'assests/Cards-Android/Screenshot_20260326-121051.png',
      'assests/Cards-Android/Screenshot_20260326-121109.png',
      'assests/Cards-Android/Screenshot_20260326-121116.png',
    ],
    'habit-tracker': [
      'assests/Habit-Tracker/Screenshot 2026-03-24 145425.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145437.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145454.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145512.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145520.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145532.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145542.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145606.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145618.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145628.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145729.png',
      'assests/Habit-Tracker/Screenshot 2026-03-24 145359.png',
    ],
  };

  const openLightboxBtns = document.querySelectorAll('.open-lightbox');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxThumbnails = document.getElementById('lightbox-thumbnails');

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  if (openLightboxBtns.length > 0 && lightbox && lightboxImg && lightboxThumbnails) {
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const updateThumbnails = () => {
      document.querySelectorAll('.lightbox-thumb').forEach((thumb, index) => {
        const isActive = index === currentImageIndex;
        thumb.classList.toggle('active', isActive);
        if (isActive) {
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    };

    const showImage = (index) => {
      if (index < 0) index = currentGalleryImages.length - 1;
      if (index >= currentGalleryImages.length) index = 0;
      currentImageIndex = index;

      lightboxImg.style.opacity = '0';
      window.setTimeout(() => {
        lightboxImg.src = currentGalleryImages[currentImageIndex];
        lightboxImg.alt = `Project screenshot ${currentImageIndex + 1} of ${currentGalleryImages.length}`;
        lightboxImg.style.opacity = '1';
      }, 100);

      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
      }

      updateThumbnails();
    };

    openLightboxBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const galleryId = btn.getAttribute('data-gallery') || 'cards-android';
        currentGalleryImages = galleries[galleryId] || galleries['cards-android'];

        lightboxThumbnails.innerHTML = '';
        currentGalleryImages.forEach((src, index) => {
          const thumb = document.createElement('img');
          thumb.src = src;
          thumb.alt = `Screenshot thumbnail ${index + 1}`;
          thumb.className = 'lightbox-thumb' + (index === 0 ? ' active' : '');
          thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(index);
          });
          lightboxThumbnails.appendChild(thumb);
        });

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        showImage(0);
      });
    });

    lightboxClose?.addEventListener('click', closeLightbox);

    lightboxPrev?.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentImageIndex - 1);
    });

    lightboxNext?.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentImageIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        if (lightbox.classList.contains('active')) {
          closeLightbox();
        }
      }
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
    });
  }
});
