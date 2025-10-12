// Configuración general
const config = {
  observerOptions: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
};

// Utilidades
const utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};

// Gestor del cursor personalizado
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.isVisible = true;
    this.init();
  }

  init() {
    if (!this.cursor) return;

    const updateCursor = utils.throttle((e) => {
      if (this.isVisible) {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
      }
    }, 16);

    document.addEventListener('mousemove', updateCursor);
    
    // Ocultar cursor en dispositivos táctiles
    document.addEventListener('touchstart', () => {
      this.hide();
    });

    // Efectos de hover
    this.addHoverEffects();
  }

  addHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.cursor.style.background = 'rgba(94, 234, 212, 0.3)';
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.cursor.style.background = 'rgba(94, 234, 212, 0.15)';
      });
    });
  }

  hide() {
    this.isVisible = false;
    this.cursor.style.opacity = '0';
  }

  show() {
    this.isVisible = true;
    this.cursor.style.opacity = '1';
  }
}

// Gestor de navegación
class NavigationManager {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    this.sidebar = document.getElementById('sidebar');
    this.init();
  }

  init() {
    this.setupScrollSpy();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    this.highlightActiveSection();
  }

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(id);
        }
      });
    }, config.observerOptions);

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerOffset = 100;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Cerrar menú móvil si está abierto
          this.closeMobileMenu();
        }
      });
    });
  }

  setupMobileMenu() {
    if (this.mobileMenuToggle && this.sidebar) {
      this.mobileMenuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Cerrar menú al hacer click fuera
      document.addEventListener('click', (e) => {
        if (!this.sidebar.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });

      // Cerrar menú con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    this.sidebar.classList.toggle('open');
    this.mobileMenuToggle.classList.toggle('active');
  }

  closeMobileMenu() {
    this.sidebar.classList.remove('open');
    this.mobileMenuToggle.classList.remove('active');
  }

  highlightActiveSection() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }
}

// Gestor de animaciones
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupTypingEffect();
    this.setupCounterAnimations();
  }

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.project-card, .skill-category, .timeline-item, .contact-item'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
          }, index * 100);
        }
      });
    }, config.observerOptions);

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      observer.observe(element);
    });
  }

  setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title-highlight');
    if (!heroTitle) {
      console.warn('No se encontró el elemento .hero-title-highlight para el efecto de escritura.');
      return;
    }

    const dataWords = heroTitle.getAttribute('data-words');
    const phrases = dataWords
      ? dataWords.split('|').map(s => s.trim()).filter(Boolean)
      : [
          'Cristian Lozada',
          'Crissoft',
          'Desarrollador',
          'Creador de experiencias'
        ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 70;
    const deleteSpeed = 40;
    const betweenWordsDelay = 1000;

    const tick = () => {
      const current = phrases[phraseIndex] || '';
      if (!deleting) {
        heroTitle.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, betweenWordsDelay);
          return;
        }
      } else {
        heroTitle.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    heroTitle.textContent = '';
    setTimeout(tick, 500);
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalNumber = parseInt(target.textContent);
          this.animateCounter(target, 0, finalNumber, 2000);
        }
      });
    }, config.observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = current + (element.textContent.includes('+') ? '+' : '');
      
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}

// Gestor de rendimiento
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    const criticalResources = [
      'assets/Cristian_lozada_curriculumVitae.pdf'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.pdf') ? 'document' : 'image';
      document.head.appendChild(link);
    });
  }
}

// Gestor de tema
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupThemeToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  }

  setupThemeToggle() {
    // Si decides agregar un botón de cambio de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }
}

// Inicialización de la aplicación
class App {
  constructor() {
    this.init();
  }

  init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Inicializar todos los gestores
      this.cursor = new CustomCursor();
      this.navigation = new NavigationManager();
      this.animations = new AnimationManager();
      this.performance = new PerformanceManager();
      this.theme = new ThemeManager();

      // Marcar la primera sección como visible
      const firstSection = document.querySelector('section');
      if (firstSection) {
        firstSection.classList.add('fade-in');
      }

      console.log('Portfolio inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar el portfolio:', error);
    }
  }
}

// Inicializar la aplicación
new App();

// Exponer funciones globales si es necesario
window.portfolioApp = {
  scrollToSection: (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// Agregar al final de script.js temporalmente para debuggear

// document.addEventListener('DOMContentLoaded', function() {
//   // Verificar el contenido del título
//   const heroTitle = document.querySelector('.hero-title');
//   if (heroTitle) {
//     console.log('Contenido actual:', heroTitle.innerHTML);
//     console.log('Contenido texto:', heroTitle.textContent);
    
//     // Forzar el contenido correcto si es necesario
//     heroTitle.innerHTML = 'Hola, soy <span class="highlight">Cristian Lozada</span>';
//   }
// });