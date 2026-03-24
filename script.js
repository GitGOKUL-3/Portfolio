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
});
