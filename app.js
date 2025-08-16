// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll to sections
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + (header ? header.offsetHeight : 80) + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Add header background on scroll
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
}

// Form validation
function validateForm(formData) {
    const errors = [];

    if (!formData.get('name')?.trim()) {
        errors.push('Name is required');
    }

    const email = formData.get('email')?.trim();
    if (!email) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.get('message')?.trim()) {
        errors.push('Message is required');
    }

    return errors;
}

// Show form feedback
function showFormFeedback(message, isError = false) {
    // Remove any existing feedback
    const existingFeedback = contactForm.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${isError ? 'form-feedback--error' : 'form-feedback--success'}`;
    feedback.textContent = message;
    
    // Add styles
    feedback.style.cssText = `
        padding: 12px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 500;
        ${isError ? 
            'background: rgba(255, 84, 89, 0.1); color: #ff5459; border: 1px solid rgba(255, 84, 89, 0.2);' : 
            'background: rgba(0, 245, 255, 0.1); color: #00f5ff; border: 1px solid rgba(0, 245, 255, 0.2);'
        }
    `;

    contactForm.appendChild(feedback);

    // Remove feedback after 5 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 5000);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showFormFeedback(errors[0], true);
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showFormFeedback('Thanks for your message! We\'ll get back to you soon.');
        contactForm.reset();
        
    } catch (error) {
        showFormFeedback('Sorry, something went wrong. Please try again.', true);
    } finally {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
function initAnimations() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .stat-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
}

// Handle CTA buttons
function handleCTAClicks() {
    // Main navigation "Get Started" button
    const navGetStarted = document.querySelector('.nav__actions .btn--primary');
    if (navGetStarted) {
        navGetStarted.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#contact');
            closeMobileNav();
        });
    }

    // Hero section buttons
    const heroButtons = document.querySelectorAll('.hero__actions .btn');
    heroButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (index === 0) {
                // "View Our Work" - scroll to portfolio
                smoothScrollTo('#portfolio');
            } else {
                // "Start Your Project" - scroll to contact
                smoothScrollTo('#contact');
            }
        });
    });

    // Service "Learn More" buttons
    const serviceButtons = document.querySelectorAll('.service-card .btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#contact');
        });
    });

    // "View Full Portfolio" button
    const portfolioCTA = document.querySelector('.portfolio__cta .btn');
    if (portfolioCTA) {
        portfolioCTA.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#contact');
        });
    }
}

// Add portfolio item click handlers
function initPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a subtle click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
}

// Handle scroll-based animations and effects
function handleScroll() {
    handleHeaderScroll();
    updateActiveNavLink();
    animateOnScroll();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScrollTo(targetId);
                closeMobileNav();
            }
        });
    });
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize animations and effects
    initAnimations();
    initPortfolioItems();
    handleCTAClicks();
    
    // Add scroll event listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Handle escape key for mobile nav
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Initial scroll check
    handleScroll();
    
    // Trigger initial animation after a brief delay
    setTimeout(animateOnScroll, 300);
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 20px 40px rgba(0, 245, 255, 0.15)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Add parallax effect to hero background
document.addEventListener('DOMContentLoaded', function() {
    const heroBackground = document.querySelector('.hero__background');
    
    if (heroBackground) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${parallax}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
});

// Enhanced stats counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-item__number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.about');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/\d/g, '');
                
                if (numericValue && numericValue > 0) {
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            stat.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(currentValue) + suffix;
                        }
                    }, 30);
                }
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    // Check initially in case stats are already in view
    setTimeout(animateStats, 500);
});