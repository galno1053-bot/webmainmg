// --- Year auto ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Fake status pulse ---
const status = document.getElementById('status-pill');
if (status){
  let ok = true;
  setInterval(()=>{
    ok = !ok;
    status.innerHTML = ok
      ? '<span class="dot dot-ok"></span><span>Status: Normal</span>'
      : '<span class="dot" style="background:#f59e0b"></span><span>Status: Degraded</span>';
  }, 9000);
}

// --- Mobile Menu ---
(function(){
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');

  console.log('Mobile menu elements:', { mobileMenuBtn, mobileNav, mobileNavBackdrop });

  function openMobileMenu() {
    console.log('Opening mobile menu');
    if (!mobileNav || !mobileNavBackdrop || !mobileMenuBtn) return;
    
    mobileNav.classList.add('active');
    mobileNavBackdrop.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    console.log('Closing mobile menu');
    if (!mobileNav || !mobileNavBackdrop || !mobileMenuBtn) return;
    
    mobileNav.classList.remove('active');
    mobileNavBackdrop.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    console.log('Toggle mobile menu clicked');
    if (!mobileNav || !mobileNavBackdrop || !mobileMenuBtn) {
      console.log('Mobile menu elements not found');
      return;
    }
    
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Event listeners
  if (mobileMenuBtn) {
    console.log('Adding click event listener to mobile menu button');
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  } else {
    console.log('Mobile menu button not found');
  }


  // Backdrop click
  if (mobileNavBackdrop) {
    console.log('Adding click event listener to mobile nav backdrop');
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking on nav links
  if (mobileNav) {
    const navLinks = mobileNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
})();

// --- Smooth Scroll Navigation ---
(function(){
  // Get all navigation links that point to sections
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior
      
      const targetId = this.getAttribute('href').substring(1); // Remove #
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calculate offset for fixed header if any
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll to target
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();