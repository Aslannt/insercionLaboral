import { obtenerEstadisticas } from '../components/stats.js';

export function mostrarEstadisticas() {
  const datos = obtenerEstadisticas();
  const contenedor = document.getElementById('contenedor-estadisticas');

  if (!contenedor) return;

  contenedor.innerHTML = `
    <div>
      <p class="text-3xl font-bold text-blue-800 dark:text-blue-100">${datos.usuarios}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Usuarios registrados</p>
    </div>
    <div>
      <p class="text-3xl font-bold text-blue-800 dark:text-blue-100">${datos.cursosDisponibles}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Cursos disponibles</p>
    </div>
    <div>
      <p class="text-3xl font-bold text-blue-800 dark:text-blue-100">${datos.cursosCompletados}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Cursos completados</p>
    </div>
    <div>
      <p class="text-3xl font-bold text-blue-800 dark:text-blue-100">${datos.postulaciones}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Postulaciones realizadas</p>
    </div>
  `;
}
