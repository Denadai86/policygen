// ====================================================================
// utils/firebase-admin.ts - CORRIGIDO
// ====================================================================

// ⚠️ CORREÇÃO DE IMPORTAÇÃO: Usando a sintaxe 'import' tradicional que resolve melhor
// com a maioria das configurações de Next.js e TypeScript.
import admin from 'firebase-admin';
import type { FirebaseApp } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import type { ServiceAccount } from 'firebase-admin/lib/app/credential';


// ----------------------------------------------------
// 1. Funções de Credenciais Seguras (MANTIDO)
// ----------------------------------------------------
function normalizePrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  // Remove aspas (simples ou duplas)
  let k = key.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  // Substitui sequências de escape \\n por quebras de linha reais (\n).
  return k.replace(/\\\\n/g, '\n'); 
}

// ----------------------------------------------------
// 2. Variáveis de Ambiente e Configuração (MANTIDO)
// ----------------------------------------------------
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
const APP_NAME = 'policyGenAdmin'; 

// ----------------------------------------------------
// 3. Inicialização Lazy (Singleton Pattern)
// ----------------------------------------------------
// ⚠️ CORREÇÃO DE TIPO: Usando o tipo importado 'FirebaseApp' e 'Firestore'
let adminApp: FirebaseApp | null = null;
export let adminDb: Firestore | null = null;


/**
 * Inicializa o Firebase Admin SDK, ou retorna a instância existente.
 */
function initializeFirebaseAdmin() {
  // Se já inicializado, retorna a instância existente.
  if (adminApp) return;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.warn("⚠️ Credenciais do Firebase Admin ausentes (FIREBASE_*). A função de Log estará desativada.");
    return;
  }

  // ⚠️ CORREÇÃO DE TIPO: Usando o tipo importado 'ServiceAccount'
  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY,
  };

  try {
    // Procura por uma instância já nomeada para evitar re-inicialização
    // ⚠️ CORREÇÃO DE CHAMADA: admin.app.apps é o array (MANTIDO, mas deveria funcionar agora)
    if (admin.app.apps.find(app => app.name === APP_NAME)) {
      adminApp = admin.app(APP_NAME);
    } else {
      // Cria a nova instância
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      }, APP_NAME);
    }
    
    adminDb = adminApp.firestore();
    
  } catch (e) {
    console.error(`❌ Erro fatal ao inicializar Firebase Admin (${APP_NAME}):`, e);
    adminApp = null;
    adminDb = null;
  }
}

// Inicializa o Admin SDK no momento da importação.
initializeFirebaseAdmin();

// Exporta o App e o Banco de Dados.
export { adminApp };