'use strict';

/**
 * navbar toggle
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
  this.setAttribute('aria-expanded', this.classList.contains('active'));
});

/**
 * toggle the navbar when clicking any navbar link
 */
const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * back to top & header
 */
const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

const downloadCVBtn = document.getElementById("download-resume-btn");

if (downloadCVBtn) {
  downloadCVBtn.addEventListener("click", function (e) {
    // Prevent the default link behavior since we have href in HTML
    // The href will handle the navigation, this is just for analytics/tracking if needed
    console.log('Resume download initiated');
  });
}
document.addEventListener('DOMContentLoaded', function () {
    const animatedName = document.getElementById('animated-name');
    const spans = animatedName.querySelectorAll('span');
  
    let index = 0;
  
    function animateName() {
      if (index < spans.length) {
        spans[index].style.animationDelay = `${index * 0.1}s`;
        spans[index].style.opacity = '1';
        index++;
      } else {
        index = 0;
        setTimeout(() => {
          spans.forEach(span => {
            span.style.opacity = '0';
          });
          animateName();
        }, 1000); // Delay before restarting the animation
      }
    }
  
    animateName();
  });
  
// Animate your name on page load
const animatedName = document.getElementById("animated-name");

window.addEventListener("load", function () {
  animatedName.classList.add("animate__animated", "animate__fadeInUp");
});

// Accessible project modals
(function setupProjectModals() {
  const body = document.body;
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('[data-modal-close]');
  const titleEl = document.getElementById('project-modal-title');
  const descEl = document.getElementById('project-modal-desc');
  const imgEl = document.querySelector('.modal-image');
  const liveLink = document.querySelector('[data-modal-live]');
  const codeLink = document.querySelector('[data-modal-code]');
  let lastFocused = null;

  const projects = [
    {
      key: 'KASC-Hall App',
      title: 'KASC-Hall App',
      desc: 'Android app built with Java, XML, and Firebase to streamline hall bookings and reduce paperwork. Features centralized approvals and automated notifications.',
      image: 'images/projects/kasc.png',
      live: 'https://apkfab.com/kasc-hall/com.kasc.hall/apk',
      code: 'https://github.com/SupreethRagavendra/KASC-Hall-Management-App'
    },
    {
      key: 'Amazon Clone',
      title: 'Amazon Clone',
      desc: 'E-commerce website clone built with HTML and CSS. Non-functional UI that replicates Amazon\'s design for layout and responsive design practice.',
      image: 'images/projects/amazon-clone-original.jpg',
      live: 'https://amazonclone24222.netlify.app/',
      code: 'https://github.com/SupreethRagavendra/Amazon_Clone'
    },
    {
      key: 'Task Manager',
      title: 'Task Manager',
      desc: 'Simple task management application created using HTML, CSS, and Bootstrap. Features clean UI and responsive design for task organization.',
      image: 'images/projects/task-manager-original.png',
      live: 'https://main--musical-piroshki-9afb6d.netlify.app/',
      code: 'https://github.com/SupreethRagavendra/Task_manager'
    },
    {
      key: 'AI Tic-Tac-Toe Game',
      title: 'AI Tic-Tac-Toe Game',
      desc: 'AI-powered game with unbeatable algorithm using Minimax with alpha-beta pruning. Features multiple game modes including Human vs AI and Human vs Human with adjustable difficulty levels.',
      image: 'images/projects/AI Tic Tac Toe.png',
      live: 'https://colab.research.google.com/drive/1Pw9EL0YhKNBC6dSJDpA1feObekBDMhhz',
      code: 'https://colab.research.google.com/drive/1Pw9EL0YhKNBC6dSJDpA1feObekBDMhhz'
    },
    {
      key: 'Aromaticroot (Tezfo)',
      title: 'Aromaticroot Agriculture Platform',
      desc: 'Agriculture platform redesign with 40% faster load times and SEO optimization. Redesigned for 50+ monthly users, achieving improved performance through WebP image format conversion and code optimization.',
      image: 'images/projects/Herbal Products.png',
      live: 'https://aromaticroot.tezfo.com/',
      code: '#'
    },
    {
      key: 'Goodwayonlineservice (Tezfo)',
      title: 'Goodway Travel Booking Platform',
      desc: 'Travel booking website with WhatsApp integration handling 50+ concurrent users. Features responsive design, WhatsApp-based inquiry system processing 100+ daily requests, and cross-browser compatibility.',
      image: 'images/projects/Travel.png',
      live: 'https://goodwayonlineservice.com/',
      code: '#'
    },
    {
      key: 'Smart College Placement Learning Portal',
      title: 'Smart College Placement Learning Portal',
      desc: 'College placement preparation portal with learning modules and progress tracking. Currently in development - will feature interactive learning modules, practice tests, and personalized study plans.',
      image: 'images/projects/educational.png',
      live: '#',
      code: '#'
    }
  ];

  function trapFocus(e) {
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openModal(projectTitle) {
    const data = projects.find(p => p.key === projectTitle);
    if (!data) return;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    imgEl.src = data.image;
    imgEl.alt = data.title + ' screenshot';
    liveLink.href = data.live;
    codeLink.href = data.code;
    lastFocused = document.activeElement;
    overlay.hidden = false;
    modal.hidden = false;
    overlay.setAttribute('open', '');
    modal.setAttribute('open', '');
    closeBtn.focus();
    body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    overlay.hidden = true;
    modal.hidden = true;
    overlay.removeAttribute('open');
    modal.removeAttribute('open');
    body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', trapFocus);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-project-details]');
    if (btn) {
      const card = btn.closest('.project-card');
      const heading = card && card.querySelector('h4');
      if (heading) openModal(heading.textContent.trim());
    }
  });

  overlay && overlay.addEventListener('click', closeModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();

// Optional: simple scroll reveal
(function setupScrollReveal(){
  const elements = document.querySelectorAll('.section, .project-card, .service-card, .skill-card, .education-item, .testimonial');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => el.classList.add('reveal') && observer.observe(el));
})();

// Analytics helper (enable if GA is configured)
(function analytics(){
  const GA_ID = window.GA_ID || null; // set window.GA_ID = 'G-XXXXXXX' to enable
  if (!GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

/**
 * Certificate Modal Functions
 */
let currentCertificateUrl = '';

function openCertificateModal(imageUrl) {
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('certificateImage');
  
  currentCertificateUrl = imageUrl;
  modalImage.src = imageUrl;
  modal.classList.add('show');
  modal.style.display = 'flex';
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  // Add keyboard event listener for ESC key
  document.addEventListener('keydown', handleModalKeydown);
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  
  modal.classList.remove('show');
  
  // Add closing animation
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
  
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeCertificateModal();
  }
}

function downloadCertificate() {
  if (currentCertificateUrl) {
    const downloadBtn = document.querySelector('.certificate-download-btn');
    const downloadText = downloadBtn.querySelector('.download-text');
    const originalText = downloadText.textContent;
    
    // Show loading state
    downloadText.textContent = 'Saving...';
    downloadBtn.disabled = true;
    
    // Extract filename and create download name
    const filename = currentCertificateUrl.split('/').pop();
    const downloadName = `Supreeth_Certificate_${filename}`;
    
    // Create XMLHttpRequest to force download
    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentCertificateUrl, true);
    xhr.responseType = 'blob';
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = xhr.response;
        
        // Check if browser supports msSaveBlob (IE/Edge)
        if (window.navigator && window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, downloadName);
          downloadText.textContent = 'Saved!';
        } else {
          // Modern browsers
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          
          a.style.display = 'none';
          a.href = url;
          a.download = downloadName;
          
          // Force download by setting proper headers
          a.setAttribute('download', downloadName);
          a.setAttribute('type', 'application/octet-stream');
          
          document.body.appendChild(a);
          
          // Trigger download with timeout to ensure it works
          setTimeout(() => {
            a.click();
            
            setTimeout(() => {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }, 100);
          }, 10);
          
          downloadText.textContent = 'Saved to Downloads!';
        }
        
        // Reset button after success
        setTimeout(() => {
          downloadText.textContent = originalText;
          downloadBtn.disabled = false;
        }, 2500);
        
      } else {
        // If XHR fails, try direct approach
        forceDownloadFallback(downloadName, downloadText, downloadBtn, originalText);
      }
    };
    
    xhr.onerror = function() {
      // If XHR fails, try direct approach
      forceDownloadFallback(downloadName, downloadText, downloadBtn, originalText);
    };
    
    // Start the request
    xhr.send();
  }
}

function forceDownloadFallback(downloadName, downloadText, downloadBtn, originalText) {
  try {
    // Create canvas to convert image and force download
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert to blob and download
      canvas.toBlob(function(blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.style.display = 'none';
        a.href = url;
        a.download = downloadName;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        window.URL.revokeObjectURL(url);
        
        downloadText.textContent = 'Downloaded!';
        setTimeout(() => {
          downloadText.textContent = originalText;
          downloadBtn.disabled = false;
        }, 2500);
      }, 'image/jpeg', 0.9);
    };
    
    img.onerror = function() {
      // Last resort - open in new window with download attribute
      const link = document.createElement('a');
      link.href = currentCertificateUrl;
      link.download = downloadName;
      link.target = '_blank';
      link.rel = 'noopener';
      
      // Add specific attributes to force download
      link.setAttribute('download', downloadName);
      link.setAttribute('data-download', downloadName);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      downloadText.textContent = 'Check Downloads';
      setTimeout(() => {
        downloadText.textContent = originalText;
        downloadBtn.disabled = false;
      }, 3000);
    };
    
    img.src = currentCertificateUrl;
    
  } catch (error) {
    console.error('All download methods failed:', error);
    
    // Show user instruction
    alert('Download failed. Please right-click on the certificate image and select "Save image as..." to download manually.');
    
    downloadText.textContent = originalText;
    downloadBtn.disabled = false;
  }
}

// Close modal when clicking outside the modal content
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('certificateModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeCertificateModal();
      }
    });
  }
});

/**
 * Contact Form Handler
 */
(function setupContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = submitBtn.querySelector('.submit-text');
  const submitLoading = submitBtn.querySelector('.submit-loading');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    statusDiv.style.display = 'none';

    try {
      const formData = new FormData(form);
      
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success - show custom success message
        statusDiv.innerHTML = `
          <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
          </div>
        `;
        statusDiv.className = 'form-status success';
        statusDiv.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Scroll to success message
        statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error - show error message
      statusDiv.innerHTML = `
        <div class="form-error">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Oops! Something went wrong</h3>
          <p>Please try again or contact me directly at <a href="mailto:supreethvennila@gmail.com">supreethvennila@gmail.com</a></p>
        </div>
      `;
      statusDiv.className = 'form-status error';
      statusDiv.style.display = 'block';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      submitLoading.style.display = 'none';
    }
  });
})();