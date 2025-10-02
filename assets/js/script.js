// ========================================
// PORTFOLIO JAVASCRIPT - MODERN INTERACTIONS
// ========================================

'use strict';

// ========================================
// GLOBAL VARIABLES & DOM ELEMENTS
// ========================================

const DOM = {
  // Navigation
  header: document.querySelector('.header'),
  navToggleBtn: document.querySelector('[data-nav-toggle-btn]'),
  navbar: document.querySelector('.navbar'),
  navLinks: document.querySelectorAll('[data-nav-link]'),
  
  // Back to Top
  backToTopBtn: document.querySelector('[data-back-to-top]'),
  
  // Projects
  filterBtns: document.querySelectorAll('.project-filter-btn'),
  projectCards: document.querySelectorAll('.project-card-modern'),
  projectDetailsBtns: document.querySelectorAll('.project-details-btn'),
  
  // Certificate Modal
  certificateModal: document.getElementById('certificateModal'),
  certificateImage: document.getElementById('certificateImage'),
  
  // Contact Form
  contactForm: document.getElementById('contact-form'),
  formStatus: document.getElementById('form-status'),
  submitBtn: document.getElementById('submit-btn'),
  
  // Testimonials
  testimonialCards: document.querySelectorAll('.testimonial-card'),
  prevBtn: document.querySelector('.prev-btn'),
  nextBtn: document.querySelector('.next-btn'),
  indicators: document.querySelectorAll('.indicator')
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing portfolio...');
  initNavigation();
  initScrollEffects();
  initAOS();
  initProjectFilters();
  initTestimonials();
  initFormHandling();
  initSmoothScroll();
  initBackToTop();
  initPreloader();
  initAnimatedCounters();
  initParallaxEffects();
  checkSocialIcons();
  
  // Refresh AOS after a short delay to ensure all elements are loaded
  setTimeout(refreshAOS, 500);
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
  // Mobile menu toggle
  if (DOM.navToggleBtn) {
    DOM.navToggleBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking nav links
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
      setActiveNavLink(link);
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!DOM.navbar?.contains(e.target) && !DOM.navToggleBtn?.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavOnScroll);
}

function toggleMobileMenu() {
  DOM.navbar?.classList.toggle('active');
  DOM.navToggleBtn?.setAttribute(
    'aria-expanded',
    DOM.navbar?.classList.contains('active') ? 'true' : 'false'
  );
  
  // Animate menu icon
  const menuIcon = DOM.navToggleBtn?.querySelector('.menu-icon');
  const closeIcon = DOM.navToggleBtn?.querySelector('.close-icon');
  
  if (DOM.navbar?.classList.contains('active')) {
    menuIcon?.style.setProperty('display', 'none');
    closeIcon?.style.setProperty('display', 'block');
  } else {
    menuIcon?.style.setProperty('display', 'block');
    closeIcon?.style.setProperty('display', 'none');
  }
}

function closeMobileMenu() {
  DOM.navbar?.classList.remove('active');
  DOM.navToggleBtn?.setAttribute('aria-expanded', 'false');
  
  const menuIcon = DOM.navToggleBtn?.querySelector('.menu-icon');
  const closeIcon = DOM.navToggleBtn?.querySelector('.close-icon');
  menuIcon?.style.setProperty('display', 'block');
  closeIcon?.style.setProperty('display', 'none');
}

function setActiveNavLink(activeLink) {
  DOM.navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      correspondingLink?.classList.add('active');
    } else {
      correspondingLink?.classList.remove('active');
    }
  });
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Header scroll effect
    if (currentScroll > 50) {
      DOM.header?.classList.add('scrolled');
    } else {
      DOM.header?.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      DOM.header?.style.setProperty('transform', 'translateY(-100%)');
    } else {
      DOM.header?.style.setProperty('transform', 'translateY(0)');
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// ANIMATE ON SCROLL (AOS)
// ========================================

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 100,
      disable: 'mobile'
    });
    
    // Refresh AOS to ensure new elements are recognized
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
}

// Add a function to refresh AOS when needed
function refreshAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// ========================================
// PROJECT FILTERS
// ========================================

function initProjectFilters() {
  DOM.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      DOM.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      const filterValue = btn.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
  
  // Initialize project detail modals
  DOM.projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showProjectDetails(btn.closest('.project-card-modern'));
    });
  });
}

function filterProjects(filter) {
  DOM.projectCards.forEach(card => {
    const categories = card.getAttribute('data-category').split(' ');
    
    if (filter === 'all' || categories.includes(filter)) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      card.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

function showProjectDetails(projectCard) {
  // Check if projectCard exists
  if (!projectCard) {
    console.warn('Project card not found');
    return;
  }
  
  const titleElement = projectCard.querySelector('.project-title');
  const descriptionElement = projectCard.querySelector('.project-description');
  const imageElement = projectCard.querySelector('.project-image');
  
  // Check if required elements exist
  if (!titleElement || !descriptionElement || !imageElement) {
    console.warn('Required project elements not found');
    return;
  }
  
  const title = titleElement.textContent;
  const description = descriptionElement.textContent;
  const image = imageElement.src;
  
  // Create and show modal with project details
  const modal = createProjectModal(title, description, image);
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function createProjectModal(title, description, image) {
  const modal = document.createElement('div');
  modal.className = 'project-modal-overlay';
  modal.innerHTML = `
    <div class="project-modal-content">
      <button class="project-modal-close">&times;</button>
      <img src="${image}" alt="${title}" class="project-modal-image">
      <div class="project-modal-body">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    </div>
  `;
  
  // Close modal functionality
  const closeButton = modal.querySelector('.project-modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    });
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  });
  
  return modal;
}

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

function initTestimonials() {
  // Check if testimonials elements exist
  if (!DOM.testimonialCards || DOM.testimonialCards.length === 0) {
    return;
  }
  
  let currentTestimonial = 0;
  const testimonials = DOM.testimonialCards;
  
  // Show first testimonial
  showTestimonial(currentTestimonial);
  
  // Next button
  if (DOM.nextBtn) {
    DOM.nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }
  
  // Previous button
  if (DOM.prevBtn) {
    DOM.prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }
  
  // Indicator clicks
  if (DOM.indicators) {
    DOM.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });
  }
  
  // Auto-play carousel
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

function showTestimonial(index) {
  // Check if testimonials exist
  if (!DOM.testimonialCards || DOM.testimonialCards.length === 0) {
    return;
  }
  
  // Hide all testimonials
  DOM.testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  
  // Show current testimonial
  if (DOM.testimonialCards[index]) {
    DOM.testimonialCards[index].classList.add('active');
  }
  
  // Update indicators if they exist
  if (DOM.indicators) {
    DOM.indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }
}

// ========================================
// FORM HANDLING
// ========================================

function initFormHandling() {
  if (DOM.contactForm) {
    DOM.contactForm.addEventListener('submit', handleFormSubmit);
  }
}

async function handleFormSubmit(e) {
  // Check if required elements exist
  if (!e || !DOM.contactForm || !DOM.submitBtn || !DOM.formStatus) {
    console.warn('Form elements not found');
    return;
  }
  
  e.preventDefault();
  
  // Show loading state
  const submitText = DOM.submitBtn.querySelector('.submit-text');
  const submitLoading = DOM.submitBtn.querySelector('.submit-loading');
  
  if (submitText) submitText.style.display = 'none';
  if (submitLoading) submitLoading.style.display = 'inline-block';
  DOM.submitBtn.disabled = true;
  
  try {
    // Submit form using Formspree
    const formData = new FormData(DOM.contactForm);
    const response = await fetch(DOM.contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      showFormStatus('success', 'Thank you! Your message has been sent successfully.');
      DOM.contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus('error', 'Oops! There was a problem sending your message. Please try again.');
  } finally {
    // Reset button state
    if (submitText) submitText.style.display = 'inline-block';
    if (submitLoading) submitLoading.style.display = 'none';
    DOM.submitBtn.disabled = false;
  }
}

function showFormStatus(type, message) {
  // Check if form status element exists
  if (!DOM.formStatus) {
    console.warn('Form status element not found');
    return;
  }
  
  DOM.formStatus.className = `form-status ${type}`;
  DOM.formStatus.textContent = message;
  DOM.formStatus.style.display = 'block';
  
  // Hide status after 5 seconds
  setTimeout(() => {
    DOM.formStatus.style.display = 'none';
  }, 5000);
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      DOM.backToTopBtn?.classList.add('active');
    } else {
      DOM.backToTopBtn?.classList.remove('active');
    }
  });
  
  // Scroll to top functionality
  DOM.backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// CERTIFICATE MODAL
// ========================================

function openCertificateModal(imageSrc) {
  // Check if required elements exist
  if (!DOM.certificateModal || !DOM.certificateImage) {
    console.warn('Certificate modal elements not found');
    return;
  }
  
  if (!imageSrc) {
    console.warn('No image source provided');
    return;
  }
  
  DOM.certificateImage.src = imageSrc;
  DOM.certificateModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Add animation
  setTimeout(() => {
    DOM.certificateModal.classList.add('show');
  }, 10);
}

function closeCertificateModal() {
  if (DOM.certificateModal) {
    DOM.certificateModal.classList.remove('show');
    setTimeout(() => {
      DOM.certificateModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

function downloadCertificate() {
  // Check if certificate image exists
  if (!DOM.certificateImage) {
    console.warn('Certificate image not found');
    return;
  }
  
  const imageSrc = DOM.certificateImage.src;
  if (imageSrc) {
    // Create temporary link for download
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `certificate-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.openCertificateModal = openCertificateModal;
  window.closeCertificateModal = closeCertificateModal;
  window.downloadCertificate = downloadCertificate;
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertificateModal();
  }
});

// ========================================
// PRELOADER
// ========================================

function initPreloader() {
  // Create preloader if it doesn't exist
  if (!document.querySelector('.preloader')) {
    const preloader = document.createElement('div');
    if (!preloader) {
      console.warn('Could not create preloader element');
      return;
    }
    
    preloader.className = 'preloader';
    preloader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-spinner"></div>
        <p class="preloader-text">Loading Portfolio...</p>
      </div>
    `;
    document.body.appendChild(preloader);
    
    // Remove preloader after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            if (preloader && preloader.parentNode) {
              preloader.parentNode.removeChild(preloader);
            }
          }, 500);
        }
      }, 500);
    });
  }
}

// ========================================
// ANIMATED COUNTERS
// ========================================

function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number, .achievement-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.textContent);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };
  
  updateCounter();
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.hero-image, .floating-icon');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ========================================
// SOCIAL ICONS DEBUGGING
// ========================================

function checkSocialIcons() {
  console.log('Checking social icons...');
  const socialIcons = document.querySelectorAll('.social-icon');
  console.log('Found social icons:', socialIcons.length);
  
  socialIcons.forEach((icon, index) => {
    console.log(`Social icon ${index}:`, icon);
    const iconElement = icon.querySelector('i');
    if (iconElement) {
      console.log(`Icon class: ${iconElement.className}`);
    } else {
      console.warn(`No icon element found in social icon ${index}`);
    }
    
    // Add event listeners for hover effects
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
  updateActiveNavOnScroll();
}, 100));

// Lazy load images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
  // Press '/' to focus search (if you add search functionality)
  if (e.key === '/') {
    e.preventDefault();
    // Focus search input if available
  }
  
  // Press 'g' then 'h' to go home
  if (e.key === 'g') {
    window.addEventListener('keydown', function goHome(event) {
      if (event.key === 'h') {
        window.location.hash = '#home';
      }
      window.removeEventListener('keydown', goHome);
    });
  }
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cWelcome to my portfolio! Feel free to explore the code.', 'font-size: 14px; color: #48bb78;');
console.log('%c📧 Want to work together? Reach out at supreethvennila@gmail.com', 'font-size: 12px; color: #ed8936;');

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // You can add error tracking here (e.g., Sentry, LogRocket)
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // You can add error tracking here
});

// ========================================
// SERVICE WORKER REGISTRATION (for PWA)
// ========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => console.log('ServiceWorker registered:', registration),
      err => console.log('ServiceWorker registration failed:', err)
    ).catch(err => console.log(err));
  });
}

// ========================================
// NETWORK STATUS INDICATOR
// ========================================

window.addEventListener('online', () => {
  console.log('🟢 You are online');
  // You can show a notification to the user
});

window.addEventListener('offline', () => {
  console.log('🔴 You are offline');
  // You can show a notification to the user
});

// ========================================
// VISIBILITY CHANGE (Tab focus)
// ========================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Tab is hidden');
    // Pause animations or videos if needed
  } else {
    console.log('Tab is visible');
    // Resume animations or videos if needed
  }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('PerformanceObserver' in window) {
  // Observe largest contentful paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  });
  
  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observation not supported');
  }
  
  // Observe first input delay
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  });
  
  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observation not supported');
  }
}

// ========================================
// EXPORT FOR TESTING
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initNavigation,
    initScrollEffects,
    initAOS,
    initProjectFilters,
    initTestimonials,
    initFormHandling,
    initSmoothScroll,
    initBackToTop,
    debounce,
    throttle,
    openCertificateModal,
    closeCertificateModal,
    downloadCertificate
  };
}

// ========================================
// PAGE LOAD COMPLETE
// ========================================

window.addEventListener('load', () => {
  console.log('✅ Page fully loaded');
  console.log('📊 Performance:', performance.timing);
  
  // Log page load time
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`⏱️ Page load time: ${loadTime}ms`);
});

// ========================================
// ADDITIONAL FEATURES
// ========================================

// Copy email on click
function copyEmailToClipboard() {
  const email = 'supreethvennila@gmail.com';
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      console.log('✅ Email copied to clipboard');
      // You can show a toast notification here
    }).catch(err => {
      console.error('❌ Failed to copy email:', err);
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('✅ Email copied to clipboard (fallback)');
    } catch (err) {
      console.error('❌ Failed to copy email:', err);
    }
    document.body.removeChild(textArea);
  }
}

// Add click listener to email links
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Don't prevent default, but also copy to clipboard
    copyEmailToClipboard();
  });
});

// ========================================
// ANALYTICS (Placeholder)
// ========================================

// Track page views
function trackPageView(page) {
  console.log(`📈 Page view: ${page}`);
  // Add your analytics code here (Google Analytics, Plausible, etc.)
  // Example: gtag('config', 'GA_MEASUREMENT_ID', {'page_path': page});
}

// Track events
function trackEvent(category, action, label) {
  console.log(`📊 Event: ${category} - ${action} - ${label}`);
  // Add your analytics code here
  // Example: gtag('event', action, {'event_category': category, 'event_label': label});
}

// Track link clicks
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    const text = link.textContent;
    trackEvent('Link Click', 'Click', `${text} - ${href}`);
  });
});

// Track form submissions
if (DOM.contactForm) {
  DOM.contactForm.addEventListener('submit', () => {
    trackEvent('Form', 'Submit', 'Contact Form');
  });
}

// ========================================
// BROWSER COMPATIBILITY WARNINGS
// ========================================

// Check for required features
const requiredFeatures = {
  'IntersectionObserver': typeof IntersectionObserver !== 'undefined',
  'Fetch API': typeof fetch !== 'undefined',
  'CSS Grid': CSS.supports('display', 'grid'),
  'CSS Custom Properties': CSS.supports('--custom', 'property')
};

console.log('🔍 Browser Feature Support:');
Object.entries(requiredFeatures).forEach(([feature, supported]) => {
  console.log(`${supported ? '✅' : '❌'} ${feature}: ${supported ? 'Supported' : 'Not Supported'}`);
});

// Warn users on very old browsers
const isOldBrowser = !requiredFeatures['IntersectionObserver'] || !requiredFeatures['Fetch API'];
if (isOldBrowser) {
  console.warn('⚠️ Your browser may not support all features. Please consider updating to a modern browser.');
}

// ========================================
// END OF SCRIPT
// ========================================

console.log('🚀 Portfolio JavaScript initialized successfully!');