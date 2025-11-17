// ====================================================================
// app/api/generate/route.ts - Endpoint API para Geração de Política (Next.js)
// CORREÇÃO: Removida a lógica de inicialização duplicada do Firebase Admin.
// ====================================================================

import { NextResponse, type NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { v4 as uuidv4 } from 'uuid'; 
import * as admin from 'firebase-admin'; // Apenas para o tipo FieldValue (serverTimestamp)

// ⭐️ NOVO E CORRIGIDO: Importa a instância do Firestore Admin já inicializada de forma segura
import { adminDb } from '../../../utils/firebase-admin'; 

// Importação do utils/generatePolicy
import { FormData, getFormattedDate, SYSTEM_INSTRUCTION } from '../../../utils/generatePolicy'; 

// Garante que a rota use o ambiente Node.js completo para APIs (necessário para o Firebase Admin)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Força a requisição dinâmica em produção

// ----------------------------------------------------
// REMOVIDO: Toda a lógica de normalizePrivateKey, ensureFirebaseAdmin e variáveis locais.
// Isso agora vive APENAS em utils/firebase-admin.ts
// ----------------------------------------------------


/**
 * Funções de Log: Usa o Admin SDK para salvar o histórico no Firestore.
 * Usa a instância 'adminDb' importada.
 */
async function logPolicyGeneration(
    sessionId: string, 
    generatedAt: string,
    formData: FormData, 
    userPrompt: string, 
    policyContent: string
) {
    // ⚠️ Checagem do AdminDb, que vem do Singleton (utils/firebase-admin.ts)
    if (!adminDb) {
        console.warn('Log de política falhou: Firebase Admin DB não está inicializado.');
        return;
    }
    
    // Simula um "ID de Usuário" para fins de log, já que você ainda não tem autenticação
    const userId = sessionId; 
    
    try {
        // Usa a instância importada adminDb
        const docRef = await adminDb.collection(`users/${userId}/history`).add({
            type: formData.type, // 'privacy-policy' ou 'terms-of-service'
            data: formData,
            policyContent: policyContent.substring(0, 500) + '...', // Salva snippet para resumo
            generatedAt: generatedAt,
            // Usa o timestamp do servidor Admin, que é o mais preciso
            createdAt: admin.firestore.FieldValue.serverTimestamp(), 
            prompt: userPrompt,
        });
        console.log(`✅ Log de política salvo no Firestore (Admin): ID ${docRef.id}`);
    } catch (e) {
        console.error('❌ Erro ao salvar log no Firestore (Admin):', e);
    }
}

// ----------------------------------------------------
// CONSTANTES E SETUP DA API
// ----------------------------------------------------

// Definição da resposta da API (mantida)
type Data = {
  policyContent?: string;
  error?: string;
  generatedAt: string;
};

// Inicializa o cliente Gemini (busca GEMINI_API_KEY do ambiente automaticamente)
const ai = new GoogleGenAI({});

// ====================================================================
// DEFINIÇÃO DO PROMPT DE SISTEMA (SYSTEM_INSTRUCTION)
// ====================================================================
// Você já tem essa constante no seu utils/generatePolicy, mantendo o padrão:
// const SYSTEM_INSTRUCTION = `...`; 

// ====================================================================
// FUNÇÃO POST PRINCIPAL
// ====================================================================
export async function POST(req: NextRequest) {
    // Captura a data atual formatada antes de qualquer processamento
    const generatedAt = getFormattedDate(new Date());
    // ⭐️ GERA UM ID DE SESSÃO ÚNICO para uso no log do Firestore
    const sessionId = uuidv4(); 
  
    try {
      // 1. Validação do Método
      if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 });
      }

      // 2. Recebe e parseia o corpo da requisição
      const formData: FormData = await req.json();
  
      // 3. Validação básica
      if (!formData.nomeDoProjeto || !formData.jurisdicao) {
        return NextResponse.json(
          { error: 'Dados obrigatórios ausentes no formulário (Nome do Projeto, Jurisdição).', generatedAt },
          { status: 400 }
        );
      }
  
      // EXTRAI O IDIOMA DO FORMULÁRIO E GARANTE UM PADRÃO
      const idiomaSaida = formData?.idiomaDoDocumento || 'Português (pt-br)';
  
  
      // 4. Cria o prompt do usuário com os dados do formulário
      const userPrompt = `
Gere o documento completo contendo a **Política de Privacidade** e os **Termos de Uso**, conforme as instruções do sistema.
**O idioma de saída DEVE ser: ${idiomaSaida}.**
Preencha as seções com base nas informações fornecidas abaixo. 
Se algum campo estiver em branco, use exemplos genéricos consistentes com um serviço SaaS.
---
  
### 📄 Detalhes do Projeto
- **Data da Última Atualização (Obrigatória):** ${generatedAt || 'Data não informada'}
- **Nome do Projeto:** ${formData?.nomeDoProjeto || 'Projeto Sem Nome'}
- **Responsável/Empresa:** ${formData?.nomeDoResponsavel || 'Empresa Genérica Ltda.'}
- **Tipo de Negócio/Modelo:** SaaS desenvolvido em ${formData?.linguagem || 'TypeScript'}
- **Jurisdição Principal de Conformidade:** ${formData?.jurisdicao || 'Brasil (LGPD)'}
  
---
  
### 🔒 Coleta e Tratamento de Dados
- **Coleta de Dados Pessoais:** ${formData?.coletaDadosPessoais ? 'SIM' : 'NÃO'}
- **Coleta de Dados Sensíveis:** ${formData?.coletaDadosSensivel ? 'SIM' : 'NÃO'}
- **Finalidade/Objetivo da Coleta:** ${formData?.objetivoDaColeta || 'Fornecer e melhorar os serviços prestados.'}
- **Transferência Internacional de Dados:** ${formData?.paisesTransferencia || 'Não aplicável'}
- **Público-Alvo:** ${
          formData?.publicoAlvoCriancas
            ? 'Inclui crianças; aplicar cláusulas específicas para menores de 13 anos.'
            : 'Público adulto.'
        }
  
---
  
### ⚙️ Informações Adicionais
- **Contato do Encarregado (DPO):** ${formData?.contatoDPO || 'privacidade@exemplo.com'}
- **Incluir Cláusula de “Não Garantia / AS IS”:** ${formData?.incluirNaoGarantia ? 'SIM' : 'NÃO'}
  
---
  
### 🧠 Instruções Gerais
Use linguagem jurídica formal, clara e acessível.
**A saída DEVE ser unicamente em ${idiomaSaida}.**
`;
  
      // 5. Chamada real à API Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          maxOutputTokens: 8192, 
        },
      });
  
      // ⭐️ TRATAMENTO DE SAÍDA:
      const policyContent = (response.text ?? '').trim();
  
      if (!policyContent) {
        throw new Error('O modelo Gemini não retornou conteúdo. Tente refinar o prompt.');
      }
      
      // ⭐️ LÓGICA DE LOG: Chamada da função de log (usa adminDb do Singleton)
      await logPolicyGeneration(
          sessionId,
          generatedAt,
          formData,
          userPrompt,
          policyContent
      );
  
  
      // 6. Retorna a política gerada em formato JSON
      return NextResponse.json({
        policyContent,
        generatedAt
      }, { status: 200 });
  
    } catch (error) {
      console.error('Erro na API de geração (Gemini):', error);
      return NextResponse.json(
        { error: 'Erro na API Gemini. Verifique a chave (GEMINI_API_KEY) ou o console de logs.', generatedAt },
        { status: 500 }
      );
    }
  }

// Garante que apenas POST seja o principal método para geração
export async function GET() {
    return NextResponse.json(
      { error: 'Method Not Allowed. Use POST para gerar a política.' },
      { status: 405 }
    );
}