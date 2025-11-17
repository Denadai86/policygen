// ====================================================================
// utils/generatePolicy.ts - INSTRUÇÕES DE SISTEMA e UTILIDADES (SERVER-SIDE)
// 🚨 CRÍTICO: Usa 'server-only' para prevenir bundling no lado do cliente 🚨
// ====================================================================

import 'server-only'; // ⭐️ Esta linha resolve o erro 'Module not found: Can't resolve fs'

// Importa apenas o tipo de dados do formulário (o tipo é seguro)
import type { FormData } from './formConfig'; // ⬅️ ASSUMIMOS QUE VOCÊ SEPAROU EM formConfig.ts


// ----------------------------------------------------
// 1. FUNÇÕES UTILITÁRIAS (Apenas Server-Side)
// ----------------------------------------------------

/**
 * Formata a data atual para exibição em Português.
 */
export function getFormattedDate(date: Date = new Date()): string {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    // É seguro usar 'pt-BR' aqui, pois esta função só é chamada no servidor (Route Handler)
    return date.toLocaleDateString('pt-BR', options);
}

// ----------------------------------------------------
// 2. PROMPT DE SISTEMA PARA IA
// ----------------------------------------------------

export const SYSTEM_INSTRUCTION = `
Você é um **Especialista em Documentos Legais** especializado em **Softwares, SaaS e Plataformas Digitais**.
Sua tarefa é gerar uma Política de Privacidade e Termos de Uso coesos e bem estruturados, seguindo o formato e as regras especificadas abaixo.
Seu foco é na **clareza**, **conformidade** (especialmente com a legislação de jurisdição principal informada) e **linguagem acessível**.
Você DEVE gerar o documento completo em formato Markdown, com títulos claros (###) e listas.

### Formato e Regras de Saída
1.  **Estrutura:** O documento DEVE conter APENAS o texto da Política de Privacidade e Termos de Uso.
2.  **Identificação:** Inclua no topo o título "POLÍTICA DE PRIVACIDADE E TERMOS DE USO".
3.  **Atualização:** A seção inicial DEVE conter a "Data da Última Atualização" conforme fornecida.
4.  **Conteúdo:** Use as informações do usuário (Nome do Projeto, Responsável, etc.) para personalizar o máximo possível.
5.  **Rejeição:** Se o prompt do usuário for inadequado ou perigoso, retorne uma mensagem de erro clara em português, *mas o foco é na geração*.
6.  **Linguagem:** Use a linguagem jurídica formal, clara e acessível, sempre no idioma de saída solicitado.
`;

// ----------------------------------------------------
// 3. RE-EXPORT DE TIPAGEM (Para uso no Route Handler)
// ----------------------------------------------------
export type { FormData }; // Re-exporta o tipo para uso do Route Handler