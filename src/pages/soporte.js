import { mostrarToast } from '../components/toast.js';

// Reutiliza los mismos servicios que en catálogo
const SVC = [
  { id: 'empleos', nombre: 'Empleos' },
  { id: 'cursos', nombre: 'Cursos' },
  { id: 'comunidad', nombre: 'Comunidad' },
  { id: 'perfil', nombre: 'Perfil de Usuario' },
  { id: 'estadisticas', nombre: 'Estadísticas' },
];

function getTickets() {
  return JSON.parse(localStorage.getItem('tickets')) || [];
}
function setTickets(arr) {
  localStorage.setItem('tickets', JSON.stringify(arr));
}

function nextId() {
  const seq = Number(localStorage.getItem('tickets_seq') || '1');
  localStorage.setItem('tickets_seq', String(seq + 1));
  return seq;
}

function pintarTickets(items) {
  const list = document.getElementById('tickets-list');
  list.innerHTML = '';

  if (!items.length) {
    list.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-300">No hay tickets.</p>`;
    return;
  }

  const isAdmin = localStorage.getItem('isAdmin') === '1';

  items.forEach(t => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <h4 class="font-semibold">#${t.id} — ${t.asunto}</h4>
        <span class="text-xs px-2 py-1 rounded
          ${t.estado === 'Resuelto' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : t.estado === 'En progreso' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}">
          ${t.estado}
        </span>
      </div>
      <p class="text-xs text-gray-500 mb-2">Servicio: ${t.servicioNombre} • Prioridad: ${t.prioridad} • Impacto: ${t.impacto}</p>
      <p class="text-sm mb-3">${t.descripcion}</p>
      <p class="text-xs text-gray-500">Contacto: ${t.email}</p>

      ${isAdmin ? `
        <div class="mt-3 flex gap-2">
          <select data-act="estado" data-id="${t.id}" class="px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600 text-sm">
            <option ${t.estado==='Abierto'?'selected':''}>Abierto</option>
            <option ${t.estado==='En progreso'?'selected':''}>En progreso</option>
            <option ${t.estado==='Resuelto'?'selected':''}>Resuelto</option>
          </select>
          <button data-act="del" data-id="${t.id}" class="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
            Borrar
          </button>
        </div>` : ''}
    `;

    list.appendChild(card);
  });

  if (localStorage.getItem('isAdmin') === '1') {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-act="del"]');
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const arr = getTickets().filter(x => x.id !== id);
      setTickets(arr);
      mostrarToast('Ticket eliminado', 'success');
      aplicarFiltros();
    });

    list.addEventListener('change', (e) => {
      const sel = e.target.closest('select[data-act="estado"]');
      if (!sel) return;
      const id = Number(sel.dataset.id);
      const arr = getTickets();
      const idx = arr.findIndex(x => x.id === id);
      if (idx >= 0) {
        arr[idx].estado = sel.value;
        setTickets(arr);
        mostrarToast('Estado actualizado', 'success');
        aplicarFiltros();
      }
    });
  }
}

function aplicarFiltros() {
  const q = (document.getElementById('f-buscar').value || '').toLowerCase();
  const svc = document.getElementById('f-servicio').value;
  const est = document.getElementById('f-estado').value;
  const base = getTickets();

  const list = base.filter(t => {
    const matchQ = [t.asunto, t.descripcion, t.email].join(' ').toLowerCase().includes(q);
    const matchSvc = !svc || t.servicio === svc;
    const matchEst = !est || t.estado === est;
    return matchQ && matchSvc && matchEst;
  }).sort((a, b) => {
    // Orden por prioridad (Alta > Media > Baja) y luego por id desc
    const prio = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
    return prio[b.prioridad] - prio[a.prioridad] || b.id - a.id;
  });

  pintarTickets(list);
}

export function iniciarSoporte() {
  // Poblar selects de servicio
  const selForm = document.getElementById('t-servicio');
  const selFiltro = document.getElementById('f-servicio');

  SVC.forEach(s => {
    const o1 = document.createElement('option'); o1.value = s.id; o1.textContent = s.nombre;
    const o2 = document.createElement('option'); o2.value = s.id; o2.textContent = s.nombre;
    selForm.appendChild(o1); selFiltro.appendChild(o2);
  });

// Reemplaza donde antes hacías: new URLSearchParams(location.search)
const params = new URLSearchParams((location.hash.split('?')[1] || ''));
const svcFromQuery = params.get('svc');
if (svcFromQuery) selForm.value = svcFromQuery;


  // Crear ticket
  const form = document.getElementById('ticket-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      id: nextId(),
      servicio: selForm.value,
      servicioNombre: (SVC.find(x => x.id === selForm.value) || {}).nombre || '—',
      prioridad: document.getElementById('t-prioridad').value,
      asunto: document.getElementById('t-asunto').value.trim(),
      descripcion: document.getElementById('t-desc').value.trim(),
      email: document.getElementById('t-email').value.trim(),
      impacto: document.getElementById('t-impacto').value,
      estado: 'Abierto',
      creadoEn: new Date().toISOString()
    };

    if (!data.servicio || !data.asunto || !data.descripcion || !data.email) {
      mostrarToast('Por favor completa los campos obligatorios', 'error');
      return;
    }

    const arr = getTickets();
    arr.push(data);
    setTickets(arr);

    form.reset();
    mostrarToast('Ticket creado ✅', 'success');
    aplicarFiltros();
  });

  // Filtros
  ['f-buscar', 'f-servicio', 'f-estado'].forEach(id => {
    document.getElementById(id).addEventListener('input', aplicarFiltros);
  });

  aplicarFiltros();
}
