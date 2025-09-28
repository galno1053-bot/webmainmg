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

  console.log('Mobile menu elements:', { mobileMenuBtn, mobileNav });

  function toggleMobileMenu() {
    console.log('Toggle mobile menu clicked');
    if (!mobileMenuBtn || !mobileNav) {
      console.log('Mobile menu elements not found');
      return;
    }
    
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
      // Close menu
      mobileNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // Open menu
      mobileNav.classList.add('active');
      mobileMenuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('Menu opened, classes added:', {
        mobileNavClasses: mobileNav.className,
        mobileMenuBtnClasses: mobileMenuBtn.className
      });
    }
  }

  function closeMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;
    mobileNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners
  if (mobileMenuBtn) {
    console.log('Adding click event listener to mobile menu button');
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  } else {
    console.log('Mobile menu button not found');
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

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('active')) {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });
})();