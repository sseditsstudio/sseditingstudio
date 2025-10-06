// SS Editing Studio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active nav item
                updateActiveNavItem(this);
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('nav-menu--open');
        navToggle.classList.toggle('nav-toggle--open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('nav-menu--open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('nav-menu--open');
        navToggle.classList.remove('nav-toggle--open');
        document.body.style.overflow = '';
    }
}

// Smooth scrolling for all internal links
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        if (!link.classList.contains('nav-link')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Update active navigation item based on scroll position
function updateActiveNavItem(clickedItem = null) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (clickedItem) {
        navLinks.forEach(link => link.classList.remove('nav-link--active'));
        clickedItem.classList.add('nav-link--active');
        return;
    }
    
    // Auto-update based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('nav-link--active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('nav-link--active');
                }
            });
        }
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Update active nav item
        updateActiveNavItem();
        
        lastScrollTop = scrollTop;
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateField(field) {
    const fieldGroup = field.closest('.form-group');
    const fieldName = field.getAttribute('name');
    const fieldValue = field.value.trim();
    
    // Remove existing error
    clearFieldError(field);
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (fieldName === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    } else if (fieldName === 'phone' && fieldValue) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(fieldValue.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.field-error');
    
    if (!existingError) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#FF6B6B';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        fieldGroup.appendChild(errorElement);
    }
    
    field.classList.add('field-invalid');
    field.style.borderColor = '#FF6B6B';
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('field-invalid');
    field.style.borderColor = '';
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formObject = {};
    
    // Validate all fields
    let isFormValid = true;
    const formInputs = form.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
        formObject[input.name] = input.value;
    });
    
    if (!isFormValid) {
        showFormMessage('Please correct the errors above.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate form processing (in real implementation, this would send to a server)
    setTimeout(() => {
        // Create mailto link with form data
        const subject = `New Project Inquiry - ${formObject.projectType || 'General'}`;
        const body = createEmailBody(formObject);
        const mailtoLink = `mailto:editswithssedits@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage('Thank you for your message! Your email client should open with the pre-filled message. If not, please email us directly at editswithssedits@gmail.com', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
    }, 1000);
}

function createEmailBody(formData) {
    return `
New Project Inquiry from SS Editing Studio Website

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Project Type: ${formData.projectType || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}

Project Details:
${formData.message || 'No additional details provided'}

---
This message was sent from the SS Editing Studio contact form.
    `.trim();
}

function showFormMessage(message, type) {
    const form = document.getElementById('contactForm');
    const existingMessage = form.querySelector('.form-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '12px 16px';
    messageElement.style.marginTop = '16px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.fontSize = '14px';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        messageElement.style.color = '#22C55E';
        messageElement.style.border = '1px solid rgba(34, 197, 94, 0.2)';
    } else {
        messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        messageElement.style.color = '#EF4444';
        messageElement.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    }
    
    form.appendChild(messageElement);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 8000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.expertise-card, .service-card, .review-card, .category-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// Demo reel button functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoReelButton = document.querySelector('.demo-reel-card .btn');
    if (demoReelButton) {
        demoReelButton.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or redirect to video
            alert('Demo reel functionality would be implemented here. This could open a video modal, redirect to a video page, or integrate with a video platform.');
        });
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for mobile menu and animations
const additionalStyles = `
<style>
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem 0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        border-top: 1px solid var(--color-medium-gray);
    }
    
    .nav-menu--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .nav-menu li {
        margin: 0;
        text-align: center;
    }
    
    .nav-link {
        display: block;
        padding: 1rem 2rem;
        font-size: 1.2rem;
    }
    
    .nav-toggle--open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle--open span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle--open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

.nav-link--active {
    color: var(--color-primary-orange) !important;
    background-color: rgba(255, 140, 0, 0.1);
}

.header--scrolled {
    background: rgba(0, 0, 0, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.animate-element {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.field-invalid {
    border-color: #FF6B6B !important;
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Preload critical images
function preloadImages() {
    const imagesToPreload = [
        'https://pplx-res.cloudinary.com/image/upload/v1754678678/pplx_project_search_images/e96a9667778b242df8c77c14b2328f630c31f603.png',
        'https://pplx-res.cloudinary.com/image/upload/v1755177638/pplx_project_search_images/920e2411ec50463ffdea23942a2cec3b8f7b1dca.png',
        'https://pplx-res.cloudinary.com/image/upload/v1759784458/pplx_project_search_images/f3b406f4f9fac6559005ab5aa4127c7f06de2d3d.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Performance optimization: Lazy load non-critical images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();