import { mostrarToast } from '../components/toast.js';

export function cargarCursos() {
  const cursosDisponibles = [
    {
      id: 'curso-html',
      titulo: 'Habilidades Blandas para el Trabajo',
      descripcion: 'Desarrolla comunicación efectiva, trabajo en equipo y liderazgo.',
      imagen: '/src/assets/img/cursos/habilidades.jpg',
      enlace: 'https://www.youtube.com/watch?v=Z_f0egBJZ9U'
    },
    {
      id: 'curso-excel',
      titulo: 'Fundamentos de Excel',
      descripcion: 'Aprende a usar Excel para tareas administrativas y manejo de datos.',
      imagen: '/src/assets/img/cursos/excel.jpg',
      enlace: 'https://www.youtube.com/watch?v=Jszz7M676y4'
    },
    {
      id: 'curso-cliente',
      titulo: 'Atención al Cliente',
      descripcion: 'Conoce técnicas para brindar un servicio al cliente empático y eficiente.',
      imagen: '/src/assets/img/cursos/atencion.jpg',
      enlace: 'https://www.youtube.com/watch?v=4ZpblpJ9s3Y'
    },
    {
      id: 'curso-cv',
      titulo: 'Cómo hacer una Hoja de Vida',
      descripcion: 'Consejos y estructura para crear un CV profesional.',
      imagen: '/src/assets/img/cursos/cv.jpg',
      enlace: 'https://www.youtube.com/watch?v=-G7H4k3Hn04'
    },
    {
      id: 'curso-entrevista',
      titulo: 'Preparación para Entrevistas',
      descripcion: 'Aprende cómo responder preguntas comunes y destacar tus fortalezas.',
      imagen: '/src/assets/img/cursos/entrevista.jpg',
      enlace: 'https://www.youtube.com/watch?v=-HdT5S6Ht8E'
    },
    {
      id: 'curso-finanzas',
      titulo: 'Educación Financiera Básica',
      descripcion: 'Entiende el ahorro, presupuesto y planificación personal.',
      imagen: '/src/assets/img/cursos/finanzas.jpg',
      enlace: 'https://www.youtube.com/watch?v=UM8-Tz1uFXw'
    },
    {
      id: 'curso-digital',
      titulo: 'Herramientas Digitales Básicas',
      descripcion: 'Familiarízate con plataformas esenciales como Google Drive y Zoom.',
      imagen: '/src/assets/img/cursos/digitales.jpg',
      enlace: 'https://www.youtube.com/watch?v=TxEyf3-BV1k'
    },
    {
      id: 'curso-emprendimiento',
      titulo: 'Emprendimiento para Principiantes',
      descripcion: 'Primeros pasos para crear un negocio propio.',
      imagen: '/src/assets/img/cursos/emprendimiento.jpg',
      enlace: 'https://www.youtube.com/watch?v=e8Vz1U7MCYk'
    },
    {
      id: 'curso-autocuidado',
      titulo: 'Autocuidado y Bienestar',
      descripcion: 'Claves para mantener la salud mental y física en el proceso laboral.',
      imagen: '/src/assets/img/cursos/autocuidado.jpg',
      enlace: 'https://www.youtube.com/watch?v=JDVu7BzfjwI'
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
      <div class="space-y-4">
        <img src="${curso.imagen}" alt="Imagen de ${curso.titulo}" class="rounded w-full h-40 object-cover">
        <h3 class="text-xl font-semibold">${curso.titulo}</h3>
        <p class="text-sm">${curso.descripcion}</p>
        <a href="${curso.enlace}" target="_blank" class="text-blue-600 underline text-sm">Ver contenido</a>
      </div>
      ${
        !estaInscrito
          ? `<button class="inscribir-btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition mt-4" data-id="${curso.id}">Inscribirme</button>`
          : estaCompletado
          ? `<button class="bg-gray-500 text-white py-2 px-4 rounded mt-4" disabled>✅ Completado</button>`
          : `<button class="completar-btn bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition mt-4" data-id="${curso.id}">Marcar como Completado</button>`
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
        mostrarToast("✅ Te has inscrito al curso con éxito.");
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
        mostrarToast("✅ Curso marcado como completado.");
        cargarCursos();
      }
    });
  });
}