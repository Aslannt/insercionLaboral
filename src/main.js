import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { router } from './utils/router.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// NUEVO:
import {
  auth, onAuthChanged, logout
} from './firebase.js';


const app = document.querySelector('#app');

// Función para renderizar toda la estructura principal (navbar + main + footer)
function renderLayout() {
  app.innerHTML = `
    ${renderNavbar()}
    <main id="main-content" class="p-6 min-h-[70vh] transition-colors duration-300"></main>
    ${renderFooter()}
  `;
}

// Renderiza layout inicial
renderLayout();

// Router y navegación
router();
window.addEventListener('hashchange', () => {
  renderLayout();   // Vuelve a renderizar el navbar actualizado
  router();
  setTimeout(() => {
    initializeSwiper();
  }, 100);
});

// Modo claro / oscuro y logout
document.addEventListener('click', (e) => {
  if (e.target.id === 'theme-toggle') {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    e.target.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
  }

  if (e.target.id === 'logout-btn') {
    localStorage.removeItem('nombreUsuario');
    renderLayout();
    router();
  }
});


// Reemplaza dentro de document.addEventListener('click', ...)
if (e.target.id === 'logout-btn') {
  await logout();                 // <-- usar Firebase
  localStorage.removeItem('nombreUsuario'); // opcional limpiar cache UI
  renderLayout();
  // justo después de renderLayout() y antes/igual que router();
onAuthChanged((user) => {
  if (user) {
    localStorage.setItem('nombreUsuario', user.displayName || user.email);
  } else {
    localStorage.removeItem('nombreUsuario');
  }
  renderLayout();
  router();
});

  router();
}


// Swiper dinámico en secciones como Home
window.addEventListener('DOMContentLoaded', () => {
  initializeSwiper();  // Swiper para sliders
  AOS.init();          // AOS para animaciones al hacer scroll

  // Lógica del registro
  if (location.hash === '#/register') {
    const form = document.querySelector('#register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const area = form.area.value.trim();

        if (!nombre || !email || !area) {
          alert('Por favor completa todos los campos.');
          return;
        }

        localStorage.setItem('nombreUsuario', nombre);
        alert('Registro exitoso');

        location.hash = '#/';
        location.reload();
      });
    }
  }
});


// Función para activar Swipers después del router
export function initializeSwiper() {
  // Carrusel de historias de impacto
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      modules: [Autoplay, Pagination, Navigation],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  // Carrusel de aliados estratégicos
  if (document.querySelector('.aliadosSwiper')) {
    new Swiper('.aliadosSwiper', {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      slidesPerView: 2,
      breakpoints: {
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      }
    });
  }
}
