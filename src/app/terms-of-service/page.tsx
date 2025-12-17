// src/app/terms-of-service/page.tsx
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300">
      
      {/* Navbar Falsa e Botão Voltar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/step-1" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Voltar ao Wizard
          </Link>
          <div className="flex items-center gap-2">
             <FileText className="text-cyan-400" size={20} />
             <span className="font-title text-lg font-bold text-white tracking-wider">PolicyGen</span>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-title font-bold text-white mb-2">Termos de Serviço do PolicyGen</h1>
          <p className="text-sm text-gray-500">Data de início de vigência: 16 de Dezembro de 2025</p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8">
          
          <p className="text-lg">
            Bem-vindo ao **PolicyGen**. Ao acessar ou utilizar nosso serviço, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis.
          </p>
          
          {/* SEÇÃO 1: Natureza do Serviço */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              1. Natureza da Ferramenta (Aviso Legal - AS-IS)
            </h2>
            <p>
              O PolicyGen é uma ferramenta de automação e assistência de Legal Tech. NÓS NÃO FORNECEMOS ACONSELHAMENTO JURÍDICO.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>O PolicyGen e o conteúdo gerado são fornecidos **"AS IS" (como estão)**, sem garantia de perfeição ou adequação a todos os contextos legais.</li>
              <li>A responsabilidade pelo uso, revisão final e implantação dos documentos gerados é **inteiramente sua**.</li>
              <li>Não nos responsabilizamos por multas, processos ou danos decorrentes da má aplicação dos documentos.</li>
            </ul>
          </section>

          {/* SEÇÃO 2: Uso da Conta */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              2. Sua Conta
            </h2>
            <p>
              Você é responsável por manter a confidencialidade da sua conta e senha.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>O uso da conta é pessoal e intransferível.</li>
              <li>Em caso de login via Google, você deve seguir os termos de serviço e privacidade do Google.</li>
            </ul>
          </section>
          
          {/* SEÇÃO 3: Direitos Autorais e IP */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
              3. Propriedade Intelectual (IP)
            </h2>
            <p>
              Os documentos gerados pelo PolicyGen para o seu projeto são de sua propriedade para uso comercial.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
              <li>O código-fonte e o design do PolicyGen permanecem nossa propriedade.</li>
              <li>Você pode usar, modificar e adaptar o conteúdo gerado (Markdown) em seu site, mas não pode revender o PolicyGen como um serviço de geração de documentos.</li>
            </ul>
          </section>

          {/* CLÁUSULA FINAL */}
          <section className="pt-4 border-t border-white/10">
              <p className="text-base text-gray-400">
                  Estes Termos de Serviço podem ser atualizados periodicamente. O uso contínuo após as alterações constitui aceitação dos novos termos.
              </p>
          </section>
        </article>
      </main>
      
    </div>
  );
}