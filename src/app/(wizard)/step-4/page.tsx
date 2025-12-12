// src/app/(wizard)/step-4/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, Scale, ShieldCheck, ArrowRight, ArrowLeft, Check } from "lucide-react";

// Imports internos
import MagicSwitch from "../../../components/MagicSwitch";
import ModalSelector from "../../../components/ModalSelector";
import { jurisdictions } from "../../../data/jurisdictions";
import { languages } from "../../../data/languages";

// IMPORTANTE: Importamos os tipos oficiais do Contexto para evitar conflitos
import { useWizard } from "@/app/context/WizardContext";
import type { Jurisdiction, Language } from "@/app/context/WizardContext";

// Tipagem Sincronizada com a Fonte da Verdade
type FormState = {
  jurisdiction: Jurisdiction;
  language: Language;
  includeAsIs: boolean;
  includeIP: boolean;
  includeLiability: boolean;
  includeLastUpdated: boolean;
  requireConsent: boolean;
};

export default function Step4() {
  const router = useRouter();
  const { data, update } = useWizard();

  const [showJurisdictionModal, setShowJurisdictionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Inicialização segura com Type Casting correto
  const [form, setForm] = useState<FormState>({
    jurisdiction: (data.jurisdiction as Jurisdiction) || "br",
    language: (data.language as Language) || "pt-br",
    includeAsIs: data.includeAsIs ?? true,
    includeIP: data.includeIP ?? true,
    includeLiability: data.includeLiability ?? true,
    includeLastUpdated: data.includeLastUpdated ?? true,
    requireConsent: data.requireConsent ?? false,
  });

  // Sincronização robusta: se o contexto mudar, o form local atualiza
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      jurisdiction: (data.jurisdiction as Jurisdiction) ?? prev.jurisdiction,
      language: (data.language as Language) ?? prev.language,
    }));
  }, [data.jurisdiction, data.language]);

  // Função genérica de atualização de campo
  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const newState = { ...prev, [key]: value };
      // Opcional: Já salvar no contexto a cada mudança para persistência instantânea
      // update(newState); 
      return newState;
    });
  };

  const nextStep = () => {
    update(form);
    router.push("/step-5");
  };

  // Helper para mostrar o label bonito no botão
  const currentJurisdictionLabel = jurisdictions.find(j => j.value === form.jurisdiction)?.label;
  const currentLanguageLabel = languages.find(l => l.value === form.language)?.label;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HEADER */}
      <div className="flex-none pt-12 pb-8 px-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-white mb-4 tracking-tight">
          Escopo & Idioma
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Defina as fronteiras legais e o idioma de saída dos seus documentos.
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-6 pb-36 space-y-8">
        
        {/* BLOCO 1: SELETORES PRINCIPAIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Jurisdição */}
          <button
            onClick={() => setShowJurisdictionModal(true)}
            className="group relative flex flex-col items-start p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-left"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Scale size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Jurisdição</span>
            </div>
            <span className="text-xl font-medium text-white group-hover:text-cyan-100">
              {currentJurisdictionLabel || "Selecionar..."}
            </span>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">
               <ArrowRight size={20} />
            </div>
          </button>

          {/* Idioma */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="group relative flex flex-col items-start p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-left"
          >
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Globe size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Idioma</span>
            </div>
            <span className="text-xl font-medium text-white group-hover:text-purple-100">
              {currentLanguageLabel || "Selecionar..."}
            </span>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500">
               <ArrowRight size={20} />
            </div>
          </button>
        </div>

        {/* BLOCO 2: PARÂMETROS LEGAIS (SWITCHES) */}
        <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
           <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-400"/>
              <span className="text-sm font-semibold text-gray-300">Cláusulas de Proteção</span>
           </div>

           {[
              { key: "includeAsIs", label: "Cláusula AS-IS (Sem Garantia)", desc: "Protege contra falhas inesperadas do software." },
              { key: "includeIP", label: "Propriedade Intelectual (IP)", desc: "Declara que o código pertence à sua empresa." },
              { key: "includeLiability", label: "Limitação de Responsabilidade", desc: "Limita indenizações ao valor pago pelo usuário." },
              { key: "includeLastUpdated", label: 'Exibir data de atualização', desc: "Gera confiança mostrando a data do documento." },
              { key: "requireConsent", label: "Exigir Consentimento Explícito", desc: "O usuário deve marcar um checkbox para aceitar." },
            ].map((opt) => (
              <div key={opt.key} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="pr-4">
                  <div className="text-white font-medium mb-1">{opt.label}</div>
                  <div className="text-xs text-gray-500">{opt.desc}</div>
                </div>
                <MagicSwitch
                  checked={Boolean(form[opt.key as keyof FormState])}
                  onChange={(checked) => updateField(opt.key as keyof FormState, checked)}
                />
              </div>
            ))}
        </div>

      </div>

      {/* FOOTER FIXO */}
<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* BOTÃO VOLTAR (Novo) */}
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          {/* BOTÃO AVANÇAR */}
          <button
            onClick={nextStep}
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2"
          >
            Próximo <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showJurisdictionModal && (
        <ModalSelector
          title="Selecionar Jurisdição"
          options={jurisdictions}
          selected={form.jurisdiction}
          onSelect={(v) => {
            // CASTING SEGURO: Garantimos ao TS que v é Jurisdiction
            updateField("jurisdiction", v as Jurisdiction);
            setShowJurisdictionModal(false);
          }}
          onClose={() => setShowJurisdictionModal(false)}
        />
      )}

      {showLanguageModal && (
        <ModalSelector
          title="Selecionar Idioma"
          options={languages}
          selected={form.language}
          onSelect={(v) => {
             // CASTING SEGURO: Garantimos ao TS que v é Language
            updateField("language", v as Language);
            setShowLanguageModal(false);
          }}
          onClose={() => setShowLanguageModal(false)}
        />
      )}
    </div>
  );
}