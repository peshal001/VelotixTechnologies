document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Header and Navigation
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('header');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Sticky Header on Scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Trigger initial scroll check
        window.dispatchEvent(new Event('scroll'));
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .case-study-content, .about-content, .values-grid .value-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('.service-card, .case-study-content, .about-content, .values-grid .value-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger animation on load
        setTimeout(animateOnScroll, 300);
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            const formContainer = document.querySelector('.contact-form-container');
            formContainer.insertBefore(formMessage, contactForm);
            
            // Reset form
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                formMessage.remove();
            }, 5000);
        });
    }
    
    // Counter Animation for Stats
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (statItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNumber = parseInt(target.textContent);
                    const duration = 2000; // 2 seconds
                    const step = (targetNumber * 10) / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        
                        if (current < targetNumber) {
                            target.textContent = Math.ceil(current) + (target.textContent.includes('%') ? '%' : '+');
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = targetNumber + (target.textContent.includes('%') ? '%' : '+');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(stat => {
            observer.observe(stat);
        });
    }
});
