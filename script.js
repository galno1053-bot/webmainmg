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

  function toggleMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;
    
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
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
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