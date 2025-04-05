import { initializeSwiper } from '../main.js';

export async function router() {
  const main = document.querySelector('#main-content');
  const hash = window.location.hash;

  let routePath;

  switch (hash) {
    case '#/empleos':
      routePath = '/src/pages/empleos.html';
      break;
    case '#/cursos':
      routePath = '/src/pages/cursos.html';
      break;
    case '#/comunidad':
      routePath = '/src/pages/comunidad.html';
      break;
    case '#/perfil':
      routePath = '/src/pages/perfil.html';
      break;
    case '#/register':
      routePath = '/src/pages/register.html';
      break;
    case '#/login':
      routePath = '/src/pages/login.html';
      break;
    case '#/inicio':
    case '':
    case '#/':
      routePath = '/src/pages/home.html';
      break;
    default:
      routePath = '/src/pages/home.html';
      break;
  }

  try {
    const response = await fetch(routePath);
    const html = await response.text();
    main.innerHTML = html;

    // Si la ruta cargada es home.html, inicializa Swiper
    if (
      hash === '#/' ||
      hash === '#/inicio' ||
      hash === '' ||
      routePath.includes('home.html')
    ) {
      setTimeout(() => {
        initializeSwiper();
      }, 100); // Asegura que el HTML esté inyectado antes
    }

  } catch (error) {
    main.innerHTML = `
      <div class="text-center p-10 text-red-500">
        <h2 class="text-2xl font-bold mb-2">Error cargando la página</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}
