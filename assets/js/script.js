// ========================================================================
// MODERN PROFESSIONAL PORTFOLIO - JAVASCRIPT
// Enhanced interactions and smooth animations
// ========================================================================

'use strict';

// ========================================================================
// DOM ELEMENTS
// ========================================================================

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
  projectCards: document.querySelectorAll('.project-card'),
  
  // Certificate Modal
  certificateModal: document.getElementById('certificateModal'),
  certificateImage: document.getElementById('certificateImage'),
  
  // Contact Form
  contactForm: document.getElementById('contact-form'),
  formStatus: document.getElementById('form-status'),
  submitBtn: document.getElementById('submit-btn')
};

// ========================================================================
// INITIALIZATION
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio initialized');
  
  initNavigation();
  initScrollEffects();
  initAOS();
  initProjectFilters();
  initFormHandling();
  initSmoothScroll();
  initBackToTop();
  initCertificateModal();
  initAnimatedCounters();
});

// ========================================================================
// NAVIGATION
// ========================================================================

function initNavigation() {
  // Mobile menu toggle
  if (DOM.navToggleBtn && DOM.navbar) {
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
    if (DOM.navbar && DOM.navToggleBtn) {
      if (!DOM.navbar.contains(e.target) && !DOM.navToggleBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
}

function toggleMobileMenu() {
  if (!DOM.navbar || !DOM.navToggleBtn) return;
  
  const isActive = DOM.navbar.classList.toggle('active');
  DOM.navToggleBtn.setAttribute('aria-expanded', isActive.toString());
  
  // Toggle icons
  const menuIcon = DOM.navToggleBtn.querySelector('.menu-icon');
  const closeIcon = DOM.navToggleBtn.querySelector('.close-icon');
  
  if (menuIcon && closeIcon) {
    if (isActive) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMobileMenu() {
  if (!DOM.navbar || !DOM.navToggleBtn) return;
  
  DOM.navbar.classList.remove('active');
  DOM.navToggleBtn.setAttribute('aria-expanded', 'false');
  
  const menuIcon = DOM.navToggleBtn.querySelector('.menu-icon');
  const closeIcon = DOM.navToggleBtn.querySelector('.close-icon');
  
  if (menuIcon && closeIcon) {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
  
  document.body.style.overflow = '';
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
    
    if (correspondingLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        correspondingLink.classList.add('active');
      } else {
        correspondingLink.classList.remove('active');
      }
    }
  });
}

// ========================================================================
// SCROLL EFFECTS
// ========================================================================

function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    // Header effects
    if (DOM.header) {
      if (currentScroll > 50) {
        DOM.header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        DOM.header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }
      
      // Hide/show header on scroll
      if (currentScroll > lastScroll && currentScroll > 200) {
        DOM.header.style.transform = 'translateY(-100%)';
      } else {
        DOM.header.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  }, 100));
}

// ========================================================================
// ANIMATE ON SCROLL (AOS)
// ========================================================================

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 50,
      disable: false
    });
    
    // Refresh AOS after images load
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }
}

// ========================================================================
// PROJECT FILTERS
// ========================================================================

function initProjectFilters() {
  if (DOM.filterBtns.length === 0 || DOM.projectCards.length === 0) return;
  
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
}

function filterProjects(filter) {
  let visibleCount = 0;
  
  DOM.projectCards.forEach((card) => {
    const categories = card.getAttribute('data-category');
    
    if (!categories) return;
    
    const categoryList = categories.split(' ');
    const shouldShow = filter === 'all' || categoryList.includes(filter);
    
    if (shouldShow) {
      // Show with stagger
      setTimeout(() => {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      }, visibleCount * 50);
      visibleCount++;
    } else {
      // Hide immediately
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
  
  // Refresh AOS after filtering
  if (typeof AOS !== 'undefined') {
    setTimeout(() => AOS.refresh(), 350);
  }
}

// ========================================================================
// FORM HANDLING
// ========================================================================

function initFormHandling() {
  if (!DOM.contactForm) return;
  
  DOM.contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!DOM.submitBtn || !DOM.formStatus) return;
  
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
      showFormStatus('success', '✓ Thank you! Your message has been sent successfully.');
      DOM.contactForm.reset();
      
      // Track successful submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'Contact',
          'event_label': 'Success'
        });
      }
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus('error', '✗ Oops! There was a problem. Please try again or email directly.');
    
    // Track failed submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        'event_category': 'Contact',
        'event_label': 'Error'
      });
    }
  } finally {
    // Reset button state
    if (submitText) submitText.style.display = 'inline-block';
    if (submitLoading) submitLoading.style.display = 'none';
    DOM.submitBtn.disabled = false;
  }
}

function showFormStatus(type, message) {
  if (!DOM.formStatus) return;
  
  DOM.formStatus.className = `form-status ${type}`;
  DOM.formStatus.textContent = message;
  DOM.formStatus.style.display = 'block';
  
  // Scroll to status message
  DOM.formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide status after 5 seconds
  setTimeout(() => {
    DOM.formStatus.style.display = 'none';
  }, 5000);
}

// ========================================================================
// SMOOTH SCROLL
// ========================================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignore empty hash links
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Dynamic header offset based on header height
        const headerHeight = DOM.header ? DOM.header.offsetHeight : 80;
        const headerOffset = headerHeight + 20; // Add extra spacing
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// ========================================================================
// BACK TO TOP BUTTON
// ========================================================================

function initBackToTop() {
  if (!DOM.backToTopBtn) return;
  
  // Show/hide back to top button
  window.addEventListener('scroll', throttle(() => {
    if (window.pageYOffset > 300) {
      DOM.backToTopBtn.classList.add('active');
    } else {
      DOM.backToTopBtn.classList.remove('active');
    }
  }, 100));
  
  // Scroll to top functionality
  DOM.backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================================================
// CERTIFICATE MODAL
// ========================================================================

function initCertificateModal() {
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.certificateModal) {
      closeCertificateModal();
    }
  });
  
  // Close modal on background click
  if (DOM.certificateModal) {
    DOM.certificateModal.addEventListener('click', (e) => {
      if (e.target === DOM.certificateModal) {
        closeCertificateModal();
      }
    });
  }
}

function openCertificateModal(imageSrc) {
  if (!DOM.certificateModal || !DOM.certificateImage || !imageSrc) {
    console.warn('Certificate modal elements not found or no image source provided');
    return;
  }
  
  DOM.certificateImage.src = imageSrc;
  DOM.certificateModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Add animation
  setTimeout(() => {
    DOM.certificateModal.classList.add('show');
  }, 10);
  
  // Track certificate view
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_certificate', {
      'event_category': 'Engagement',
      'event_label': imageSrc
    });
  }
}

function closeCertificateModal() {
  if (!DOM.certificateModal) return;
  
  DOM.certificateModal.classList.remove('show');
  setTimeout(() => {
    DOM.certificateModal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function downloadCertificate() {
  if (!DOM.certificateImage) {
    console.warn('Certificate image not found');
    return;
  }
  
  const imageSrc = DOM.certificateImage.src;
  if (!imageSrc) return;
  
  // Create temporary link for download
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = `certificate-${Date.now()}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Track download
  if (typeof gtag !== 'undefined') {
    gtag('event', 'download_certificate', {
      'event_category': 'Engagement',
      'event_label': imageSrc
    });
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.openCertificateModal = openCertificateModal;
  window.closeCertificateModal = closeCertificateModal;
  window.downloadCertificate = downloadCertificate;
}

// ========================================================================
// ANIMATED COUNTERS
// ========================================================================

function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
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
  const text = element.textContent;
  const target = parseInt(text);
  
  if (isNaN(target)) return;
  
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

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================

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

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
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

// ========================================================================
// LAZY LOAD IMAGES
// ========================================================================

if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        // Add loaded class when image loads
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
          img.classList.add('loaded');
        }
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Handle immediate image loading for eager loaded images
document.querySelectorAll('img[loading="eager"]').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  }
});

// ========================================================================
// KEYBOARD NAVIGATION
// ========================================================================

document.addEventListener('keydown', (e) => {
  // Escape key closes modal
  if (e.key === 'Escape') {
    closeCertificateModal();
  }
});

// ========================================================================
// PERFORMANCE MONITORING
// ========================================================================

window.addEventListener('load', () => {
  // Log page load time
  if (performance && performance.timing) {
    // Wait for loadEventEnd to be available
    setTimeout(() => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      if (loadTime > 0) {
        console.log(`⏱️ Page load time: ${loadTime}ms`);
        
        // Track in analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            'name': 'load',
            'value': loadTime,
            'event_category': 'Performance'
          });
        }
      }
    }, 0);
  }
  
  // Refresh AOS after all content loads
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
  
  console.log('✅ Portfolio fully loaded');
});

// ========================================================================
// ERROR HANDLING
// ========================================================================

window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ========================================================================
// SERVICE WORKER (PWA Support)
// ========================================================================

// Service Worker disabled - uncomment when sw.js is created
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('ServiceWorker registered:', registration))
      .catch(err => console.log('ServiceWorker registration failed:', err));
  });
}
*/

// ========================================================================
// NETWORK STATUS
// ========================================================================

window.addEventListener('online', () => {
  console.log('🟢 You are online');
});

window.addEventListener('offline', () => {
  console.log('🔴 You are offline');
});

// ========================================================================
// VISIBILITY CHANGE
// ========================================================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Tab is hidden');
  } else {
    console.log('Tab is visible');
    // Refresh AOS when tab becomes visible
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
});

// ========================================================================
// COPY EMAIL TO CLIPBOARD
// ========================================================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  // Add copy functionality on double-click
  link.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const email = link.href.replace('mailto:', '');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          console.log('✅ Email copied to clipboard');
          // You could show a toast notification here
        })
        .catch(err => console.error('❌ Failed to copy email:', err));
    }
  });
});

// ========================================================================
// CONSOLE MESSAGE
// ========================================================================

console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cWelcome to my portfolio! Feel free to explore the code.', 'font-size: 14px; color: #10b981;');
console.log('%c📧 Want to work together? Reach out at supreethvennila@gmail.com', 'font-size: 12px; color: #64748b;');

// ========================================================================
// ANALYTICS TRACKING
// ========================================================================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.textContent.trim();
    const href = this.getAttribute('href');
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        'event_category': 'Engagement',
        'event_label': text,
        'value': href
      });
    }
  });
});

// Track social link clicks
document.querySelectorAll('.social-icon, .footer-social-link').forEach(link => {
  link.addEventListener('click', function() {
    const href = this.getAttribute('href');
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'social_click', {
        'event_category': 'Social',
        'event_label': href
      });
    }
  });
});

// Track project link clicks
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', function() {
    const projectCard = this.closest('.project-card');
    const projectTitle = projectCard ? projectCard.querySelector('.project-title')?.textContent : 'Unknown';
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'project_click', {
        'event_category': 'Projects',
        'event_label': projectTitle
      });
    }
  });
});

// ========================================================================
// END OF SCRIPT
// ========================================================================

console.log('🚀 Portfolio JavaScript initialized successfully!');
