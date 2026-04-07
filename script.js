document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. Mobile Menu Toggle
       ========================================================================== */
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.querySelector('i').classList.remove('fa-times');
                menuIcon.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       2. Sticky Navbar & Scroll Progress Bar
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const scrollBar = document.getElementById('scroll-bar');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollBar.style.width = `${scrollPercent}%`;

        // Active Link Highlighting
        let current = '';
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. Typing Effect (Hero Section)
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const words = [
        'Java Developer',
        'Full Stack Developer',
        'Android Developer',
        'AI-Assisted Coding Enthusiast'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // faster deletion
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // pause before next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    if(typingText) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       4. Reveal Animations on Scroll (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate progress bars
                if(entry.target.id === 'skills') {
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       5. Contact Form Submission Prevent Default
       ========================================================================== */
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Implement form submission logic here
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }

    /* ==========================================================================
       6. Lightbox Gallery
       ========================================================================== */
    const galleries = {
        'cards-android': [
            'Assests/Cards-Android/Screenshot_20260326-112905.png',
            'Assests/Cards-Android/Screenshot_20260326-115636.png',
            'Assests/Cards-Android/Screenshot_20260326-112836.png',
            'Assests/Cards-Android/Screenshot_20260326-112846.png',
            'Assests/Cards-Android/Screenshot_20260326-115705.png',
            'Assests/Cards-Android/Screenshot_20260326-115755.png',
            'Assests/Cards-Android/Screenshot_20260326-115801.png',
            'Assests/Cards-Android/Screenshot_20260326-115824.png',
            'Assests/Cards-Android/Screenshot_20260326-115945.png',
            'Assests/Cards-Android/Screenshot_20260326-120927.png',
            'Assests/Cards-Android/Screenshot_20260326-120931.png',
            'Assests/Cards-Android/Screenshot_20260326-121051.png',
            'Assests/Cards-Android/Screenshot_20260326-121109.png',
            'Assests/Cards-Android/Screenshot_20260326-121116.png'
        ],
        'habit-tracker': [
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145359.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145425.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145437.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145454.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145512.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145520.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145532.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145542.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145606.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145618.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145628.png',
            'Assests/Habit-Tracker/Screenshot 2026-03-24 145729.png'
        ]
    };

    const openLightboxBtns = document.querySelectorAll('.open-lightbox');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxThumbnails = document.getElementById('lightbox-thumbnails');

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    if (openLightboxBtns.length > 0 && lightbox) {
        
        const updateThumbnails = () => {
            document.querySelectorAll('.lightbox-thumb').forEach((thumb, index) => {
                if (index === currentImageIndex) {
                    thumb.classList.add('active');
                    // Ensure the thumbnail is visible horizontally in the styled scroll container
                    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    thumb.classList.remove('active');
                }
            });
        };

        const showImage = (index) => {
            if (index < 0) index = currentGalleryImages.length - 1;
            if (index >= currentGalleryImages.length) index = 0;
            currentImageIndex = index;
            
            // Add a small fade effect by altering opacity during image change
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = currentGalleryImages[currentImageIndex];
                lightboxImg.style.opacity = 1;
            }, 150);
            
            updateThumbnails();
        };

        openLightboxBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const galleryId = btn.getAttribute('data-gallery');
                currentGalleryImages = galleries[galleryId] || galleries['cards-android'];
                
                // Populate thumbnails
                lightboxThumbnails.innerHTML = '';
                currentGalleryImages.forEach((src, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = src;
                    thumb.classList.add('lightbox-thumb');
                    if(index === 0) thumb.classList.add('active');
                    thumb.addEventListener('click', (e) => {
                        e.stopPropagation(); // prevent modal closing
                        showImage(index);
                    });
                    lightboxThumbnails.appendChild(thumb);
                });

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                showImage(0);
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent modal from closing if clicking near prev button padding
            showImage(currentImageIndex - 1);
        });

        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentImageIndex + 1);
        });

        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        });
    }
});
