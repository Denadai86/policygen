// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lógica Singleton: Verifica se já existe uma conexão para não criar duplicada
// Isso previne erros comuns no Next.js durante o desenvolvimento
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportamos apenas o que vamos usar: Autenticação e Banco de Dados
export const auth = getAuth(app);
export const db = getFirestore(app);