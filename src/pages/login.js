export function iniciarLogin() {
    const form = document.querySelector('#login-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Eliminar errores previos
      form.querySelectorAll('.error-text').forEach(el => el.remove());
  
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
  
      let valido = true;
  
      if (nombre.length < 2) {
        mostrarError(form.nombre, 'Ingrese un nombre válido.');
        valido = false;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mostrarError(form.email, 'Ingrese un correo válido.');
        valido = false;
      }
  
      if (!valido) return;
  
      // Guardar nombre en localStorage
      localStorage.setItem('nombreUsuario', nombre);
  
      // Redirigir al inicio
      window.location.hash = '#/';
      location.reload();
    });
  }
  
  function mostrarError(input, mensaje) {
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.className = 'text-red-500 text-xs mt-1 error-text';
    input.parentElement.appendChild(error);
  }
  