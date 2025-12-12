// src/app/(wizard)/final/page.tsx
"use client";

import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { useRouter } from "next/navigation";
import { 
  Sparkles, Loader2, Download, ShieldCheck, 
  FileText, ArrowLeft, CheckCircle 
} from "lucide-react";

// Tipagem exata do que vem do backend
type GeneratedDocs = {
  privacyPolicy: string;
  termsOfUse: string;
  cookiePolicy: string;
};

export default function FinalPage() {
  const router = useRouter();
  const { data } = useWizard();

  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<GeneratedDocs | null>(null);
  const [activeTab, setActiveTab] = useState<keyof GeneratedDocs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);

    // Debug: ver o que estamos enviando
    console.log("📤 Enviando dados:", data);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CORREÇÃO CRÍTICA DO ERRO 400 AQUI:
        // A chave deve ser 'answers' para bater com o Zod no backend
        body: JSON.stringify({ 
          answers: data 
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || JSON.stringify(json.details) || "Falha na geração");
      }

      // O backend agora retorna { documents: { ... } }
      if (json.documents) {
        setDocs(json.documents);
        setActiveTab("privacyPolicy"); // Aba padrão inicial
      } else {
        throw new Error("Formato de resposta inválido da IA");
      }

    } catch (err: any) {
      console.error("Erro no front:", err);
      setError(err.message || "Ocorreu um erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    if (!docs) return;
    // Download sequencial com pequeno delay para o navegador não bloquear
    setTimeout(() => downloadFile(docs.privacyPolicy, "Politica_Privacidade.md"), 100);
    setTimeout(() => downloadFile(docs.termsOfUse, "Termos_de_Uso.md"), 500);
    setTimeout(() => downloadFile(docs.cookiePolicy, "Politica_Cookies.md"), 900);
  };

  const tabNames: Record<string, string> = {
    privacyPolicy: "Privacidade",
    termsOfUse: "Termos de Uso",
    cookiePolicy: "Cookies",
  };

  return (
    <div className="max-w-5xl mx-auto pt-16 pb-24 px-6 relative min-h-screen">
       {/* Marca d'água de fundo */}
       <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="text-[120px] md:text-[200px] font-title text-cyan-500/5 tracking-widest select-none whitespace-nowrap mt-20">
          POLICYGEN
        </div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-title tron-glow mb-4">
          Geração Inteligente
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Nossa IA está pronta para compilar suas regras de negócio em documentos jurídicos blindados.
        </p>
      </div>

      {/* ÁREA DE AÇÃO */}
      {!docs && !loading && (
        <div className="relative z-10 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            onClick={() => router.push("/step-6")}
            className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all"
          >
            <ArrowLeft size={18} />
            Revisar
          </button>

          <button
            onClick={generate}
            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex gap-3 items-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all scale-100 hover:scale-105"
          >
            <Sparkles size={20} />
            Gerar Documentos com IA
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 relative z-10">
          <Loader2 className="animate-spin text-cyan-400 mb-4" size={48} />
          <h3 className="text-xl text-white font-semibold animate-pulse">Consultando legislação e redigindo...</h3>
          <p className="text-gray-500 text-sm mt-2">Gerando 3 documentos completos...</p>
        </div>
      )}

      {/* ERRO */}
      {error && (
        <div className="relative z-10 mx-auto max-w-lg mt-8 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-center">
          <p>❌ {error}</p>
          <button onClick={generate} className="mt-2 text-sm underline hover:text-white">Tentar novamente</button>
        </div>
      )}

      {/* RESULTADO (Área dos Documentos) */}
      {docs && !loading && (
        <div className="relative z-10 mt-8 animate-in zoom-in-95 duration-500">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle size={24} />
              <span className="font-semibold text-lg">Sucesso! Documentos prontos.</span>
            </div>
            <button
              onClick={downloadAll}
              className="px-5 py-2 bg-green-500 text-black rounded-lg font-bold hover:bg-green-400 flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Download size={18} />
              Baixar Todos
            </button>
          </div>

          <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
            {/* TABS HEADER */}
            <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto">
              {Object.keys(docs).map((key) => {
                const docKey = key as keyof GeneratedDocs;
                const isActive = activeTab === docKey;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(docKey)}
                    className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                      isActive 
                        ? "text-cyan-400 border-b-2 border-cyan-400 bg-white/5" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <FileText size={16} />
                    {tabNames[key] || key}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 p-6 md:p-8 bg-black/20 relative">
              {activeTab && docs[activeTab] ? (
                <div className="relative group h-full">
                   <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button 
                        onClick={() => downloadFile(docs[activeTab], `${activeTab}.md`)}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded border border-white/10 backdrop-blur-sm"
                      >
                        Baixar este arquivo
                      </button>
                   </div>
                   <div className="h-[500px] overflow-y-auto custom-scrollbar pr-4">
                    <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
                      {docs[activeTab]}
                    </pre>
                   </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 italic">
                  Selecione um documento.
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mt-12 pb-10">
            <p className="text-gray-500 text-sm mb-4">Precisa ajustar algo?</p>
            <button
              onClick={() => router.push("/step-1")}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline"
            >
              Reiniciar Wizard
            </button>
          </div>

        </div>
      )}
    </div>
  );
}