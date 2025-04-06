export function iniciarRegistro() {
    const form = document.querySelector('#registro-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Borrar errores previos
      form.querySelectorAll('.error-text').forEach(el => el.remove());
  
      const datos = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        documento: form.documento.value.trim(),
        nivel: form.nivel.value,
        interes: form.interes.value.trim()
      };
  
      let valido = true;
  
      // Validaciones
      if (datos.nombre.length < 2) {
        mostrarError(form.nombre, 'El nombre debe tener al menos 2 caracteres.');
        valido = false;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
        mostrarError(form.email, 'Ingrese un correo válido.');
        valido = false;
      }
  
      if (!/^\d{6,}$/.test(datos.documento)) {
        mostrarError(form.documento, 'El documento debe contener al menos 6 dígitos numéricos.');
        valido = false;
      }
  
      if (!datos.nivel) {
        mostrarError(form.nivel, 'Seleccione un nivel educativo.');
        valido = false;
      }
  
      if (datos.interes.length < 2) {
        mostrarError(form.interes, 'Ingrese un área de interés válida.');
        valido = false;
      }
  
      if (!valido) return;
  
      // Guardar en localStorage
      localStorage.setItem('datosUsuario', JSON.stringify(datos));
      localStorage.setItem('nombreUsuario', datos.nombre);
  
      // Redirigir
      window.location.hash = '#/perfil';
    });
  }
  
  function mostrarError(input, mensaje) {
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.className = 'text-red-500 text-xs mt-1 error-text';
    input.parentElement.appendChild(error);
  }
  