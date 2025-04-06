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

    // Si es la página principal, inicializar swiper
    if (
      hash === '#/' ||
      hash === '#/inicio' ||
      hash === '' ||
      routePath.includes('home.html')
    ) {
      setTimeout(() => {
        initializeSwiper();
        import('/src/pages/estadisticas.js').then(mod => mod.mostrarEstadisticas());
      }, 100);
    }
    

    // Si es perfil, carga su módulo JS
    if (hash === '#/perfil') {
      import('/src/pages/perfil.js').then(mod => {
        setTimeout(() => mod.cargarPerfil(), 100);
      });
    }

    // Si es registro, carga su módulo JS
    if (hash === '#/register') {
      import('/src/pages/register.js').then(mod => {
        setTimeout(() => mod.iniciarRegistro(), 100);
      });
    }
    if (hash === '#/cursos') {
      import('/src/pages/cursos.js').then(mod => {
        setTimeout(() => mod.cargarCursos(), 100);
      });
    }

    if (hash === '#/empleos') {
      import('/src/pages/empleos.js').then(mod => {
        setTimeout(() => mod.cargarEmpleos(), 100);
      });
    }
    if (hash === '#/login') {
      import('/src/pages/login.js').then(mod => {
        setTimeout(() => mod.iniciarLogin(), 100);
      });
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
