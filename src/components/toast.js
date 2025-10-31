// src/components/toast.js

export function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.textContent = mensaje;
  
    toast.className = `
      fixed bottom-6 right-6 z-50 px-4 py-2 rounded shadow-md text-white text-sm animate-fade-in-out
      ${tipo === 'success' ? 'bg-green-600' : 'bg-red-600'}
    `;
  
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  