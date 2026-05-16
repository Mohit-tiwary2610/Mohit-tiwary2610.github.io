/* ================================
   MOHIT TIWARY - PORTFOLIO JS
   All animations and interactions
   ================================ */
 
(function() {
    'use strict';
 
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
 
    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
 
    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
 
    // ===== SMOOTH SCROLL WITH ACTIVE LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
 
    // ===== TYPING ANIMATION =====
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Full-Stack Engineer',
        'Data Scientist',
        'Cloud DevOps Specialist',
        'AI/ML Enthusiast',
        'Problem Solver'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
 
    // ===== PARTICLE ANIMATION =====
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) scale(1.2); opacity: 0.6; }
            50% { transform: translate(${Math.random() * -100}px, ${Math.random() * 100}px) scale(0.8); opacity: 0.4; }
            75% { transform: translate(${Math.random() * 100}px, ${Math.random() * -100}px) scale(1.1); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
 
    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
 
    // ===== SKILLS PROGRESS BARS =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
 
    // ===== PROJECT CARD TILT =====
    const projectCards = document.querySelectorAll('[data-tilt]');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
 
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const contactNotification = document.getElementById('formNotification');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Show loading state
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate sending (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        contactNotification.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        contactNotification.classList.add('success');
        contactNotification.classList.remove('error');
        
        // Reset form
        contactForm.reset();
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            contactNotification.classList.remove('success');
        }, 5000);
    });
 
    // ===== HIRE FORM =====
    const hireForm = document.getElementById('hireForm');
    const hireNotification = document.getElementById('hireNotification');
    
    hireForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = hireForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Show loading state
        btnText.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(hireForm);
        const data = Object.fromEntries(formData);
        
        // Validate email
        const email = data.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            hireNotification.textContent = '✕ Please enter a valid email address.';
            hireNotification.classList.add('error');
            hireNotification.classList.remove('success');
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Simulate sending (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        hireNotification.textContent = '✓ Inquiry submitted! I\'ll review your project and get back to you within 24 hours.';
        hireNotification.classList.add('success');
        hireNotification.classList.remove('error');
        
        // Reset form
        hireForm.reset();
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            hireNotification.classList.remove('success');
        }, 5000);
    });
 
    // ===== RIPPLE EFFECT ON BUTTONS =====
    document.querySelectorAll('.submit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple');
            if (!ripple) return;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'scale(0)';
            
            setTimeout(() => {
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(0)';
                ripple.style.opacity = '1';
            }, 600);
        });
    });
 
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
 
    // ===== AOS (Animate on Scroll) ALTERNATIVE =====
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                animationObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        animationObserver.observe(el);
    });
 
    // ===== CONSOLE MESSAGE =====
    console.log(
        '%c👋 Hello, curious developer!',
        'font-size: 20px; font-weight: bold; color: #6366f1;'
    );
    console.log(
        '%cI\'m Mohit Tiwary - Full-Stack Engineer & Data Scientist',
        'font-size: 14px; color: #14b8a6;'
    );
    console.log(
        '%cLike what you see? Let\'s build something amazing together!',
        'font-size: 12px; color: #64748b;'
    );
    console.log(
        '%c📧 mtiwary982@gmail.com',
        'font-size: 12px; font-weight: bold; color: #6366f1;'
    );
 
})();