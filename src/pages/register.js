import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { app, db } from "../firebase"; // Ajusta si tu ruta es distinta

export function iniciarRegistro() {
  const form = document.querySelector('#registro-form');
  const auth = getAuth(app);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.querySelectorAll('.error-text').forEach(el => el.remove());

    const datos = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      documento: form.documento.value.trim(),
      nivel: form.nivel.value,
      interes: form.interes.value.trim()
    };

    let valido = true;

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

    try {
      const password = datos.documento;

      // Crear el usuario
      const userCredential = await createUserWithEmailAndPassword(auth, datos.email, password);
      const user = userCredential.user;

      // Guardar datos en Firestore
      await addDoc(collection(db, "usuarios"), {
        uid: user.uid,
        ...datos
      });

      // LocalStorage (opcional)
      localStorage.setItem('datosUsuario', JSON.stringify(datos));
      localStorage.setItem('nombreUsuario', datos.nombre);

      // ✅ Alerta y redirección
      alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      window.location.hash = '#/login';

    } catch (error) {
      console.error("Error en el registro:", error);
      mostrarError(form.email, 'No se pudo registrar el usuario. ¿Ya existe el correo?');
    }
  });
}

function mostrarError(input, mensaje) {
  const error = document.createElement('p');
  error.textContent = mensaje;
  error.className = 'text-red-500 text-xs mt-1 error-text';
  input.parentElement.appendChild(error);
}
