// src/app/(wizard)/step-1/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Shield, 
  FileText, 
  Lock, 
  Ban, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  AlertCircle,
  Loader2,
  LogOut
} from "lucide-react";
import { useWizard } from "@/app/context/WizardContext";
import { getProject } from "@/lib/db"; 
import { auth } from "@/lib/firebase"; 
import { signOut } from "firebase/auth";

// ==========================================
// 1. CONFIGURAÇÃO
// ==========================================

interface DocumentOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  popular?: boolean;
  comingSoon?: boolean;
}

const AVAILABLE_DOCS: DocumentOption[] = [
  {
    id: "Política de Privacidade",
    title: "Política de Privacidade",
    description: "Obrigatória para qualquer site/app que coleta dados. Totalmente alinhada com LGPD e GDPR.",
    icon: Shield,
    popular: true,
  },
  {
    id: "Termos de Uso",
    title: "Termos de Uso",
    description: "Define regras, limita responsabilidades e protege seu negócio contra mau uso.",
    icon: FileText,
  },
  {
    id: "Política de Cookies",
    title: "Política de Cookies",
    description: "Transparência total sobre cookies e rastreamento. Essencial para consentimento válido.",
    icon: Lock,
  },
  {
    id: "Contrato de SaaS",
    title: "Contrato de SaaS",
    description: "Para produtos B2B: SLAs, garantias, limites de uso e termos comerciais avançados.",
    icon: Ban,
    comingSoon: true,
  },
];

// ==========================================
// 2. CARD COMPONENT
// ==========================================

interface CardProps {
  data: DocumentOption;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const DocumentCard = ({ data, isSelected, onToggle }: CardProps) => {
  const { id, title, description, icon: Icon, popular, comingSoon } = data;

  const handleClick = () => {
    if (!comingSoon) onToggle(id);
  };

  const wrapperClasses = `
    relative group flex flex-col p-6 rounded-2xl border text-left transition-all duration-300 w-full h-full
    ${comingSoon 
      ? "border-white/5 bg-white/5 opacity-50 cursor-not-allowed" 
      : isSelected
        ? "border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-900/20 ring-1 ring-cyan-400/30 transform scale-[1.02]"
        : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-lg"
    }
  `;

  return (
    <button onClick={handleClick} disabled={comingSoon} className={wrapperClasses} aria-pressed={isSelected}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-cyan-500/20">
            <Sparkles size={12} fill="black" /> Recomendado
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-5 w-full">
        <div className={`p-3 rounded-xl transition-colors ${isSelected ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5 text-gray-400 group-hover:text-cyan-200"}`}>
          <Icon className="w-8 h-8" />
        </div>
        {!comingSoon && (
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "border-cyan-400 bg-cyan-400 text-black scale-100" : "border-white/20 scale-90 group-hover:border-white/40"}`}>
            {isSelected && <CheckCircle2 size={16} strokeWidth={3} />}
          </div>
        )}
      </div>

      <h3 className={`font-bold text-lg mb-2 transition-colors ${isSelected ? "text-white" : "text-gray-200 group-hover:text-white"}`}>
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed font-medium">
        {description}
      </p>

      {comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl z-20">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/90 px-3 py-1.5 rounded border border-cyan-800/50">
            Em breve
          </span>
        </div>
      )}
    </button>
  );
};

// ==========================================
// 3. LOGICA PRINCIPAL
// ==========================================

function Step1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // CORREÇÃO: Usando 'update' conforme seu WizardContext
  const { update, data } = useWizard(); 

  const [loadingProject, setLoadingProject] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>(data.documentType || []);

  // Sincroniza estado local com contexto
  useEffect(() => {
    if (data.documentType) {
      setSelectedDocs(data.documentType);
    }
  }, [data.documentType]);

  // EFEITO DE HIDRATAÇÃO 💧 (Busca dados se tiver ID na URL)
  useEffect(() => {
    const projectId = searchParams.get("projectId");
    
    // Se tem ID na URL e o contexto está vazio de nome, busca no banco
    if (projectId && !data.projectName) { 
      loadProjectData(projectId);
    }
  }, [searchParams]);

  const loadProjectData = async (id: string) => {
    setLoadingProject(true);
    const result = await getProject(id);
    
    if (result.success && result.data) {
      // INJEÇÃO DE DADOS: O contexto recebe tudo do banco
      update(result.data.answers);
      console.log("💧 Projeto hidratado:", result.data.answers);
    } else {
      console.error("Erro ao carregar projeto:", result.error);
    }
    setLoadingProject(false);
  };

  const toggleSelection = (docId: string) => {
    const newSelection = selectedDocs.includes(docId) 
      ? selectedDocs.filter((id) => id !== docId) 
      : [...selectedDocs, docId];
      
    setSelectedDocs(newSelection);
    // Atualiza contexto imediatamente
    update({ documentType: newSelection });
  };

  const handleNext = () => {
    if (selectedDocs.length === 0) return;
    
    // Mantém o ID na URL para os próximos passos saberem que é edição
    const projectId = searchParams.get("projectId");
    const query = projectId ? `?projectId=${projectId}` : "";
    
    router.push(`/step-2${query}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loadingProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} />
        <p className="text-gray-400 animate-pulse">Carregando seu projeto...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* Botão de Logout */}
      <div className="absolute top-4 right-6 z-50">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
          title="Sair da conta"
        >
          <LogOut size={14} /> Sair
        </button>
      </div>

      {/* Header */}
      <div className="flex-none pt-12 pb-10 px-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-white mb-4 tracking-tight">
          Proteção Jurídica
          <span className="text-cyan-500">.</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Selecione os módulos de defesa para o seu software.
          <br className="hidden md:block"/> Nossa IA gera tudo baseado nas leis vigentes.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_DOCS.map((doc) => (
            <DocumentCard
              key={doc.id}
              data={doc}
              isSelected={selectedDocs.includes(doc.id)}
              onToggle={toggleSelection}
            />
          ))}
        </div>
      </div>

      {/* Footer de Ação */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0a0a]/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 text-sm">
            {selectedDocs.length === 0 ? (
              <div className="flex items-center gap-2 text-yellow-500/80 animate-pulse">
                <AlertCircle size={16} />
                <span>Selecione pelo menos um documento</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-cyan-400">
                <CheckCircle2 size={18} />
                <span className="font-semibold">
                  {selectedDocs.length} {selectedDocs.length === 1 ? 'documento selecionado' : 'documentos selecionados'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedDocs.length === 0}
            className={`
              group relative flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300
              ${selectedDocs.length === 0
                ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] scale-100 hover:scale-[1.02]"
              }
            `}
          >
            <span>Continuar</span>
            <ArrowRight size={18} className={`transition-transform duration-300 ${selectedDocs.length > 0 ? "group-hover:translate-x-1" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Wrapper para Suspense (Next.js 15)
export default function Step1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <Step1Content />
    </Suspense>
  );
}