// src/app/(wizard)/final/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useWizard } from "../../context/WizardContext";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToGist } from "@/app/actions/github";
import { auth } from "@/lib/firebase"; 
import { createProject, updateProject } from "@/lib/db"; // Importamos o updateProject
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { 
  Sparkles, Loader2, Download, 
  ArrowLeft, CheckCircle, Copy, Check, Save, LogIn, RefreshCw
} from "lucide-react";


// Ícone do GitHub feito na mão para substituir o da biblioteca
function GithubIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}




// Tipos locais
type GeneratedDocs = {
  privacyPolicy: string;
  termsOfUse: string;
  cookiePolicy: string;
};
type ActiveTab = keyof GeneratedDocs;

function FinalPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useWizard();

  // Estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  // Controle de Projeto
  // Tenta pegar da URL (fluxo de edição) ou do estado local (fluxo de criação novo)
  const urlProjectId = searchParams.get("projectId");
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
  
  const activeProjectId = urlProjectId || savedProjectId;

  // Docs
  const [docs, setDocs] = useState<GeneratedDocs | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab | null>(null);

  // Feedback visual
  const [isSavingGist, setIsSavingGist] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Login
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert("Erro no login");
    }
  };

  // 3. SALVAR OU ATUALIZAR (A Lógica de Ouro) 🏆
  const handleSaveOrUpdate = async () => {
    if (!user || !data) return;
    setIsSavingProject(true);

    let result;

    if (activeProjectId) {
      // MODO EDIÇÃO: Atualiza o existente
      result = await updateProject(activeProjectId, data);
      if (result.success) {
        alert("Projeto atualizado com sucesso! Dados sincronizados.");
      }
    } else {
      // MODO CRIAÇÃO: Cria um novo
      result = await createProject(user.uid, data);
      if (result.success && result.projectId) {
        setSavedProjectId(result.projectId);
        alert("Novo projeto criado e salvo no Dashboard!");
      }
    }

    if (!result.success) {
      alert("Erro ao salvar: " + result.error);
    }
    
    setIsSavingProject(false);
  };

  // 4. Geração (Simulada ou Real)
  const generate = async () => {
    setLoading(true);
    setError(null);
    setDocs(null);
    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: data }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erro na IA");
        
        if (json.documents) {
            setDocs(json.documents);
            setActiveTab("privacyPolicy");
        }
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  // Utilitários de Download/Copy (Iguais ao anterior)
  const downloadFile = (content: string, filename: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; a.click();
  };
  
  const downloadAll = () => {
      if(!docs) return;
      downloadFile(docs.privacyPolicy, "Privacy.md");
      downloadFile(docs.termsOfUse, "Terms.md");
      downloadFile(docs.cookiePolicy, "Cookies.md");
  };

  const copyToClipboard = () => {
      if (!docs || !activeTab) return;
      navigator.clipboard.writeText(docs[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSaveGist = async () => {
       if (!docs || !activeTab) return;
       setIsSavingGist(true);
       try {
           const result = await saveToGist(`${activeTab}.md`, docs[activeTab]);
           if (result.success && result.url) window.open(result.url, "_blank");
           else alert("Erro Gist: " + result.error);
       } catch(e) { alert("Erro Gist"); }
       setIsSavingGist(false);
  };

  const tabNames: Record<string, string> = {
    privacyPolicy: "Privacidade",
    termsOfUse: "Termos de Uso",
    cookiePolicy: "Cookies",
  };

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-24 px-6 relative min-h-screen flex flex-col">
       
      {/* HEADER */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-title tron-glow mb-4 text-white">
          Revisão & Geração
        </h1>
        
        {/* ÁREA DE SALVAMENTO INTELIGENTE */}
        {docs && (
            <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-4">
                {!user ? (
                    <button 
                        onClick={handleLogin}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-lg animate-pulse"
                    >
                        <LogIn size={20} /> Entrar para Salvar (Acesso Vitalício)
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                           Logado como <span className="text-white font-medium">{user.displayName}</span>
                        </div>
                        
                        <button 
                            onClick={handleSaveOrUpdate}
                            disabled={isSavingProject}
                            className={`flex items-center gap-2 px-8 py-3 font-bold rounded-full transition-all shadow-lg text-white ${
                                activeProjectId 
                                ? "bg-purple-600 hover:bg-purple-500 shadow-purple-500/30" // Cor de Update
                                : "bg-green-600 hover:bg-green-500 shadow-green-500/30" // Cor de Salvar Novo
                            }`}
                        >
                            {isSavingProject ? (
                                <Loader2 className="animate-spin"/>
                            ) : activeProjectId ? (
                                <><RefreshCw size={20} /> Atualizar Versão do Projeto</>
                            ) : (
                                <><Save size={20} /> Salvar no Meu Painel</>
                            )}
                        </button>

                        {/* Link para voltar ao Dashboard */}
                        <button onClick={() => router.push('/dashboard')} className="text-xs text-gray-500 hover:text-white underline">
                            Ir para Dashboard
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* ÁREA DE AÇÃO INICIAL (Botão Gerar) */}
      {!docs && !loading && (
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={18} /> Voltar e Editar
          </button>

          <button
            onClick={generate}
            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex gap-3 items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105"
          >
            <Sparkles size={20} /> Gerar Documentos
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 relative z-10">
          <Loader2 className="animate-spin text-cyan-400 relative z-10" size={64} />
          <h3 className="text-xl text-white font-semibold animate-pulse mt-6">Gerando com IA...</h3>
          <p className="text-sm text-gray-500 mt-2">Isso pode levar alguns segundos.</p>
        </div>
      )}

      {/* ERRO */}
      {error && (
        <div className="relative z-10 mx-auto max-w-lg mt-8 p-6 bg-red-900/20 border border-red-500/30 text-red-200 rounded-xl text-center">
          <p>❌ {error}</p>
        </div>
      )}

      {/* PREVIEW DO DOCUMENTO */}
      {docs && !loading && (
        <div className="relative z-10 mt-8 animate-in zoom-in-95 duration-500 w-full">
             <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
                
                {/* TOOLBAR */}
                <div className="flex items-center justify-end gap-2 p-3 border-b border-white/5 bg-[#0a0c10]">
                    <button onClick={copyToClipboard} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-3 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">
                        {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>} {copied ? "Copiado!" : "Copiar"}
                    </button>
                    <button onClick={handleSaveGist} disabled={isSavingGist} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-3 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">
                         {isSavingGist ? <Loader2 className="animate-spin" size={14}/> : <GithubIcon size={14}/>} Gist
                    </button>
                     <button onClick={downloadAll} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-3 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">
                        <Download size={14}/> Baixar ZIP
                    </button>
                </div>

                {/* TABS */}
                <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto">
                    {Object.keys(docs).map((key) => (
                         <button key={key} onClick={() => setActiveTab(key as ActiveTab)} 
                            className={`px-6 py-4 text-sm font-medium border-r border-white/5 whitespace-nowrap transition-colors ${activeTab === key ? "text-cyan-400 bg-white/5" : "text-gray-400 hover:text-white"}`}>
                            {tabNames[key]}
                         </button>
                    ))}
                </div>

                {/* AREA DE TEXTO */}
                <div className="flex-1 p-6 md:p-8 bg-black/20 overflow-y-auto h-[500px]">
                    <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
                        {activeTab && docs[activeTab]}
                    </pre>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}

// Wrapper para Suspense
export default function FinalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500">Carregando finalização...</div>}>
      <FinalPageContent />
    </Suspense>
  );
}