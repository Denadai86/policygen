// src/app/(wizard)/step-2/page.tsx
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/app/context/WizardContext";

import { ArrowLeft, ArrowRight, Check, Building2, Globe, IdCard, Mail, Type } from "lucide-react";

type FormState = {
  projectName: string;
  brandName: string;
  legalName: string;
  contactEmail: string;
  projectUrls: string; // armazenamos como CSV na UI, salvamos como array no contexto
};

type InputFieldProps = {
  label: string;
  icon: React.ComponentType<any>;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
};

// COMPONENTE EXTERNO E MEMOIZADO (evita remounts)
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

export default function Step2() {
  const router = useRouter();
  const { update, data } = useWizard();

  // Inicializa o state com os dados existentes do contexto (sem reassigns em cada render)
  const [form, setForm] = useState<FormState>({
    projectName: data.projectName || "",
    brandName: data.brandName || "",
    legalName: data.legalName || "",
    contactEmail: data.contactEmail || "",
    projectUrls: Array.isArray(data.projectUrls)
      ? data.projectUrls.join(", ")
      : data.projectUrls || "",
  });

  // Função estável para atualizar campos (useCallback evita recriação)
  const updateField = useCallback((key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (!form.projectName.trim()) return;

    // converte CSV de URLs em array ao salvar no contexto
    const urlsArray = form.projectUrls
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);

    update({
      ...form,
      projectUrls: urlsArray,
    });

    router.push("/step-3");
  }, [form, router, update]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-8 pb-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Informações do seu Projeto
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Preencha os dados abaixo para personalizarmos seus documentos de forma profissional.
        </p>
      </div>

      {/* Form container */}
      <div className="flex-1 px-6 max-w-3xl mx-auto w-full pb-28">
        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Nome do Projeto / Aplicação"
            icon={Type}
            placeholder="Ex: Brinca Aí, PolicyGen, Meu App Financeiro"
            value={form.projectName}
            onChange={(v) => updateField("projectName", v)}
            required
          />

          <InputField
            label="Nome Fantasia / Nome Comercial"
            icon={IdCard}
            placeholder="Ex: Acaolece, Acaoleve, AcaoLabs"
            value={form.brandName}
            onChange={(v) => updateField("brandName", v)}
            required
          />

          <InputField
            label="Responsável Legal / Empresa"
            icon={Building2}
            placeholder="Ex: Acaolece Tecnologia LTDA, João Silva ME"
            value={form.legalName}
            onChange={(v) => updateField("legalName", v)}
            required
          />

          <InputField
            label="E-mail de Contato / DPO"
            icon={Mail}
            placeholder="Ex: privacidade@empresa.com"
            value={form.contactEmail}
            onChange={(v) => updateField("contactEmail", v)}
          />

          <InputField
            label="URL(s) do Projeto (separe por vírgula)"
            icon={Globe}
            placeholder="Ex: https://meuapp.com, https://app.minhaempresa.com"
            value={form.projectUrls}
            onChange={(v) => updateField("projectUrls", v)}
          />
        </div>
      </div>

      {/* Footer */}
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
    </div>
  );
}
