export function cargarEmpleos() {
    const empleos = [
      {
        id: 'empleo1',
        icono: '🧾',
        titulo: 'Asistente Administrativo',
        empresa: 'Empresa XYZ - Bogotá',
        descripcion: 'Manejo de agenda, correspondencia y apoyo en actividades administrativas.',
        fecha: '03/04/2025'
      },
      {
        id: 'empleo2',
        icono: '🏭',
        titulo: 'Operario de Producción',
        empresa: 'Industria Textil Andina - Medellín',
        descripcion: 'Trabajo en línea de producción, empaques y control de calidad.',
        fecha: '02/04/2025'
      },
      {
        id: 'empleo3',
        icono: '🚚',
        titulo: 'Auxiliar Logístico',
        empresa: 'Aliados Logísticos SAS - Cali',
        descripcion: 'Recepción, almacenamiento y despacho de mercancía.',
        fecha: '01/04/2025'
      }
    ];
  
    const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
    const contenedor = document.getElementById('contenedor-empleos');
    contenedor.innerHTML = '';
  
    empleos.forEach(emp => {
      const yaPostulado = postulaciones.includes(emp.id);
      const card = document.createElement('div');
      card.className =
        'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform flex flex-col items-start';
  
      card.innerHTML = `
        <span class="text-4xl mb-4">${emp.icono}</span>
        <h3 class="text-xl font-semibold mb-1">${emp.titulo}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${emp.empresa}</p>
        <p class="text-sm mb-4">${emp.descripcion}</p>
        ${
          yaPostulado
            ? `<button class="mt-auto w-full bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed" disabled>Postulado</button>`
            : `<button class="postular-btn mt-auto w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded" data-id="${emp.id}" data-info="${emp.titulo} - ${emp.empresa} (📅 ${emp.fecha})">Postularme</button>`
        }
      `;
  
      contenedor.appendChild(card);
    });
  
    // Postulación
    document.querySelectorAll('.postular-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const info = btn.dataset.info;
  
        const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
        if (!postulaciones.includes(info)) {
          postulaciones.push(info);
          localStorage.setItem('postulaciones', JSON.stringify(postulaciones));
          cargarEmpleos();
        }
      });
    });
  }
  