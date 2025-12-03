// Stripe Configuration
// TODO: Replace this with your Stripe Payment Link URL
// To create a Payment Link:
// 1. Go to Stripe Dashboard > Products > Payment Links
// 2. Create a new Payment Link for your $500/month subscription
// 3. Copy the Payment Link URL and paste it below
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/7sY5kDbklf578EtaYYawo00';

// Initialize Stripe Checkout Links
document.addEventListener('DOMContentLoaded', () => {
    // Update all "Get Started with Partner Plan" buttons to use Stripe Payment Link
    const partnerPlanButtons = document.querySelectorAll('[data-stripe-checkout]');
    partnerPlanButtons.forEach(button => {
        if (STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== 'https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE') {
            button.href = STRIPE_PAYMENT_LINK;
            button.target = '_blank'; // Open in new tab
            button.rel = 'noopener noreferrer';
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip Stripe checkout buttons - they get their href changed dynamically
        if (this.hasAttribute('data-stripe-checkout')) {
            return; // Let the link work normally
        }
        
        // Double-check href at click time (in case it was changed dynamically)
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            return; // Not a hash link anymore, let it work normally
        }
        
        e.preventDefault();
        const targetId = href;
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header Background on Scroll
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 35, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Contact Form Submission
// Contact Form Submission (Web3Forms)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ✅ hCaptcha validation
        const hcaptchaResponse = contactForm.querySelector('textarea[name="h-captcha-response"]');
        if (!hcaptchaResponse || !hcaptchaResponse.value) {
            alert('Please complete the captcha before submitting.');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                const formContainer = contactForm.closest('.contact-content') || contactForm.parentElement;

                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <div class="success-icon">✓</div>
                    <h3>Thank you for your interest!</h3>
                    <p>We've received your message and will be in touch shortly.</p>
                `;

                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);

                contactForm.reset();
            } else {
                throw new Error(data.message || 'Form submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Web3Forms error:', error);
            alert('Sorry, there was an error sending your message. Please try again or email us directly at hello@automationdone.com');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}



// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isExpanded = faqItem.getAttribute('aria-expanded') === 'true';
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isExpanded) {
                faqItem.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .process-step, .benefit-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const headerHeight = document.querySelector('.header').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});


