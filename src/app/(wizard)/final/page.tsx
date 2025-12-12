// src/app/(wizard)/final/page.tsx
"use client";

import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { useRouter } from "next/navigation";
import { saveToGist } from "@/app/actions/github"; // Import da Action
import { 
  Sparkles, Loader2, Download, ShieldCheck, 
  FileText, ArrowLeft, CheckCircle, Github, Copy, Check
} from "lucide-react";

// Tipagem exata do que vem do backend
type GeneratedDocs = {
  privacyPolicy: string;
  termsOfUse: string;
  cookiePolicy: string;
};

type ActiveTab = keyof GeneratedDocs;

export default function FinalPage() {
  const router = useRouter();
  const { data } = useWizard();

  // Estados de Interface
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados dos Dados
  const [docs, setDocs] = useState<GeneratedDocs | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab | null>(null);

  // Estados de Feedback (Loading botões específicos)
  const [isSavingGist, setIsSavingGist] = useState(false);
  const [copied, setCopied] = useState(false);

  // ===========================================
  // 1. LÓGICA DE GERAÇÃO (API)
  // ===========================================
  const generate = async () => {
    setLoading(true);
    setError(null);
    setDocs(null);

    try {
      console.log("📤 Enviando payload:", { answers: data });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: data }), // Formato correto para o Zod
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Falha ao comunicar com a IA.");
      }

      if (json.documents) {
        setDocs(json.documents);
        setActiveTab("privacyPolicy"); // Seleciona a primeira aba
      } else {
        throw new Error("A IA não retornou os documentos no formato esperado.");
      }

    } catch (err: any) {
      console.error("❌ Erro no front:", err);
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // 2. UTILITÁRIOS (Download, Copy, Gist)
  // ===========================================
  
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
    // Download com delay sequencial para evitar bloqueio do browser
    const queue = [
      { content: docs.privacyPolicy, name: "Politica_Privacidade.md" },
      { content: docs.termsOfUse, name: "Termos_de_Uso.md" },
      { content: docs.cookiePolicy, name: "Politica_Cookies.md" }
    ];

    queue.forEach((item, index) => {
      setTimeout(() => downloadFile(item.content, item.name), index * 800);
    });
  };

  const copyToClipboard = () => {
    if (!docs || !activeTab) return;
    const text = docs[activeTab];
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveGist = async () => {
    if (!docs || !activeTab) return;
    setIsSavingGist(true);

    try {
      // Se você ainda não criou a action, isso vai falhar graciosamente
      const filename = `${activeTab}.md`;
      const result = await saveToGist(filename, docs[activeTab]);

      if (result.success && result.url) {
        window.open(result.url, "_blank");
      } else {
        alert("Erro ao salvar: " + (result.error || "Verifique o token do GitHub"));
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao conectar com GitHub. Verifique se o Token está no .env.local");
    } finally {
      setIsSavingGist(false);
    }
  };

  // Mapeamento de nomes amigáveis
  const tabNames: Record<string, string> = {
    privacyPolicy: "Privacidade",
    termsOfUse: "Termos de Uso",
    cookiePolicy: "Cookies",
  };

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-24 px-6 relative min-h-screen flex flex-col">
       
       {/* MARCA D'ÁGUA BACKGROUND */}
       <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden z-0">
        <div className="text-[100px] md:text-[200px] font-title text-cyan-500/5 tracking-widest select-none whitespace-nowrap mt-20">
          POLICYGEN
        </div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-10 animate-in fade-in slide-in-from-top-5 duration-700">
        <h1 className="text-4xl md:text-5xl font-title tron-glow mb-4 text-white">
          Geração Inteligente
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Nossa IA compila suas regras de negócio em documentos jurídicos blindados.
        </p>
      </div>

      {/* ÁREA DE AÇÃO INICIAL */}
      {!docs && !loading && (
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            onClick={() => router.push("/step-6")}
            className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={18} />
            Revisar Dados
          </button>

          <button
            onClick={generate}
            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex gap-3 items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
          >
            <Sparkles size={20} />
            Gerar Documentos com IA
          </button>
        </div>
      )}

      {/* LOADING SPINNER */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
            <Loader2 className="animate-spin text-cyan-400 relative z-10" size={64} />
          </div>
          <h3 className="text-xl text-white font-semibold animate-pulse mt-6">Processando Jurisprudência...</h3>
          <p className="text-gray-500 text-sm mt-2">Redigindo cláusulas personalizadas.</p>
        </div>
      )}

      {/* MENSAGEM DE ERRO */}
      {error && (
        <div className="relative z-10 mx-auto max-w-lg mt-8 p-6 bg-red-900/20 border border-red-500/30 text-red-200 rounded-xl text-center backdrop-blur-sm">
          <p className="font-bold mb-2">❌ Ocorreu um erro</p>
          <p className="text-sm opacity-80 mb-4">{error}</p>
          <button 
            onClick={generate} 
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-lg text-sm transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* VISUALIZADOR DE DOCUMENTOS (RESULTADO) */}
      {docs && !loading && (
        <div className="relative z-10 mt-8 animate-in zoom-in-95 duration-500 w-full">
          
          {/* Barra de Sucesso e Ações Globais */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3 text-green-400">
              <div className="bg-green-400/10 p-2 rounded-full">
                <CheckCircle size={24} />
              </div>
              <div>
                <span className="font-bold text-white block">Documentos Gerados!</span>
                <span className="text-xs text-gray-400">Prontos para uso.</span>
              </div>
            </div>
            <button
              onClick={downloadAll}
              className="w-full md:w-auto px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Download size={18} />
              Baixar Pacote Completo (.md)
            </button>
          </div>

          {/* Container Principal */}
          <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
            
            {/* Abas de Navegação */}
            <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto scrollbar-hide">
              {Object.keys(docs).map((key) => {
                const docKey = key as ActiveTab;
                const isActive = activeTab === docKey;
                
                // Pula se o documento estiver vazio (caso raro)
                if (!docs[docKey]) return null;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(docKey)}
                    className={`
                      px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap border-r border-white/5
                      ${isActive 
                        ? "text-cyan-400 bg-white/5 border-b-2 border-b-cyan-400" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border-b-2 border-b-transparent"
                      }
                    `}
                  >
                    <FileText size={16} className={isActive ? "text-cyan-400" : "text-gray-500"} />
                    {tabNames[key] || key}
                  </button>
                );
              })}
            </div>

            {/* Barra de Ferramentas do Documento Atual */}
            <div className="flex items-center justify-end gap-2 p-3 border-b border-white/5 bg-[#0a0c10]">
               <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
                  title="Copiar para área de transferência"
                >
                  {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>}
                  {copied ? "Copiado!" : "Copiar"}
               </button>

               <button 
                  onClick={handleSaveGist}
                  disabled={isSavingGist}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors disabled:opacity-50"
                  title="Salvar como Gist no GitHub"
                >
                  {isSavingGist ? <Loader2 size={14} className="animate-spin"/> : <Github size={14}/>}
                  GitHub Gist
               </button>

               <button 
                  onClick={() => activeTab && downloadFile(docs[activeTab], `${activeTab}.md`)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
                  title="Baixar apenas este arquivo"
                >
                  <Download size={14}/>
                  Download
               </button>
            </div>

            {/* Conteúdo do Documento */}
            <div className="flex-1 p-6 md:p-8 bg-black/20 relative overflow-hidden">
              {activeTab && docs[activeTab] ? (
                <div className="h-[500px] overflow-y-auto custom-scrollbar pr-2">
                   {/* Renderização estilo Markdown (Monospace) */}
                   <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed selection:bg-cyan-500/30 selection:text-cyan-100">
                     {docs[activeTab]}
                   </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 italic gap-2 opacity-50">
                  <FileText size={48} strokeWidth={1} />
                  <p>Selecione um documento acima para visualizar.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer de Navegação */}
          <div className="text-center mt-12 pb-10">
            <p className="text-gray-500 text-sm mb-4">Deseja alterar as respostas e gerar novamente?</p>
            <button
              onClick={() => router.push("/step-1")}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium hover:underline transition-all"
            >
              Reiniciar Wizard do Zero
            </button>
          </div>

        </div>
      )}
    </div>
  );
}