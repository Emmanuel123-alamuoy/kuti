document.addEventListener('DOMContentLoaded', function () {
    // ========== Dark Mode Toggle ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark' && darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            const newTheme = this.checked ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ========== Custom Cursor ==========
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .nav-link, .project-card, .tech-tag, .btn, .highlight-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'white';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--primary-color)';
            });
        });
    }

    // ========== Mobile Menu Toggle ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ========== GSAP Animations ==========
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const fadeInFromBottom = (selector, delay = 0) => {
            gsap.to(selector, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: delay
            });
        };

        fadeInFromBottom('.title-word-1', 0.2);
        fadeInFromBottom('.title-word-2', 0.4);
        fadeInFromBottom('.title-word-3', 0.6);
        fadeInFromBottom('.title-word-4', 0.8);

        gsap.to('.hero-subtitle', { opacity: 1, duration: 1, delay: 1.2 });
        gsap.to('.hero-buttons', { opacity: 1, duration: 1, delay: 1.4 });
        gsap.to('.hero-social', { opacity: 1, duration: 1, delay: 1.6 });

        // Floating effect
        gsap.to('.floating-element', {
            y: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Scroll-triggered animations
        const animateOnScroll = (selector, y = 50, delayStep = 0.1) => {
            gsap.utils.toArray(selector).forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: y,
                    duration: 0.8,
                    delay: i * delayStep
                });
            });
        };

        animateOnScroll('.project-card');
        animateOnScroll('.skill-item', 30);
        animateOnScroll('.timeline-item', 50, 0.2);

        gsap.from('.about-content', {
            scrollTrigger: { trigger: '.about', start: "top 70%", toggleActions: "play none none none" },
            opacity: 1,
            x: -50,
            duration: 1
        });

        gsap.from('.about-visual', {
            scrollTrigger: { trigger: '.about', start: "top 70%", toggleActions: "play none none none" },
            opacity: 1,
            x: 50,
            duration: 1
        });

        gsap.from('.contact-info', {
            scrollTrigger: { trigger: '.contact', start: "top 70%", toggleActions: "play none none none" },
            opacity: 1,
            x: -50,
            duration: 1
        });

        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact', start: "top 70%", toggleActions: "play none none none" },
            opacity: 1,
            x: 50,
            duration: 1
        });

        // Profile dots
        ['.dot-1', '.dot-2', '.dot-3'].forEach((selector, i) => {
            gsap.to(selector, {
                scale: 1.2,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5
            });
        });
    }

    // ========== Chart.js Line Chart ==========
    const chartCanvas = document.getElementById('animatedChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Model Accuracy',
                    data: [65, 72, 80, 83, 85, 87, 88, 90, 89, 91, 93, 95],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgba(59, 130, 246, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 10,
                        cornerRadius: 5,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'var(--text-color)' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'var(--text-color)' }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });

        // Optional: reveal chart on load
        gsap.set(chartCanvas, { opacity: 1 });
    }

    // ========== Navbar Scroll Effect ==========
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Contact Form Submission ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});
