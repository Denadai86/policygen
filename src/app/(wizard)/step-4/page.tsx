// src/app/(wizard)/step-4/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MagicSwitch from "../../../components/MagicSwitch";
import ModalSelector from "../../../components/ModalSelector";
import { jurisdictions } from "../../../data/jurisdictions";
import { languages } from "../../../data/languages";
import { useWizard } from "@/app/context/WizardContext";

import { Globe, Scale } from "lucide-react";

type FormState = {
  jurisdiction: "br" | "eu";
  language: "pt-br" | "en";
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

  // mapeia estados iniciais a partir do contexto (garante booleans corretos)
  const [form, setForm] = useState<FormState>({
    jurisdiction: (data.jurisdiction as FormState["jurisdiction"]) ?? "br",
    language: (data.language as FormState["language"]) ?? "pt-br",
    includeAsIs: data.includeAsIs ?? true,
    includeIP: data.includeIP ?? true,
    includeLiability: data.includeLiability ?? true,
    includeLastUpdated: data.includeLastUpdated ?? true,
    requireConsent: data.requireConsent ?? false,
  });

  // se os dados do contexto mudarem externamente, atualiza (útil se voltar)
  useEffect(() => {
    setForm((f) => ({
      ...f,
      jurisdiction: data.jurisdiction ?? f.jurisdiction,
      language: data.language ?? f.language,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.jurisdiction, data.language]);

  const updateField = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v } as FormState));

  const nextStep = () => {
    update(form);
    router.push("/step-5");
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col pb-36">
        {/* HEADER */}
        <div className="text-center pt-12 pb-8 px-6">
          <h1 className="text-4xl md:text-5xl font-title tron-glow text-white">
            Escopo Legal & Idioma
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3">
            Ajuste os parâmetros legais para gerar documentos personalizados.
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex-1 px-6 max-w-4xl mx-auto w-full space-y-8">
          {/* Jurisdição */}
          <div className="space-y-2">
            <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
              <Scale size={16} className="text-cyan-300" />
              Jurisdição Aplicável
            </label>

            <button
              onClick={() => setShowJurisdictionModal(true)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-left hover:border-cyan-400/30 transition"
            >
              {jurisdictions.find((j) => j.value === form.jurisdiction)?.label ??
                "Selecionar jurisdição"}
            </button>
          </div>

          {/* Idioma */}
          <div className="space-y-2">
            <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
              <Globe size={16} className="text-cyan-300" />
              Idioma do Documento
            </label>

            <button
              onClick={() => setShowLanguageModal(true)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-left hover:border-cyan-400/30 transition"
            >
              {languages.find((l) => l.value === form.language)?.label ?? "Selecionar idioma"}
            </button>
          </div>

          {/* Seção de switches (cards) */}
          <div className="space-y-4">
            {(
              [
                { key: "includeAsIs", label: "Cláusula AS-IS (Sem Garantia)" },
                { key: "includeIP", label: "Propriedade Intelectual (IP)" },
                { key: "includeLiability", label: "Limitação de Responsabilidade" },
                { key: "includeLastUpdated", label: 'Exibir "Última Atualização"' },
                { key: "requireConsent", label: "Exigir Consentimento Explícito" },
              ] as Array<{ key: keyof FormState; label: string }>
            ).map((opt) => (
              <div
                key={opt.key}
                className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl"
              >
                <div>
                  <div className="text-sm text-gray-300 font-medium">{opt.label}</div>
                </div>

                <MagicSwitch
                  checked={Boolean(form[opt.key] as boolean)}
                  onChange={(next) => updateField(opt.key, next as FormState[typeof opt.key])}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl px-6 py-5 fixed bottom-0 w-full">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="text-gray-400 text-sm">Revise antes de gerar.</span>

            <button
              onClick={nextStep}
              className="px-8 py-3 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-xl transform hover:-translate-y-0.5 transition"
            >
              Continuar → Revisão Final
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showJurisdictionModal && (
        <ModalSelector
          title="Selecionar Jurisdição"
          options={jurisdictions}
          selected={form.jurisdiction}
          onSelect={(v: string) => {
            updateField("jurisdiction", v);
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
          onSelect={(v: string) => {
            updateField("language", v);
            setShowLanguageModal(false);
          }}
          onClose={() => setShowLanguageModal(false)}
        />
      )}
    </>
  );
}
