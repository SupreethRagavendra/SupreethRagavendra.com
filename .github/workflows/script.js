'use strict';

/**
 * navbar toggle
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
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
  window.location.href = "https://drive.google.com/file/d/1xDgGlAUTnBCrtjy6yu6bkMWAvMMmOpfK/view?usp=sharing";
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