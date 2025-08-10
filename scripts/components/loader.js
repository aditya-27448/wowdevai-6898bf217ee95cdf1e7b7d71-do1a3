export async function loadComponent(selector) {
  const container = document.querySelector(selector);
  if (!container) return;
  
  const source = container.getAttribute('data-source');
  if (!source) return;
  
  try {
    const response = await fetch(window.location.origin + '/api/preview-6898bf217ee95cdf1e7b7d71/' + source);
    const html = await response.text();
    container.innerHTML = html;
    
    // Initialize mobile menu toggle if navbar is loaded
    if (source.includes('navbar')) {
      initMobileMenu();
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuToggle.querySelector('i');
      const isOpen = !mobileMenu.classList.contains('hidden');
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createIcons();
    });
  }
}