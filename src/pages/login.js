import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
//import { app } from "./firebase"; // si exportas app en firebase.js

export function iniciarLogin() {
  const form = document.querySelector('#login-form');
  const auth = getAuth(app); // inicializamos auth

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    form.querySelectorAll('.error-text').forEach(el => el.remove());

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    //const password = "123456"; // Puedes permitir que lo escriban o fijarlo.

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

    try {
      // Intentamos iniciar sesión
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Si el usuario no existe, lo creamos
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
          mostrarError(form.email, 'No se pudo crear el usuario.');
          return;
        }
      } else {
        mostrarError(form.email, 'Correo o contraseña incorrectos.');
        return;
      }
    }

    // Guardamos el nombre (puedes guardar también el UID si lo deseas)
    localStorage.setItem('nombreUsuario', nombre);

    // Redirigir al home
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
