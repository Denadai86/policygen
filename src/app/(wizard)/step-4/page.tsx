// src/app/(wizard)/step-4/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Scale, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import MagicSwitch from "../../../components/MagicSwitch";
import ModalSelector from "../../../components/ModalSelector";
import { jurisdictions } from "../../../data/jurisdictions";
import { languages } from "../../../data/languages";
import { useWizard } from "@/app/context/WizardContext";
import type { Jurisdiction, Language } from "@/app/context/WizardContext";

type FormState = {
  jurisdiction: Jurisdiction;
  language: Language;
  includeAsIs: boolean;
  includeIP: boolean;
  includeLiability: boolean;
  includeLastUpdated: boolean;
  requireConsent: boolean;
};

function Step4Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { data, update } = useWizard();

  const [showJurisdictionModal, setShowJurisdictionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [form, setForm] = useState<FormState>({
    jurisdiction: (data.jurisdiction as Jurisdiction) || "br",
    language: (data.language as Language) || "pt-br",
    includeAsIs: data.includeAsIs ?? true,
    includeIP: data.includeIP ?? true,
    includeLiability: data.includeLiability ?? true,
    includeLastUpdated: data.includeLastUpdated ?? true,
    requireConsent: data.requireConsent ?? false,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      jurisdiction: (data.jurisdiction as Jurisdiction) ?? prev.jurisdiction,
      language: (data.language as Language) ?? prev.language,
    }));
  }, [data.jurisdiction, data.language]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    update(form);
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-5${query}`);
  };

  const handleBack = () => {
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-3${query}`);
  };

  const currentJurisdictionLabel = jurisdictions.find(j => j.value === form.jurisdiction)?.label;
  const currentLanguageLabel = languages.find(l => l.value === form.language)?.label;

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex-none pt-12 pb-8 px-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-white mb-4 tracking-tight">Escopo & Idioma</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Defina fronteiras legais e idioma.</p>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 pb-36 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => setShowJurisdictionModal(true)} className="group relative flex flex-col items-start p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-2"><Scale size={18} /><span className="text-xs font-bold uppercase tracking-wider">Jurisdição</span></div>
            <span className="text-xl font-medium text-white group-hover:text-cyan-100">{currentJurisdictionLabel || "Selecionar..."}</span>
          </button>

          <button onClick={() => setShowLanguageModal(true)} className="group relative flex flex-col items-start p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-2"><Globe size={18} /><span className="text-xs font-bold uppercase tracking-wider">Idioma</span></div>
            <span className="text-xl font-medium text-white group-hover:text-purple-100">{currentLanguageLabel || "Selecionar..."}</span>
          </button>
        </div>

        <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
           <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-400"/>
              <span className="text-sm font-semibold text-gray-300">Cláusulas de Proteção</span>
           </div>
           {[
              { key: "includeAsIs", label: "Cláusula AS-IS", desc: "Sem garantia (Proteção padrão)." },
              { key: "includeIP", label: "Propriedade Intelectual", desc: "O código pertence à empresa." },
              { key: "includeLiability", label: "Limitação Responsabilidade", desc: "Limita indenizações." },
              { key: "includeLastUpdated", label: 'Exibir data', desc: "Gera confiança." },
              { key: "requireConsent", label: "Exigir Consentimento", desc: "Checkbox obrigatório." },
            ].map((opt) => (
              <div key={opt.key} className="p-5 flex items-center justify-between hover:bg-white/[0.02]">
                <div className="pr-4"><div className="text-white font-medium mb-1">{opt.label}</div><div className="text-xs text-gray-500">{opt.desc}</div></div>
                <MagicSwitch checked={Boolean(form[opt.key as keyof FormState])} onChange={(checked) => updateField(opt.key as keyof FormState, checked)} />
              </div>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 font-medium"><ArrowLeft size={18} /> Voltar</button>
          <button onClick={nextStep} className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2">Próximo <ArrowRight size={18} /></button>
        </div>
      </div>

      {showJurisdictionModal && <ModalSelector title="Selecionar Jurisdição" options={jurisdictions} selected={form.jurisdiction} onSelect={(v) => { updateField("jurisdiction", v as Jurisdiction); setShowJurisdictionModal(false); }} onClose={() => setShowJurisdictionModal(false)} />}
      {showLanguageModal && <ModalSelector title="Selecionar Idioma" options={languages} selected={form.language} onSelect={(v) => { updateField("language", v as Language); setShowLanguageModal(false); }} onClose={() => setShowLanguageModal(false)} />}
    </div>
  );
}

export default function Step4() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]"/>}>
      <Step4Content />
    </Suspense>
  );
}