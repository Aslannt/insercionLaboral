export function iniciarRegistro() {
    const form = document.querySelector('#registro-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const documento = form.documento.value.trim();
      const nivel = form.nivel.value;
      const interes = form.interes.value.trim();
  
      // Validaciones
      if (!nombre || !email || !documento || !nivel || !interes) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }
  
      // Estructura de usuario
      const usuario = {
        nombre,
        email,
        documento,
        nivel,
        interes,
        cursosCompletados: [],
        postulaciones: []
      };
  
      // Guardar en localStorage
      localStorage.setItem('datosUsuario', JSON.stringify(usuario));
      localStorage.setItem('nombreUsuario', nombre);
  
      // Redirigir al perfil
      window.location.hash = '#/perfil';
    });
  }
  