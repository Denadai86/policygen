// src/app/privacy-policy/page.tsx
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300">
      
      {/* Navbar Falsa e Botão Voltar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/step-1" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Voltar ao Wizard
          </Link>
          <div className="flex items-center gap-2">
             <ShieldCheck className="text-cyan-400" size={20} />
             <span className="font-title text-lg font-bold text-white tracking-wider">PolicyGen</span>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-title font-bold text-white mb-2">Política de Privacidade do PolicyGen</h1>
          <p className="text-sm text-gray-500">Última atualização: 16 de Dezembro de 2025</p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8">
          
          <p className="text-lg">
            Esta Política de Privacidade descreve como o **PolicyGen** (`policygen.com`) coleta, usa, armazena e protege as informações pessoais de seus usuários, em conformidade com a LGPD e a GDPR.
          </p>
          
          {/* SEÇÃO 1: Coleta de Dados */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              1. Dados Coletados
            </h2>
            <p>
              Coletamos dados estritamente necessários para operar e aprimorar nossos serviços.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>**Dados de Autenticação:** Coletados via Google Auth (Nome, E-mail, ID de Usuário). Usados para criar sua conta e proteger seu acesso.</li>
              <li>**Dados do Wizard (Respostas):** As respostas que você fornece para gerar os documentos (Nome da empresa, URLs, detalhes de coleta de dados). Esses dados são armazenados no Firestore e são estritamente privados.</li>
              <li>**Dados de Uso:** Registros de logs e uso do serviço (IP, navegador, páginas acessadas) para segurança e análise de desempenho.</li>
            </ul>
          </section>

          {/* SEÇÃO 2: Uso dos Dados */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              2. Como Usamos Seus Dados
            </h2>
            <p>
              Seus dados são usados para:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>Gerar os documentos legais personalizados por meio da IA (Gemini).</li>
              <li>Salvar o progresso dos seus projetos (rascunhos) no seu Dashboard.</li>
              <li>Comunicação sobre atualizações ou segurança.</li>
            </ul>
          </section>
          
          {/* SEÇÃO 3: Compartilhamento (Importante para IA) */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              3. Compartilhamento de Dados e IA
            </h2>
            <p>
              O PolicyGen utiliza serviços de terceiros para operar:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>**Google Firebase:** Para autenticação e armazenamento (Firestore).</li>
              <li>**Google Gemini API:** Para a geração do conteúdo jurídico. Suas respostas do Wizard são enviadas à API do Gemini APENAS para o propósito de geração dos documentos.</li>
            </ul>
          </section>

          {/* CLÁUSULA FINAL */}
          <section className="pt-4 border-t border-white/10">
              <p className="text-base text-gray-400">
                  Ao usar o PolicyGen, você reconhece e concorda com esta Política de Privacidade. Seus dados são tratados com o máximo rigor de segurança e confidencialidade.
              </p>
          </section>
        </article>
      </main>
      
    </div>
  );
}