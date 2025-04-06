export function cargarCursos() {
    const cursosDisponibles = [
      {
        id: 'curso-html',
        titulo: 'Habilidades Blandas para el Trabajo',
        descripcion: 'Desarrolla comunicación efectiva, trabajo en equipo y liderazgo.'
      },
      {
        id: 'curso-excel',
        titulo: 'Fundamentos de Excel',
        descripcion: 'Aprende a usar Excel para tareas administrativas y manejo de datos.'
      },
      {
        id: 'curso-cliente',
        titulo: 'Atención al Cliente',
        descripcion: 'Conoce técnicas para brindar un servicio al cliente empático y eficiente.'
      }
    ];
  
    const inscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
    const completados = JSON.parse(localStorage.getItem('cursosCompletados')) || [];
  
    const contenedor = document.getElementById('contenedor-cursos');
    contenedor.innerHTML = '';
  
    cursosDisponibles.forEach(curso => {
      const estaInscrito = inscritos.includes(curso.id);
      const estaCompletado = completados.includes(curso.id);
  
      const div = document.createElement('div');
      div.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 flex flex-col justify-between';
  
      div.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold mb-2">${curso.titulo}</h3>
          <p class="text-sm mb-4">${curso.descripcion}</p>
        </div>
        ${!estaInscrito
          ? `<button class="inscribir-btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition" data-id="${curso.id}">Inscribirme</button>`
          : estaCompletado
          ? `<button class="bg-gray-500 text-white py-2 px-4 rounded" disabled>✅ Completado</button>`
          : `<button class="completar-btn bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition" data-id="${curso.id}">Marcar como Completado</button>`
        }
      `;
      contenedor.appendChild(div);
    });
  
    document.querySelectorAll('.inscribir-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (!inscritos.includes(id)) {
          inscritos.push(id);
          localStorage.setItem('cursosInscritos', JSON.stringify(inscritos));
          cargarCursos();
        }
      });
    });
  
    document.querySelectorAll('.completar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (!completados.includes(id)) {
          completados.push(id);
          localStorage.setItem('cursosCompletados', JSON.stringify(completados));
          cargarCursos();
        }
      });
    });
  }
  