// Catálogo de servicios (mock ITIL v4)
const SERVICIOS = [
  {
    id: 'empleos',
    nombre: 'Empleos',
    categoria: 'Empleabilidad',
    descripcion: 'Publicación, búsqueda y postulación a ofertas laborales.',
    owner: 'Admin Empleabilidad',
    sla: '24h', // tiempo de primera respuesta a incidencias relacionadas
    valor: 'Conecta con oportunidades reales de trabajo.',
  },
  {
    id: 'cursos',
    nombre: 'Cursos',
    categoria: 'Formación',
    descripcion: 'Inscripción y seguimiento de cursos técnicos y blandos.',
    owner: 'Admin Formación',
    sla: '24h',
    valor: 'Desarrolla competencias para mejorar la empleabilidad.',
  },
  {
    id: 'comunidad',
    nombre: 'Comunidad',
    categoria: 'Acompañamiento',
    descripcion: 'Historias, recursos y apoyo entre pares.',
    owner: 'Gestión Comunitaria',
    sla: '72h',
    valor: 'Red de apoyo emocional y networking.',
  },
  {
    id: 'perfil',
    nombre: 'Perfil de Usuario',
    categoria: 'Soporte',
    descripcion: 'Gestión de datos personales, cursos y postulaciones.',
    owner: 'Soporte Plataforma',
    sla: '4h',
    valor: 'Centraliza tu experiencia y configuración.',
  },
  {
    id: 'estadisticas',
    nombre: 'Estadísticas',
    categoria: 'Gestión Interna',
    descripcion: 'Métricas de uso para mejora continua.',
    owner: 'Analítica',
    sla: '72h',
    valor: 'Transparencia para la toma de decisiones.',
  }
];

function pintarServicios(lista) {
  const grid = document.getElementById('svc-grid');
  grid.innerHTML = '';

  if (!lista.length) {
    grid.innerHTML = `<p class="col-span-full text-sm text-gray-500 dark:text-gray-300">No hay servicios que coincidan.</p>`;
    return;
  }

  lista.forEach(s => {
    const card = document.createElement('article');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-5 text-left hover:shadow-xl transition';
    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xl font-semibold">${s.nombre}</h3>
        <span class="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded">${s.categoria}</span>
      </div>
      <p class="text-sm mb-3">${s.descripcion}</p>
      <p class="text-xs mb-1"><strong>Valor:</strong> ${s.valor}</p>
      <p class="text-xs mb-1"><strong>Owner:</strong> ${s.owner}</p>
      <p class="text-xs mb-4"><strong>SLA (1ª respuesta):</strong> ${s.sla}</p>
      <a href="#/soporte?svc=${encodeURIComponent(s.id)}" class="inline-block text-sm bg-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-800">
        Solicitar soporte
      </a>
    `;
    grid.appendChild(card);
  });
}

function unique(arr) { return [...new Set(arr)]; }

export function iniciarCatalogo() {
  // Poblar selects
  const catSel = document.getElementById('svc-cat');
  const slaSel = document.getElementById('svc-sla');
  const search = document.getElementById('svc-search');

  // Categorías
  unique(SERVICIOS.map(s => s.categoria)).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    catSel.appendChild(opt);
  });

  // Filtro + búsqueda
  const filtrar = () => {
    const q = (search.value || '').toLowerCase();
    const cat = catSel.value;
    const sla = slaSel.value;

    const lista = SERVICIOS.filter(s => {
      const matchQ = [s.nombre, s.descripcion, s.valor, s.categoria].join(' ').toLowerCase().includes(q);
      const matchCat = !cat || s.categoria === cat;
      const matchSla = !sla || s.sla === sla;
      return matchQ && matchCat && matchSla;
    });

    pintarServicios(lista);
  };

  [search, catSel, slaSel].forEach(el => el.addEventListener('input', filtrar));
  pintarServicios(SERVICIOS);
}
