//src/app/(wizard)/step-3/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/app/context/WizardContext";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function Step3() {
  const router = useRouter();
  const { data, update } = useWizard();

  const [form, setForm] = useState({
    collectsPersonal: data.collectsPersonal ?? false,
    collectsSensitive: data.collectsSensitive ?? false,
    purpose: data.purpose || "",
    transferCountries: data.transferCountries || "",
  });

  const updateField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    update(form);
    router.push("/step-4");
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-8 pb-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Configurações de Dados e Tecnologia
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Indique como seu serviço coleta, usa e transfere dados pessoais.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 max-w-3xl mx-auto w-full pb-24">
        <div className="grid grid-cols-1 gap-10">

          {/* Switch 1 */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-xl">
            <div>
              <h3 className="text-white font-semibold">Coleta dados pessoais?</h3>
              <p className="text-gray-400 text-sm mt-1">
                Informações como nome, e-mail, telefone, IP, etc.
              </p>
            </div>

            <button
              onClick={() =>
                updateField("collectsPersonal", !form.collectsPersonal)
              }
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                form.collectsPersonal ? "bg-cyan-500" : "bg-gray-700"
              }`}
            >
              <div
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                  form.collectsPersonal ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>

          {/* Switch 2 */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-xl">
            <div>
              <h3 className="text-white font-semibold">Coleta dados sensíveis?</h3>
              <p className="text-gray-400 text-sm mt-1">
                Dados de saúde, religião, biometria, etc.
              </p>
            </div>

            <button
              onClick={() =>
                updateField("collectsSensitive", !form.collectsSensitive)
              }
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                form.collectsSensitive ? "bg-cyan-500" : "bg-gray-700"
              }`}
            >
              <div
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                  form.collectsSensitive ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium text-sm">
              Objetivo da coleta
            </label>
            <textarea
              placeholder="Descreva por que seu serviço coleta dados pessoais."
              value={form.purpose}
              onChange={(e) => updateField("purpose", e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none min-h-32 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          {/* Transfer Countries */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium text-sm">
              Países de transferência (se houver)
            </label>
            <input
              type="text"
              placeholder="Ex: Estados Unidos, Portugal, Alemanha"
              value={form.transferCountries}
              onChange={(e) => updateField("transferCountries", e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

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
