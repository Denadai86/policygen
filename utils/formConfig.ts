// ====================================================================\
// utils/formConfig.ts - TIPAGEM e CONFIGURAÇÃO (CLIENT-SAFE)
// Define os tipos e as opções estáticas do formulário.
// ====================================================================\

// ----------------------------------------------------
// 1. TIPAGEM DOS DADOS DO FORMULÁRIO (FormData)
// ----------------------------------------------------

/**
 * Define a estrutura de dados completa do formulário de geração de política.
 */
export type FormData = {
    type: 'privacy-policy' | 'terms-of-service'; // Adicionado para uso em logs/histórico
    nomeDoProjeto: string;
    nomeDoResponsavel: string;
    jurisdicao: string;
    
    // Propriedades relacionadas ao Negócio/Desenvolvimento
    licencaCodigo: string; 
    modeloSoftware: string;
    tipoMonetizacao: string; // Ex: 'FREEMIUM'

    linguagem: string;
    idiomaDoDocumento: string;

    // Seções de Privacidade e Conformidade
    coletaDadosPessoais: boolean;
    coletaDadosSensivel: boolean;
    
    // ⬅️ CORRIGIDO: Adicionado esta propriedade (monetizacaoPorTerceiros)
    monetizacaoPorTerceiros: boolean; 

    objetivoDaColeta: string;
    paisesTransferencia: string;
    publicoAlvoCriancas: boolean;
    contatoDPO: string;
    incluirNaoGarantia: boolean;
};


// ----------------------------------------------------
// 2. OPÇÕES ESTÁTICAS PARA COMPONENTES DE FORMULÁRIO
// ----------------------------------------------------

// Opções de Linguagem/Tecnologia (exemplo, não usado na API, mas usado no formulário)
export const languageOptions = [
    { value: 'TypeScript', label: 'TypeScript / Node.js' },
    { value: 'Python', label: 'Python / Django' },
    { value: 'PHP', label: 'PHP / Laravel' },
    { value: 'Java', label: 'Java / Spring' },
    { value: 'Outra', label: 'Outra' },
];

// Opções de Idioma para o Documento Final
export const idiomOptions = [
    { value: 'Português (pt-br)', label: 'Português (pt-br)' },
    { value: 'English (en)', label: 'English (en)' },
    { value: 'Español (es)', label: 'Español (es)' },
];

// Opções de Jurisdição para Conformidade (A mais importante)
export const jurisdictionOptions = [
    { value: 'Brasil (LGPD)', label: 'Brasil (LGPD)' },
    { value: 'União Europeia (GDPR)', label: 'União Europeia (GDPR)' },
    { value: 'Estados Unidos (CCPA)', label: 'Estados Unidos (CCPA)' },
    { value: 'Global (Recomendado)', label: 'Global (Recomendado)' },
];


// ----------------------------------------------------
// 3. FUNÇÕES UTILITÁRIAS DE LABEL (Opcional, mas útil)
// ----------------------------------------------------

/**
 * Retorna o label de uma jurisdição com base no seu valor.
 */
export function getJurisdicaoLabel(value: string): string {
    return jurisdictionOptions.find(opt => opt.value === value)?.label || 'Não Informado';
}

/**
 * Retorna o label de um idioma com base no seu valor.
 */
export function getIdiomaLabel(value: string): string {
    return idiomOptions.find(opt => opt.value === value)?.label || 'Não Informado';
}