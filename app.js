// FUNCIÓN PARA MANEJAR LAS TABS DE PROYECCIÓN - FUERA DEL DOMContentLoaded
function showTab(tabName) {
  // Ocultar todas las tabs
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remover clase active de todos los botones
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Mostrar la tab seleccionada
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Activar el botón correspondiente
  event.target.classList.add('active');
  
  console.log('Tab cambiada a:', tabName); // Para debug
}

// Animaciones suaves sin interferir con el scroll
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer principal para animaciones
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animaciones a secciones principales
    const sectionsToAnimate = document.querySelectorAll('section, .card, .feature-box');
    sectionsToAnimate.forEach(el => observer.observe(el));

    // Observer para testimonios
    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const testimonialCards = entry.target.querySelectorAll('.testimonial-card');
                testimonialCards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('fade-in'), index * 150);
                });
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer para galería
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => item.classList.add('fade-in'), index * 150);
                });
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer para formulario
    const formObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                formObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer para listas
    const listObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => item.classList.add('slide-in'), index * 50);
                });
                listObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar observers
    const testimonialSection = document.querySelector('.testimonios');
    if (testimonialSection) testimonialObserver.observe(testimonialSection);

    const gallerySection = document.querySelector('.galeria');
    if (gallerySection) galleryObserver.observe(gallerySection);

    const formSection = document.querySelector('.contacto-formulario');
    if (formSection) {
        formSection.style.opacity = '0';
        formSection.style.transform = 'translateY(20px)';
        formSection.style.transition = 'all 0.6s ease';
        formObserver.observe(formSection);
    }

    const lists = document.querySelectorAll('.objetivos-list, .beneficios-list, .audiencia-list, .steps-list');
    lists.forEach(list => listObserver.observe(list));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Efecto ripple en botones
    const buttons = document.querySelectorAll('.cta, .btn-cta, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Formulario
    const form = document.querySelector('.formulario');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email1 = document.getElementById('email').value;
            const email2 = document.getElementById('email2').value;
            
            if (email1 !== email2) {
                alert('Los correos electrónicos no coinciden');
                return;
            }
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Enviado correctamente';
                submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Preload de imágenes
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                console.log('Error cargando imagen:', this.src);
                this.src = 'https://via.placeholder.com/400x250/2a2a4a/f86800?text=Imagen+no+disponible';
                this.classList.add('loaded');
            });
        }
    });

    // Videos de YouTube
    const videoWrappers = document.querySelectorAll('.video-wrapper iframe');
    videoWrappers.forEach(iframe => {
        iframe.style.opacity = '1';
        iframe.style.transition = 'opacity 0.5s ease';
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // SISTEMA DE PARTÍCULAS - TODAS LAS DIRECCIONES
    function createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        document.body.appendChild(particleContainer);

        const particles = [];
        const particleCount = 100;
        const movementTypes = [
            'from-top', 'from-bottom', 'from-left', 'from-right', 'from-center',
            'diagonal-tl-br', 'diagonal-tr-bl', 'diagonal-bl-tr', 'diagonal-br-tl', 'circular'
        ];

        for (let i = 0; i < particleCount; i++) {
            createParticle(i);
        }

        function createParticle(index) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const movementType = movementTypes[index % movementTypes.length];
            particle.classList.add(movementType);
            
            const size = 3 + Math.random() * 8;
            let startX, startY;
            
            switch(movementType) {
                case 'from-top':
                    startX = Math.random() * window.innerWidth;
                    startY = -100;
                    break;
                case 'from-bottom':
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 100;
                    break;
                case 'from-left':
                    startX = -100;
                    startY = Math.random() * window.innerHeight;
                    break;
                case 'from-right':
                    startX = window.innerWidth + 100;
                    startY = Math.random() * window.innerHeight;
                    break;
                case 'from-center':
                    startX = window.innerWidth / 2;
                    startY = window.innerHeight / 2;
                    break;
                case 'diagonal-tl-br':
                    startX = -100;
                    startY = -100;
                    break;
                case 'diagonal-tr-bl':
                    startX = window.innerWidth + 100;
                    startY = -100;
                    break;
                case 'diagonal-bl-tr':
                    startX = -100;
                    startY = window.innerHeight + 100;
                    break;
                case 'diagonal-br-tl':
                    startX = window.innerWidth + 100;
                    startY = window.innerHeight + 100;
                    break;
                case 'circular':
                    startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
                    startY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
                    break;
                default:
                    startX = Math.random() * window.innerWidth;
                    startY = Math.random() * window.innerHeight;
            }
            
            const opacity = 0.3 + Math.random() * 0.7;
            const animationDuration = 20 + Math.random() * 25;
            const animationDelay = Math.random() * -40;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.opacity = opacity;
            particle.style.animationDuration = animationDuration + 's';
            particle.style.animationDelay = animationDelay + 's';
            
            particle.dataset.movementType = movementType;
            
            particleContainer.appendChild(particle);
            particles.push(particle);
        }

        console.log('✨ Sistema de partículas activado con', particleCount, 'partículas');
    }

    // Inicializar partículas
    createParticleSystem();

    // Móviles
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const mobileObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    mobileObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const keyElements = document.querySelectorAll('h1, h2, p, .card, .feature-box');
        keyElements.forEach(el => mobileObserver.observe(el));
    }

    // Inicializar tabs después de que el DOM esté cargado
    console.log('DOM cargado, verificando tabs...');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    console.log('Botones encontrados:', tabButtons.length);
    console.log('Contenidos encontrados:', tabContents.length);
});