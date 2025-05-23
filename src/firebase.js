// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWZLH_n2sxYb-OLFXYxulCQUeFWxctRE8",
  authDomain: "insercionlaboral-e5fa1.firebaseapp.com",
  projectId: "insercionlaboral-e5fa1",
  storageBucket: "insercionlaboral-e5fa1.firebasestorage.app",
  messagingSenderId: "1039644032681",
  appId: "1:1039644032681:web:226ccb08f2da6a528e73b8",
  measurementId: "G-VZ8ECLHLBS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { app, db };