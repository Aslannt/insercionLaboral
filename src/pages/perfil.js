export function cargarPerfil() {
    const datos = JSON.parse(localStorage.getItem('datosUsuario')) || {};
    const nombre = datos.nombre || '—';
    const email = datos.email || '—';
    const documento = datos.documento || '—';
    const nivel = datos.nivel || '—';
    const interes = datos.interes || '—';
  
    document.querySelector('#perfil-nombre').textContent = nombre;
    document.querySelector('#perfil-email').textContent = email;
    document.querySelector('#perfil-documento').textContent = documento;
    document.querySelector('#perfil-nivel').textContent = nivel;
    document.querySelector('#perfil-interes').textContent = interes;
  
    // Cursos
    const cursos = {
      'curso-html': 'Habilidades Blandas para el Trabajo',
      'curso-excel': 'Fundamentos de Excel',
      'curso-cliente': 'Atención al Cliente'
    };
  
    const inscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
    const completados = JSON.parse(localStorage.getItem('cursosCompletados')) || [];
  
    const listaCursos = document.getElementById('lista-cursos');
    listaCursos.innerHTML = '';
  
    if (inscritos.length === 0) {
      listaCursos.innerHTML = `<li class="text-sm text-gray-600 dark:text-gray-300">No estás inscrito en ningún curso todavía.</li>`;
    } else {
      inscritos.forEach(id => {
        const cursoNombre = cursos[id] || 'Curso desconocido';
        const estado = completados.includes(id) ? '✅ Completado' : '⏳ En progreso';
        listaCursos.innerHTML += `
          <li class="flex justify-between items-center text-sm">
            <span>${cursoNombre}</span>
            <span class="font-semibold">${estado}</span>
          </li>
        `;
      });
    }
  
    // Postulaciones
    const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
    const lista = document.querySelector('#lista-postulaciones');
  
    lista.innerHTML = postulaciones.length
      ? postulaciones.map(p => `<li>${p}</li>`).join('')
      : '<li>No tienes postulaciones aún.</li>';
  }
  