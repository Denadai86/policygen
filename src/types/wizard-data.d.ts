// src/types/wizard-data.d.ts

/**
 * Define a estrutura COMPLETA de dados coletados ao longo do fluxo do Wizard
 * para gerar as políticas.
 */
export type SecurityLevel = 'standard' | 'basic' | 'advanced';
export type ConsentMode = 'explicit' | 'implicit' | 'cmp';

// 1. Estrutura de Categorias de Cookies
export interface CookieCategories {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    performance: boolean;
}

// 2. O Tipo Principal que representa todo o formulário
export interface WizardData {
    // === Etapas Iniciais (Não Vistas no Step 5, mas importantes) ===
    productName: string;
    productUrl: string;
    companyName: string;
    
    // === Etapa de Coleta de Dados/Cookies (Vistas no Step 5) ===
    cookieCategories: CookieCategories;
    
    // Corrigido: 'processors' pode vir como string[] (no backend) ou string (no frontend/input)
    // Definimos o que é a 'fonte de verdade' aqui (string[] é mais seguro).
    // Se o input no Step5 é uma string, você precisa lidar com a conversão lá.
    processors: string[]; 
    thirdPartyCookies: string; // Campo de texto livre
    
    // === Etapa de Retenção ===
    retention: '6m' | '1y' | '2y' | 'custom'; // Exemplo de seleção
    retentionDetails: string; // Explicação da retenção
    
    // === Etapa de Segurança ===
    securityLevel: SecurityLevel;
    securityNotes: string;
    
    // === Etapa de Direitos e Consentimento ===
    minorsAge: number; // Idade mínima de usuários
    rightsContact: string; // E-mail ou URL de contato para direitos do usuário
    consentMode: ConsentMode; 
    
    // ... adicione todas as outras propriedades necessárias de outras Steps
}

// Quando você usa 'Partial<WizardData>', significa que o objeto PODE ter esses campos,
// mas eles são opcionais (podem ser undefined).
// Isso é comum ao ler dados iniciais ou atualizar parcialmente.