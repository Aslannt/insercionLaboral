import { initializeSwiper } from '../main.js';

export async function router() {
  const main = document.querySelector('#main-content');

  // 👇 soporta hashes con query tipo #/soporte?svc=empleos
  const fullHash = window.location.hash || '#/';
  const baseHash = fullHash.split('?')[0]; // nos quedamos solo con la ruta

  let routePath;

  switch (baseHash) {
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
    case '#/catalogo':
      routePath = '/src/pages/catalogo.html';
      break;
    case '#/soporte':
      routePath = '/src/pages/soporte.html';
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

    // Home
    if (
      baseHash === '#/' ||
      baseHash === '#/inicio' ||
      baseHash === '' ||
      routePath.includes('home.html')
    ) {
      setTimeout(() => {
        initializeSwiper();
        import('/src/pages/estadisticas.js').then(mod => mod.mostrarEstadisticas());
      }, 100);
    }

    // Perfil
    if (baseHash === '#/perfil') {
      import('/src/pages/perfil.js').then(mod => {
        setTimeout(() => mod.cargarPerfil(), 100);
      });
    }

    // Registro
    if (baseHash === '#/register') {
      import('/src/pages/register.js').then(mod => {
        setTimeout(() => mod.iniciarRegistro(), 100);
      });
    }

    // Cursos
    if (baseHash === '#/cursos') {
      import('/src/pages/cursos.js').then(mod => {
        setTimeout(() => mod.cargarCursos(), 100);
      });
    }

    // Empleos
    if (baseHash === '#/empleos') {
      import('/src/pages/empleos.js').then(mod => {
        setTimeout(() => mod.cargarEmpleos(), 100);
      });
    }

    // Login
    if (baseHash === '#/login') {
      import('/src/pages/login.js').then(mod => {
        setTimeout(() => mod.iniciarLogin(), 100);
      });
    }

    // Catálogo
    if (baseHash === '#/catalogo') {
      import('/src/pages/catalogo.js').then(mod => {
        setTimeout(() => mod.iniciarCatalogo(), 50);
      });
    }

    // Soporte
    if (baseHash === '#/soporte') {
      import('/src/pages/soporte.js').then(mod => {
        setTimeout(() => mod.iniciarSoporte(), 50);
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
