// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import LoginButton from "@/components/LoginButton"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
 
import { 
  ShieldCheck, Code2, Zap, CheckCircle2, ArrowRight, Globe2,
  Lock, Terminal, Scale, FileText, User as UserIcon, Loader2 
} from "lucide-react";


// ===============================================
// FUNÇÃO HELPER: Lógica de exibição de nome
// ===============================================
const getDisplayIdentifier = (user: FirebaseUser | null): string => {
    if (!user) return 'Entrar / Gerar';

    // 1. Tenta o primeiro nome
    if (user.displayName) {
        return user.displayName.split(' ')[0];
    }
    
    // 2. Tenta a parte inicial do e-mail
    if (user.email) {
        return user.email.split('@')[0];
    }
    
    // 3. Fallback seguro
    return 'Usuário';
};


// ===============================================
// 1. AUTH WRAPPER (Gerencia Login e Redirect)
// ===============================================

function LandingPageAuthWrapper() {
    const router = useRouter();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Usuário logado: REDIRECIONA IMEDIATAMENTE PARA O DASHBOARD
                setUser(currentUser);
                router.push('/dashboard'); 
            } else {
                // Usuário deslogado: Mostra a Landing Page (finaliza o loading)
                setUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <Loader2 className="animate-spin text-cyan-400" size={48} />
                <p className='text-gray-400 ml-4'>Verificando sessão...</p>
            </div>
        );
    }

    return <LandingPageContent user={user} />;
}


// ===============================================
// 2. LANDING PAGE CONTENT (O Design)
// ===============================================

function LandingPageContent({ user }: { user: FirebaseUser | null }) {
  const displayIdentifier = getDisplayIdentifier(user);
  const userIsLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505] selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* BACKGROUND GRID EFFECT (Visual Tech) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>

      {/* NAVBAR - AJUSTADA COM IDENTIFICADOR */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-cyan-400" size={24} />
            <span className="font-title text-xl font-bold text-white tracking-wider">PolicyGen</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#compliance" className="hover:text-white transition-colors">Global Compliance</Link>
            <Link href="#como-funciona" className="hover:text-white transition-colors">Como funciona</Link>
            <Link href="#precos" className="hover:text-white transition-colors">Preços</Link>
          </div>

          {/* CTA NAV BAR: AGORA EXIBE O IDENTIFICADOR */}
          {userIsLoggedIn ? (
              <Link 
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
              >
                  <UserIcon size={16} className="text-cyan-400"/>
                  {displayIdentifier}
              </Link>
          ) : (
              <LoginButton
                  className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                  {displayIdentifier} <ArrowRight size={14}/>
              </LoginButton>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium uppercase tracking-wider mb-2 animate-in fade-in slide-in-from-bottom-4">
            <Zap size={12} fill="currentColor" /> Novo: Exportação para GitHub Gist
          </div>

          <h1 className="text-5xl md:text-7xl font-title font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Blindagem Jurídica para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Desenvolvedores & SaaS
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Gere Termos de Uso e Políticas de Privacidade personalizados em minutos. 
            Saída em <strong>Markdown</strong>, pronta para o seu repositório. 
            Sem "advogadês", focado em LGPD, GDPR e Leis Globais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* CTA HERO SECTION */}
            {userIsLoggedIn ? (
                <Link 
                    href="/dashboard" 
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    Ir para Dashboard
                    <ArrowRight size={20} />
                </Link>
            ) : (
                 <LoginButton 
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                 >
                    Começar Blindagem
                    <ArrowRight size={20} />
                 </LoginButton>
            )}
            
            <a href="#compliance" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition-all">
                Entenda a Cobertura
            </a>
          </div>


          {/* LEGAL CITATION (Trust Trigger) */}
          <p className="mt-4 text-xs text-gray-500 animate-in fade-in duration-1000 delay-300">
            🔍 Revisado juridicamente para conformidade com a Lei nº 13.709/2018 (LGPD) e GDPR.
          </p>

        </div>
      </section>

      {/* ... (Restante do código da Landing Page - Previews, Compliance, Preços, etc.) ... */}
      <section id="compliance" className="py-24 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        {/* Decorative elements */}
        <Globe2 className="absolute -right-10 top-20 text-white/5 w-96 h-96 rotate-12 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="md:flex items-center gap-16">
            <div className="flex-1 mb-10 md:mb-0">
               <h2 className="text-3xl md:text-4xl font-title font-bold text-white mb-6">
               Seu SaaS não tem fronteiras.<br/>
               <span className="text-cyan-500">Sua proteção também não.</span>
               </h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-6">
                 Muitos geradores focam apenas no Brasil. Mas se seu software é acessado por um usuário na Califórnia, você está sujeito à <strong>CCPA</strong>. Se um europeu compra seu curso, a <strong>GDPR</strong> se aplica.
               </p>
               <p className="text-gray-400 text-lg leading-relaxed mb-8">
                 O PolicyGen entende a natureza global dos negócios digitais. Nossa IA detecta seu modelo (SaaS, E-commerce, Info) e insere cláusulas que cobrem jurisdições internacionais automaticamente.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Scale className="text-green-400" size={20}/>
                    <span className="text-white font-medium">LGPD (Brasil)</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Scale className="text-blue-400" size={20}/>
                    <span className="text-white font-medium">GDPR (Europa)</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Scale className="text-purple-400" size={20}/>
                    <span className="text-white font-medium">CCPA (EUA)</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <Scale className="text-yellow-400" size={20}/>
                    <span className="text-white font-medium">CalOPPA (Global)</span>
                 </div>
               </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-6">
                 <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-cyan-500/30 transition-all">
                    <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
                      <Code2 size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Developer First</h3>
                    <p className="text-gray-500 text-sm">
                      Esqueça PDFs travados. Receba Markdown (`.md`) limpo, perfeito para versionar no Git, renderizar no React ou converter para HTML.
                    </p>
                 </div>

                 <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-cyan-500/30 transition-all">
                    <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                      <Lock size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Segurança Jurídica</h3>
                    <p className="text-gray-500 text-sm">
                      Cláusulas de "Limitação de Responsabilidade" (AS-IS) essenciais para proteger desenvolvedores de processos indevidos por bugs ou falhas.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ... (Resto do conteúdo da landing page) ... */}

      {/* FOOTER - Mantido o original */}
      <footer className="py-12 border-t border-white/10 bg-black text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-cyan-600" size={24} />
            <span className="font-title text-xl font-bold text-gray-500 tracking-wider">PolicyGen</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Feito por desenvolvedores, para desenvolvedores.
          </p>
          <div className="text-xs text-gray-700 max-w-lg mx-auto">
            AVISO LEGAL: O PolicyGen fornece modelos baseados em informações comuns. Não somos um escritório de advocacia e não fornecemos aconselhamento jurídico. O uso dos documentos é de sua responsabilidade.
          </div>
          
          {/* TRUST TRIGGER: TECH STACK */}
          <div className="mt-8 flex flex-col items-center gap-2 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Ação Leve. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity mt-2">
              <span>Built with</span>
              <span className="font-bold text-gray-500">Next.js 15</span>
              <span>•</span>
              <span className="font-bold text-gray-500">Tailwind</span>
              <span>•</span>
              <span className="font-bold text-gray-500">Vercel</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Exporta o wrapper que lida com o estado de autenticação
export default LandingPageAuthWrapper;