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

  let scrollPosition = 0;

  function openMobileMenu() {
    console.log('Opening mobile menu');
    if (!mobileNav || !mobileNavBackdrop || !mobileMenuBtn) return;
    
    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    mobileNav.classList.add('active');
    mobileNavBackdrop.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }

  function closeMobileMenu() {
    console.log('Closing mobile menu');
    if (!mobileNav || !mobileNavBackdrop || !mobileMenuBtn) return;
    
    mobileNav.classList.remove('active');
    mobileNavBackdrop.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
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

// --- Copy Contract Address ---
(function(){
  const copyBtn = document.getElementById('copy-btn');
  const contractAddress = document.getElementById('contract-address');
  
  if (copyBtn && contractAddress) {
    copyBtn.addEventListener('click', async function() {
      const address = contractAddress.textContent;
      
      try {
        await navigator.clipboard.writeText(address);
        
        // Visual feedback
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        copyBtn.style.background = 'rgba(125,0,204,0.8)';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.background = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          copyBtn.style.background = 'rgba(125,0,204,0.8)';
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
          }, 2000);
        } catch (fallbackErr) {
          console.error('Fallback copy failed:', fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    });
  }
})();