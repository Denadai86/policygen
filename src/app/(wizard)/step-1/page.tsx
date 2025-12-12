// src/app/(wizard)/step-1/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, FileText, Lock, Ban, CheckCircle2, Sparkles } from "lucide-react";
import { useWizard } from "@/app/context/WizardContext";


export default function Step1() {
  const router = useRouter();
  const { update, data } = useWizard();

  const [selected, setSelected] = useState<string[]>(data.documentType || []);

  const toggleSelection = (doc: string) => {
    setSelected((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const nextStep = () => {
    if (selected.length === 0) return;
    update({ documentType: selected });
    router.push("/step-2");
  };

  const DocumentCard = ({
    title,
    desc,
    icon: Icon,
    locked = false,
    comingSoon = false,
    popular = false,
  }: {
    title: string;
    desc: string;
    icon: any;
    locked?: boolean;
    comingSoon?: boolean;
    popular?: boolean;
  }) => {
    const isActive = selected.includes(title);

    return (
      <button
        onClick={() => (!locked && !comingSoon ? toggleSelection(title) : null)}
        disabled={locked || comingSoon}
        className={`
          relative group flex flex-col p-5 rounded-2xl border text-left transition-all duration-300
          ${comingSoon || locked
            ? "border-white/10 bg-white/5 opacity-60 cursor-not-allowed"
            : isActive
            ? "border-cyan-400 bg-cyan-950/30 shadow-2xl shadow-cyan-500/10 ring-2 ring-cyan-400/20"
            : "border-white/10 bg-white/5 hover:border-cyan-400/60 hover:bg-white/10 hover:shadow-xl"
          }
          ${popular ? "ring-2 ring-cyan-400/30" : ""}
        `}
      >
        {/* Badge "Mais Popular" */}
        {popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={12} /> Mais Popular
            </span>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${isActive ? "bg-cyan-400/20 text-cyan-300" : "bg-white/10 text-gray-400"}`}>
            <Icon className="w-7 h-7" />
          </div>

          {!comingSoon && !locked && (
            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
              ${isActive ? "border-cyan-400 bg-cyan-400 text-black" : "border-white/30"}
            `}>
              {isActive && <CheckCircle2 size={18} />}
            </div>
          )}
        </div>

        <h3 className={`font-bold text-lg mb-2 ${isActive ? "text-white" : "text-gray-200"}`}>
          {title}
          {popular && <span className="ml-2 text-cyan-300 text-sm font-normal">(Recomendado)</span>}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>

        {comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-4 py-2 rounded border border-cyan-800">
                  ҈҈ Em breve ҈҈
              </span>
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Cabeçalho com título + subtítulo + preço */}
      <div className="text-center pt-8 pb-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          O que vamos blindar hoje?
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Escolha os documentos essenciais para deixar seu projeto 100% em conformidade com LGPD e GDPR.
        </p>

        {/* Pricing Preview (gatilho de valor) */}
        <div className="inline-flex items- gap-10 text-center bg-cyan-950/50 border border-cyan-800/50 rounded-full px-6 py-4">
          <span className="text-cyan-300 font-bold">  A partir de R$19,90  </span>
          <span className="text-gray-500 text-sm">• documento completo • download imediato</span>
        </div>
      </div>

      {/* Grid responsivo e bonito */}
      <div className="flex-1 px-6 pb-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <DocumentCard
            title="Política de Privacidade"
            desc="Obrigatória para qualquer site/app que coleta dados. Totalmente alinhada com LGPD e GDPR."
            icon={Shield}
            popular={true}
          />
          <DocumentCard
            title="Termos de Uso"
            desc="Define regras, limita responsabilidades e protege seu negócio contra mau uso."
            icon={FileText}
          />
          <DocumentCard
            title="Política de Cookies"
            desc="Transparência total sobre cookies e rastreamento. Essencial para consentimento válido."
            icon={Lock}
          />
          <DocumentCard
            title="Contrato de SaaS"
            desc="Para produtos B2B: SLAs, garantias, limites de uso e termos comerciais avançados."
            icon={Ban}
            comingSoon={true}
          />
        </div>
      </div>

      {/* Footer fixo com contador e botão */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            <span className="text-cyan-400 font-bold text-lg">{selected.length}</span> documento(s) selecionado(s)
            {selected.length > 0 && (
              <span className="ml-3 text-cyan-300">→ Recomendamos o pacote completo</span>
            )}
          </div>

          <button
            onClick={nextStep}
            disabled={selected.length === 0}
            className={`
              px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300
              ${selected.length === 0
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-xl hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:-translate-y-1"
              }
            `}
          >
            Continuar → Gerar Documentos
          </button>
        </div>
      </div>
    </div>
  );
}