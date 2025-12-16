// src/app/(wizard)/step-2/page.tsx
"use client";

import React, { useCallback, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Adicionado useSearchParams
import { useWizard } from "@/app/context/WizardContext";

import { ArrowLeft, ArrowRight, Building2, Globe, IdCard, Mail, Type } from "lucide-react";

// TIPO PROPS (Memoizado)
type InputFieldProps = {
  label: string;
  icon: React.ComponentType<any>;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
};

// COMPONENTE DE INPUT (Memoizado para performance)
const InputField = React.memo(function InputField({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
        <Icon size={16} className="text-cyan-300" />
        {label}
        {required && <span className="text-cyan-400 ml-1">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
          placeholder-gray-500 outline-none transition-all
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30
        "
      />
    </div>
  );
});

function Step2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId"); // <--- AQUI: Lendo o ID
  const { update, data } = useWizard();

  // Inicializa state com dados do contexto
  const [form, setForm] = useState({
    projectName: data.projectName || "",
    brandName: data.brandName || "",
    legalName: data.legalName || "",
    contactEmail: data.contactEmail || "",
    projectUrls: Array.isArray(data.projectUrls)
      ? data.projectUrls.join(", ")
      : data.projectUrls || "",
  });

  const updateField = useCallback((key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (!form.projectName.trim()) return alert("O nome do projeto é obrigatório!");

    const urlsArray = form.projectUrls
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);

    update({
      ...form,
      projectUrls: urlsArray,
    });

    // MANTÉM O ID NA URL
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-3${query}`); // Repassando para o próximo passo
  }, [form, router, update, projectId]);

  const handleBack = () => {
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-1${query}`); // Repassando para o passo anterior
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* ... (Restante do conteúdo visual) ... */}
      <div className="text-center pt-8 pb-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Informações do seu Projeto
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Preencha os dados abaixo para personalizarmos seus documentos.
        </p>
      </div>

      <div className="flex-1 px-6 max-w-3xl mx-auto w-full pb-32">
        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Nome do Projeto / Aplicação"
            icon={Type}
            placeholder="Ex: PolicyGen, Meu SaaS"
            value={form.projectName}
            onChange={(v) => updateField("projectName", v)}
            required
          />
          <InputField
            label="Nome Fantasia / Comercial"
            icon={IdCard}
            placeholder="Ex: Ação Leve Tecnologia"
            value={form.brandName}
            onChange={(v) => updateField("brandName", v)}
            required
          />
          <InputField
            label="Razão Social / Nome Legal"
            icon={Building2}
            placeholder="Ex: João Silva ME, Ação Leve Ltda"
            value={form.legalName}
            onChange={(v) => updateField("legalName", v)}
            required
          />
          <InputField
            label="E-mail de Contato / DPO"
            icon={Mail}
            placeholder="privacidade@suaempresa.com"
            value={form.contactEmail}
            onChange={(v) => updateField("contactEmail", v)}
          />
          <InputField
            label="URL(s) do Projeto (separe por vírgula)"
            icon={Globe}
            placeholder="https://meusite.com, https://app.meusite.com"
            value={form.projectUrls}
            onChange={(v) => updateField("projectUrls", v)}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={18} /> Voltar
          </button>
          <button
            onClick={nextStep}
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2"
          >
            Próximo <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Step2() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <Step2Content />
    </Suspense>
  );
}