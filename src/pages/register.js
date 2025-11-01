// REEMPLAZAR TODO el archivo por esto:
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { registerEmailPassword, db } from "../firebase.js";

export function iniciarRegistro() {
  const form = document.querySelector('#registro-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.querySelectorAll('.error-text').forEach(el => el.remove());

    const datos = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      documento: form.documento.value.trim(),
      nivel: form.nivel.value,
      interes: form.interes.value.trim(),
      password: form.password.value.trim()
    };

    let ok = true;
    if (datos.nombre.length < 2) { err(form.nombre,'Mín. 2 caracteres'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) { err(form.email,'Correo inválido'); ok = false; }
    if (!/^\d{6,}$/.test(datos.documento)) { err(form.documento,'Al menos 6 dígitos'); ok = false; }
    if (!datos.nivel) { err(form.nivel,'Selecciona nivel'); ok = false; }
    if (datos.interes.length < 2) { err(form.interes,'Muy corto'); ok = false; }
    if (datos.password.length < 8) { err(form.password,'Min. 8 caracteres'); ok = false; }
    if (!ok) return;

    try {
      // Crea usuario + /users/{uid} con role candidate
      const user = await registerEmailPassword({
        fullName: datos.nombre,
        email: datos.email,
        password: datos.password,
        role: "candidate",
      });

      // Guarda campos extra en el MISMO doc de users/{uid}
      await setDoc(doc(db, "users", user.uid), {
        document: datos.documento,
        education_level: datos.nivel,
        interest_area: datos.interes,
        updated_at: serverTimestamp()
      }, { merge: true });

      // cache UI opcional
      localStorage.setItem('nombreUsuario', datos.nombre);

      alert('✅ Registro exitoso. Ahora inicia sesión.');
      window.location.hash = '#/login';
    } catch (error) {
      console.error(error);
      err(form.email, 'No se pudo registrar. ¿El correo ya existe?');
    }
  });
}

function err(input, msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  p.className = 'text-red-500 text-xs mt-1 error-text';
  input.parentElement.appendChild(p);
}
