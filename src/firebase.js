// src/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc,
  query, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// === TU CONFIG ===
const firebaseConfig = {
  apiKey: "AIzaSyAgiZxvsm7IgowvfMj-k5Z4soWt_ErMsLk",
  authDomain: "insercion-laboral-dev.firebaseapp.com",
  projectId: "insercion-laboral-dev",
  storageBucket: "insercion-laboral-dev.firebasestorage.app",
  messagingSenderId: "1035989770344",
  appId: "1:1035989770344:web:81307820ba97fae2105bdd",
  measurementId: "G-Y915S6NYD1"
};
// ==================

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ----- Auth helpers -----
export function onAuthChanged(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function registerEmailPassword({ fullName, email, password, role = "candidate" }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName) await updateProfile(cred.user, { displayName: fullName });
  // crea /users/{uid} con el rol (requerido por las rules)
  const uid = cred.user.uid;
  await setDoc(doc(db, "users", uid), {
    email,
    full_name: fullName || "",
    role,
    created_at: serverTimestamp(),
  }, { merge: true });
  return cred.user;
}

export async function loginEmailPassword(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
export async function logout() { await signOut(auth); }

// ----- Lecturas públicas -----
export async function getPublicJobs() {
  const q = query(collection(db, "jobs"), where("isActive", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getPublishedCourses() {
  const q = query(collection(db, "courses"), where("isPublished", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ----- Acciones del usuario -----
export async function applyToJob(jobId) {
  const user = auth.currentUser;
  if (!user) throw new Error("AUTH_REQUIRED");

  // intenta traer ownerUid del job (si no existe, igual crea la app sin él)
  let employerOwnerUid = null;
  const jobRef = doc(db, "jobs", jobId);
  const jobSnap = await getDoc(jobRef);
  if (jobSnap.exists()) employerOwnerUid = jobSnap.data().ownerUid ?? null;

  await addDoc(collection(db, "applications"), {
    userId: user.uid,
    jobId,
    status: "applied",
    notes: "",
    employerOwnerUid,     // opcional, ayuda a que el empleador vea la app
    createdAt: serverTimestamp(),
  });
}

export async function enrollCourse(courseId) {
  const user = auth.currentUser;
  if (!user) throw new Error("AUTH_REQUIRED");
  await addDoc(collection(db, "enrollments"), {
    userId: user.uid,
    courseId,
    progress: "not_started",
    enrolledAt: serverTimestamp(),
    completedAt: null
  });
}

// KPIs del perfil
export async function getUserCounts(uid) {
  const appsQ = query(collection(db, "applications"), where("userId", "==", uid));
  const ensQ  = query(collection(db, "enrollments"),  where("userId", "==", uid));
  const [appsSnap, ensSnap] = await Promise.all([getDocs(appsQ), getDocs(ensQ)]);
  return { applications: appsSnap.size, enrollments: ensSnap.size };
}
