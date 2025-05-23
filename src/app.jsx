import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [personas, setPersonas] = useState([]);

  const agregarPersona = async () => {
    await addDoc(collection(db, "personas"), {
      nombre: "Laura Gómez",
      edad: 25,
    });
    alert("Persona agregada");
    cargarPersonas();
  };

  const cargarPersonas = async () => {
    const querySnapshot = await getDocs(collection(db, "personas"));
    const datos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPersonas(datos);
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  return (
    <div>
      <h1>Personas registradas</h1>
      <button onClick={agregarPersona}>Agregar persona</button>
      <ul>
        {personas.map(p => (
          <li key={p.id}>{p.nombre} - {p.edad} años</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
