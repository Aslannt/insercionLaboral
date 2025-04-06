import { mostrarToast } from '../components/toast.js';

export function cargarEmpleos() {
  const empleos = [
    {
      id: 'empleo1',
      icono: '🧾',
      titulo: 'Asistente Administrativo',
      empresa: 'Empresa XYZ - Bogotá',
      descripcion: 'Manejo de agenda, correspondencia y apoyo en actividades administrativas.',
      fecha: '03/04/2025',
      imagen: '/src/assets/img/empleos/asistente.jpg'
    },
    {
      id: 'empleo2',
      icono: '🏭',
      titulo: 'Operario de Producción',
      empresa: 'Industria Textil Andina - Medellín',
      descripcion: 'Trabajo en línea de producción, empaques y control de calidad.',
      fecha: '02/04/2025',
      imagen: '/src/assets/img/empleos/operario.jpg'
    },
    {
      id: 'empleo3',
      icono: '🚚',
      titulo: 'Auxiliar Logístico',
      empresa: 'Aliados Logísticos SAS - Cali',
      descripcion: 'Recepción, almacenamiento y despacho de mercancía.',
      fecha: '01/04/2025',
      imagen: '/src/assets/img/empleos/logistica.jpg'
    }
  ];

  const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
  const contenedor = document.getElementById('contenedor-empleos');
  contenedor.innerHTML = '';

  empleos.forEach(emp => {
    const yaPostulado = postulaciones.includes(emp.titulo);
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-xl transition-transform hover:scale-105 flex flex-col';
    card.setAttribute('data-aos', 'fade-up');

    card.innerHTML = `
      <img src="${emp.imagen}" alt="${emp.titulo}" class="w-full h-40 object-cover rounded mb-4">
      <div class="flex-grow">
        <h3 class="text-xl font-semibold mb-1">${emp.titulo}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${emp.empresa}</p>
        <p class="text-sm mb-4">${emp.descripcion}</p>
      </div>
      ${
        yaPostulado
          ? `<button class="bg-gray-500 text-white py-2 px-4 rounded mt-4 cursor-not-allowed" disabled>Postulado</button>`
          : `<button class="postular-btn bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded mt-4" data-id="${emp.id}" data-info="${emp.titulo} - ${emp.empresa} (📅 ${emp.fecha})">Postularme</button>`
      }
    `;

    contenedor.appendChild(card);
  });

  document.querySelectorAll('.postular-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const info = btn.dataset.info;
      const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
      if (!postulaciones.includes(info)) {
        postulaciones.push(info);
        localStorage.setItem('postulaciones', JSON.stringify(postulaciones));
        mostrarToast('Postulación enviada con éxito ✅');
        cargarEmpleos();
      }
    });
  });
}
