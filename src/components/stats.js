export function obtenerEstadisticas() {
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const completados = JSON.parse(localStorage.getItem('cursosCompletados')) || [];
    const postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
  
    return {
      usuarios: datos ? 1 : 0,
      cursosDisponibles: 3,
      cursosCompletados: completados.length,
      postulaciones: postulaciones.length
    };
  }
  