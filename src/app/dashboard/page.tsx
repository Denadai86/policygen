// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { 
  Plus, FileText, Loader2, LogOut, 
  Calendar, CheckCircle, AlertCircle, ArrowRight 
} from "lucide-react";
import Link from "next/link";

// Definição do Tipo de Projeto (igual ao que salvamos)
interface Project {
  id: string;
  name: string;
  status: "draft" | "paid";
  createdAt: any;
  updatedAt: any;
  answers: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  // 1. Verificar Autenticação e Buscar Projetos
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Se não tiver logado, manda pra Home
        router.push("/");
        return;
      }
      setUser(currentUser);
      await fetchProjects(currentUser.uid);
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Função que busca no Firestore
  const fetchProjects = async (userId: string) => {
    try {
      const projectsRef = collection(db, "projects");
      // Query: "Me dê projetos onde userId == X, ordenados por data"
      const q = query(
        projectsRef, 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];

      setProjects(projectsData);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Função de Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // 4. Formatar Data (ex: 15/12/2025)
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    // O Firebase devolve um Timestamp especial, convertemos para Date JS
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-cyan-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* HEADER DO DASHBOARD */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link href="/" className="font-title text-xl font-bold tracking-wider hover:text-cyan-400 transition-colors">
               PolicyGen
             </Link>
             <span className="text-gray-600">/</span>
             <span className="text-sm font-medium text-gray-400">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              {user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-red-400"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Meus Projetos</h1>
            <p className="text-gray-400">Gerencie seus documentos e atualizações.</p>
          </div>
          
          <Link 
            href="/step-1"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <Plus size={20} /> Novo Projeto
          </Link>
        </div>

        {/* LISTA DE PROJETOS */}
        {projects.length === 0 ? (
          // Estado Vazio (Empty State)
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum projeto ainda</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Crie seu primeiro projeto para gerar Termos de Uso e Políticas personalizados.
            </p>
            <Link 
              href="/step-1"
              className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
            >
              Começar agora
            </Link>
          </div>
        ) : (
          // Grid de Cards
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group p-6 rounded-2xl bg-[#0f1115] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col"
              >
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${
                    project.status === 'paid' 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    <FileText size={24} />
                  </div>
                  
                  {/* Badge de Status */}
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                    project.status === 'paid'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {project.status === 'paid' ? (
                      <><CheckCircle size={10} /> Vitalício</>
                    ) : (
                      <><AlertCircle size={10} /> Rascunho</>
                    )}
                  </span>
                </div>

                {/* Info do Projeto */}
                <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Criado em {formatDate(project.createdAt)}</span>
                </div>

                {/* Footer do Card (Ações) */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                   {project.status === 'paid' ? (
                     <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                       Ver Documentos <ArrowRight size={14} />
                     </button>
                   ) : (
                     <Link 
                       href={`/step-6?projectId=${project.id}`} // Futuramente vamos usar isso pra retomar o pagamento
                       className="text-sm font-medium text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
                     >
                       Finalizar Compra <ArrowRight size={14} />
                     </Link>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}