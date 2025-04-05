import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { router } from './utils/router.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const app = document.querySelector('#app');

// Renderiza estructura inicial
app.innerHTML = `
  ${renderNavbar()}
  <main id="main-content" class="p-6 min-h-[70vh] transition-colors duration-300"></main>
  ${renderFooter()}
`;

// Router y navegación
router();
window.addEventListener('hashchange', router);

// Tema claro/oscuro
document.addEventListener('click', (e) => {
  if (e.target.id === 'theme-toggle') {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    e.target.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
  }
});

// Exporta la función Swiper para usarla después del router
export function initializeSwiper() {
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
}
