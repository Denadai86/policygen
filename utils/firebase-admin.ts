// ====================================================================
// utils/firebase-admin.ts - SINGLETON FINAL E EXCLUSIVO PARA SERVIDOR
// 🚨 CORREÇÃO CRÍTICA: Ajuste no tipo 'App' para usar admin.app.App 🚨
// ====================================================================

import 'server-only'; 
import * as admin from 'firebase-admin'; // Importa a instância de admin

// ❌ REMOVIDA: import type { App } from 'firebase-admin/app'; 
import type { Firestore } from 'firebase-admin/firestore';

// Cria um alias para o tipo ServiceAccount do namespace admin
type ServiceAccount = admin.ServiceAccount; 

// ----------------------------------------------------
// 1. Funções de Credenciais Seguras
// ----------------------------------------------------
function normalizePrivateKey(key?: string): string | undefined {
    if (!key) return undefined;
    // Remove aspas (simples ou duplas)
    let k = key.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    // Substitui sequências de escape \\n por quebras de linha reais (\n).
    return k.replace(/\\\\n/g, '\n'); 
}

// ----------------------------------------------------
// 2. Variáveis de Ambiente e Configuração
// ----------------------------------------------------
// Acessa variáveis de ambiente de server-side
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
const APP_NAME = 'policyGenAdmin'; 

// ----------------------------------------------------
// 3. Inicialização Lazy (Singleton Pattern)
// ----------------------------------------------------
// ⭐️ CORREÇÃO: Usa o tipo App do namespace admin (admin.app.App)
let adminApp: admin.app.App | null = null; 
export let adminDb: Firestore | null = null;


function initializeFirebaseAdmin() {
    if (adminApp) return;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
        console.warn("⚠️ Credenciais do Firebase Admin ausentes. O Log estará desativado.");
        return;
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY!,
    };

    try {
        // Procura por uma instância já nomeada para evitar re-inicialização
        if (admin.apps.find(app => app && app.name === APP_NAME)) {
            adminApp = admin.app(APP_NAME);
        } else {
            adminApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            }, APP_NAME);
        }
        
        // ✅ Esta linha agora deve funcionar, pois adminApp está corretamente tipado.
        adminDb = adminApp.firestore();
        
    } catch (e) {
        console.error(`❌ Erro fatal ao inicializar Firebase Admin:`, e);
        adminApp = null;
        adminDb = null;
    }
}

initializeFirebaseAdmin();

export { adminApp };