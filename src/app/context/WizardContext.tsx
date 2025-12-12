"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// =======================================================
// TIPOS AUXILIARES EXPORTADOS
// (Outros arquivos podem importar isso agora!)
// =======================================================

export type RetentionPeriod = "30d" | "6m" | "1y" | "2y" | "custom";
export type SecurityLevel = "basic" | "standard" | "advanced";
export type ConsentMode = "explicit" | "implicit" | "cmp";
export type Jurisdiction = "br" | "us" | "eu"; // Extraído para reutilização
export type Language = "pt-br" | "pt" | "en" | "es" | "fr"; // Extraído para reutilização

// CATEGORIAS COMPLETAS DE COOKIES
export interface CookieCategories {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  performance: boolean;
  security: boolean;
  ads: boolean;
}

// =======================================================
// MODELO ENTERPRISE FINAL (A Fonte da Verdade)
// =======================================================
export interface WizardData {
  // Identificação / Projeto
  projectName: string;
  brandName?: string;
  legalName?: string;
  contactEmail: string;
  projectUrls?: string | string[];

  // Docs selecionados
  documentType?: string[];

  businessModel?: string;
  monetization?: string;
  license?: string;

  responsibleName?: string;
  dpoContact?: string;

  collectsPersonal?: boolean;
  collectsSensitive?: boolean;
  purpose?: string;
  transferCountries?: string;

  // AQUI ESTÁ A CORREÇÃO CRÍTICA DO BUILD: "us" incluído
  jurisdiction?: Jurisdiction; 
  language?: Language;

  includeAsIs?: boolean;
  includeIP?: boolean;
  includeLiability?: boolean;
  includeLastUpdated?: boolean;
  requireConsent?: boolean;

  // ============================================
  // STEP 5 - COOKIES & RASTREAMENTO
  // ============================================
  usesCookies?: boolean;

  cookieCategories: CookieCategories;

  // Ferramentas / scripts / analytics
  cookieTools: string[];
  analyticsTools: string[];

  // Rastreadores e terceiros
  adTracking: boolean;
  sharesDataWithThirdParties: boolean;
  thirdPartyList: string[];

  // Banner + retenção
  cookieBannerStyle: string;
  retentionPolicy: string;

  // Observações
  customCookieNotes: string;
}

// =======================================================
// DEFAULTS SEGUROS
// =======================================================

const initialWizardData: Partial<WizardData> = {
  jurisdiction: "br", // Valor padrão seguro
  language: "pt-br",  // Valor padrão seguro
  
  cookieCategories: {
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    performance: false,
    security: false,
    ads: false,
  },
  cookieTools: [],
  analyticsTools: [],
  adTracking: false,
  sharesDataWithThirdParties: false,
  thirdPartyList: [],
  cookieBannerStyle: "",
  retentionPolicy: "",
  customCookieNotes: "",
};

// =======================================================
// CONTEXTO
// =======================================================

type WizardContextType = {
  data: Partial<WizardData>;
  update: (values: Partial<WizardData>) => void;
  reset: () => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Partial<WizardData>>(initialWizardData);

  const update = (values: Partial<WizardData>) =>
    setData((prev) => ({ ...prev, ...values }));

  const reset = () => setData(initialWizardData);

  return (
    <WizardContext.Provider value={{ data, update, reset }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error("useWizard must be used inside WizardProvider");
  }
  return ctx;
}