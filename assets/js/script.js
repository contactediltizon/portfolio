document.addEventListener('DOMContentLoaded', () => {
    // --- Burger Menu Toggle ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle'); // For burger animation

        // Animate nav links in
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close nav when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                navItems.forEach(link => link.style.animation = ''); // Reset animation
            }
        });
    });

    // CSS animation keyframes for nav links
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0px); }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- Personal Info Toggle ---
    const personalInfoToggle = document.querySelector('.personal-info-toggle');
    if (personalInfoToggle) {
        personalInfoToggle.addEventListener('click', () => {
            personalInfoToggle.classList.toggle('active');
        });
    }

    // --- Scroll-triggered Counter Animation (for Stats Section) ---
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersActivated = false;

    const animateCounter = (entry) => {
        if (entry.isIntersecting && !countersActivated) {
            statNumbers.forEach(stat => {
                const target = +stat.dataset.target; // Convert to number
                let current = 0;
                const increment = target / 100; // Adjust for smoother animation

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCounter();
            });
            countersActivated = true; // Ensure animation runs only once
        }
    };

    if (statsSection) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the section is visible
        };
        const observer = new IntersectionObserver(([entry]) => animateCounter(entry), observerOptions);
        observer.observe(statsSection);
    }

    // --- Smooth Scrolling for Navigation Links and Back to Top Button ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                // Adjust offset for 'home' to go to the very top, otherwise offset by header height
                const offsetPosition = (targetId === 'home') ? 0 : elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile nav if open after clicking a link
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burgerMenu.classList.remove('toggle');
                    navItems.forEach(link => link.style.animation = ''); // Reset animation
                }
            }
        });
    });

    // --- Header Scroll Effect (Optional: Shrink/change color on scroll) ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)'; // More opaque
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
        }
    });

    // --- Form Submission (Basic Example - replace with real backend if needed) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message, Edil will get back to you soon!'); // Replace with actual form submission logic (e.g., Fetch API to a backend)
            contactForm.reset();
        });
    }

    // --- Back to Top Button Logic ---
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) { // Only add listener if button exists
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopBtn.style.display = "flex"; // Use flex to show it
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // The smooth scrolling for this button is already handled by the
        // general 'a[href^="#"]' event listener above. No need for a separate one here.
    }
});