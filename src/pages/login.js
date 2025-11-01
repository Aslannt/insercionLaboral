// REEMPLAZAR TODO el archivo por esto:
import { loginEmailPassword } from "../firebase.js";

export function iniciarLogin() {
  const form = document.querySelector('#login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.querySelectorAll('.error-text').forEach(el => el.remove());

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let ok = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { mostrarError(form.email, 'Correo inválido'); ok = false; }
    if (password.length < 8) { mostrarError(form.password, 'Min. 8 caracteres'); ok = false; }
    if (!ok) return;

    try {
      const user = await loginEmailPassword(email, password);
      // cache UI (opcional)
      localStorage.setItem('nombreUsuario', user.displayName || user.email);
      window.location.hash = '#/';
    } catch (err) {
      console.error(err);
      mostrarError(form.email, 'Credenciales inválidas');
    }
  });
}

function mostrarError(input, mensaje) {
  const p = document.createElement('p');
  p.textContent = mensaje;
  p.className = 'text-red-500 text-xs mt-1 error-text';
  input.parentElement.appendChild(p);
}
