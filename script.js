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
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

const downloadCVBtn = document.getElementById("download-resume-btn");

downloadCVBtn.addEventListener("click", function () {
  // Replace the URL below with the actual link to your CV
  window.open("https://drive.google.com/file/d/1xDgGlAUTnBCrtjy6yu6bkMWAvMMmOpfK/view?usp=sharing", "_blank", "noopener,noreferrer");
});
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
      desc: 'Android app to streamline hall bookings. Built with Java, XML, and Firebase. Centralized approvals and reduced manual steps.',
      image: 'kasc.png',
      live: 'https://apkfab.com/kasc-hall/com.kasc.hall/apk',
      code: 'https://github.com/SupreethRagavendra/KASC-Hall-Management-App'
    },
    {
      key: 'Amazon Clone',
      title: 'Amazon Clone',
      desc: 'Non-functional UI clone of Amazon for practice in layout and responsive design using HTML & CSS.',
      image: 'https://res.cloudinary.com/do40wkay9/image/upload/v1736522166/e27c62140935825.624af8b4ce37e_qzilpl.jpg',
      live: 'https://amazonclone24222.netlify.app/',
      code: 'https://github.com/SupreethRagavendra/Amazon_Clone'
    },
    {
      key: 'Task Manager',
      title: 'Task Manager',
      desc: 'Responsive Task Manager built with HTML, CSS, and Bootstrap. Focused on clean UX and simple state handling.',
      image: 'https://res.cloudinary.com/do40wkay9/image/upload/v1736523957/task-management-system-screenshot-1_ubqz1x.png',
      live: 'https://main--musical-piroshki-9afb6d.netlify.app/',
      code: 'https://github.com/SupreethRagavendra/Task_manager'
    },
    {
      key: 'AI Tic-Tac-Toe Game',
      title: 'AI Tic-Tac-Toe Game',
      desc: 'Advanced AI game using Minimax algorithm with alpha-beta pruning for unbeatable gameplay. Features multiple game modes including Human vs AI and Human vs Human with adjustable difficulty levels. Achieved 75% reduction in computation time through algorithm optimization.',
      image: 'images/projects/tic-tac-toe-ai.jpg',
      live: 'https://colab.research.google.com/drive/1Pw9EL0YhKNBC6dSJDpA1feObekBDMhhz',
      code: 'https://colab.research.google.com/drive/1Pw9EL0YhKNBC6dSJDpA1feObekBDMhhz'
    },
    {
      key: 'Aromaticroot (Tezfo)',
      title: 'Aromaticroot Agriculture Platform',
      desc: 'Redesigned agriculture products platform serving 50+ monthly users with 40% faster load times. Implemented WebP image format conversion, advanced CSS animations, and SEO strategies that boosted search rankings by 60%. Focus on user experience and performance optimization.',
      image: 'images/projects/agriculture-platform.jpg',
      live: 'https://aromaticroot.tezfo.com/',
      code: '#'
    },
    {
      key: 'Goodwayonlineservice (Tezfo)',
      title: 'Goodway Travel Booking Platform',
      desc: 'Comprehensive travel booking website handling 50+ concurrent users with integrated WhatsApp-based inquiry system processing 100+ daily requests. Features responsive wireframes designed using AI-powered Figma plugins, advanced CSS animations, SEO optimization, and cross-browser compatibility across 8+ browsers.',
      image: 'images/projects/travel-booking.jpg',
      live: 'https://goodwayonlineservice.com/',
      code: '#'
    },
    {
      key: 'Smart College Placement Learning Portal',
      title: 'Smart College Placement Learning Portal',
      desc: 'Currently in development - A comprehensive learning portal designed to enhance college placement preparation. Will feature interactive learning modules, practice tests, mock interviews, progress tracking, and personalized study plans for students to improve their placement success rates.',
      image: 'images/projects/college-portal.jpg',
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