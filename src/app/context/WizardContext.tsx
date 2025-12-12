//src/app/context/WizardContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// =======================================================
// MODELO ENTERPRISE COMPLETO (OPÇÃO 2 EXPANDIDA)
// =======================================================

export type RetentionPeriod = "30d" | "6m" | "1y" | "2y" | "custom";
export type SecurityLevel = "basic" | "standard" | "advanced";
export type ConsentMode = "explicit" | "implicit" | "cmp";

// CATEGORIAS COMPLETAS DE COOKIES — ALINHADAS COM O STEP-5
export interface CookieCategories {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  performance: boolean;
  security: boolean;
  ads: boolean;
}

// MODELO ENTERPRISE FINAL DE TODO O FLUXO
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

  jurisdiction?: "br" | "us" | "eu";
  language?: "pt-br" | "pt" | "en" | "es" | "fr";

  includeAsIs?: boolean;
  includeIP?: boolean;
  includeLiability?: boolean;
  includeLastUpdated?: boolean;
  requireConsent?: boolean;

  // ============================================
  // STEP 5 EXPANDIDO
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
// DEFAULTS SEGUROS (PARA NÃO EXISTIR undefined NO STEP-6)
// =======================================================

const initialWizardData: Partial<WizardData> = {
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
    setData(prev => ({ ...prev, ...values }));

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
