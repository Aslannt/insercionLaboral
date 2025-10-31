export function renderNavbar() {
  const userName = localStorage.getItem('nombreUsuario');

  return `
    <nav class="bg-blue-900 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <div class="font-bold text-lg">Plataforma de Inserción Laboral</div>

      <ul class="flex gap-6 text-sm">
  <li><a href="/#/" class="hover:underline">Inicio</a></li>
  <li><a href="/#/empleos" class="hover:underline">Empleos</a></li>
  <li><a href="/#/cursos" class="hover:underline">Cursos</a></li>
  <li><a href="/#/comunidad" class="hover:underline">Comunidad</a></li>
  <li><a href="/#/catalogo" class="hover:underline">Catálogo</a></li>
  <li><a href="/#/soporte" class="hover:underline">Soporte</a></li>
  <li>
    <a
      href="https://forms.gle/H8WX6xLLBGep7eeM7"
      class="hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Encuesta de satisfacción
    </a>
  </li>
</ul>

      <div class="flex items-center gap-2">
        <button id="theme-toggle" class="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-sm">
          🌙 Oscuro
        </button>

        ${userName ? `
          <span class="text-sm hidden sm:inline">👋 Hola, ${userName}</span>
          <button id="logout-btn" class="bg-blue-700 px-3 py-1 rounded hover:bg-blue-600 text-sm">
            Cerrar sesión
          </button>
        ` : `
          <a href="#/login" class="bg-blue-700 px-3 py-1 rounded hover:bg-blue-600 text-sm">
            Iniciar sesión
          </a>
        `}
      </div>
    </nav>
  `;
}
