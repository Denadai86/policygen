// src/app/page.tsx
'use client';

import Link from "next/link";
import { 
  ShieldCheck, 
  Code2, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Globe2,
  Lock, 
  Terminal,
  Scale,
  FileText
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505] selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* BACKGROUND GRID EFFECT (Visual Tech) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>

      {/* NAVBAR */}
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

          <Link 
            href="/step-1" 
            className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            Gerar Agora <ArrowRight size={14}/>
          </Link>
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
            <Link 
              href="/step-1" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Começar Blindagem
              <ArrowRight size={20} />
            </Link>
            
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

      {/* VISUAL CODE PREVIEW (The "Tangibility" Trigger) */}
      <section className="px-6 pb-24">
         <div className="mt-8 mb-12 relative max-w-4xl mx-auto group animate-in zoom-in-95 duration-1000 delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-xl bg-[#0d1117] ring-1 ring-white/10 leading-none flex items-top justify-start space-x-6 overflow-hidden shadow-2xl">
            
            {/* Barra Lateral do Editor (CORRIGIDO: hidden sm:flex) */}
            <div className="w-12 border-r border-white/5 bg-[#0a0c10] hidden sm:flex flex-col items-center pt-4 gap-3">
               <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>

            {/* Área de Código */}
            <div className="p-6 font-mono text-sm text-gray-400 w-full overflow-hidden text-left bg-[#0d1117]">
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">1</span>
                <span className="text-purple-400"># Política de Privacidade</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">2</span>
                <span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">3</span>
                <span>Esta Política descreve como a <span className="text-cyan-300 font-bold">Sua Empresa</span> coleta, usa e protege dados.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">4</span>
                <span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">5</span>
                <span className="text-blue-400">## 1. Coleta de Dados (LGPD Art. 7)</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">6</span>
                <span>Coletamos os seguintes dados para fins de autenticação e melhoria:</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">7</span>
                <span className="text-green-400">- E-mail (Obrigatório)</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">8</span>
                <span className="text-green-400">- Endereço IP (Logs de segurança)</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 select-none w-6 text-right">9</span>
                <span className="text-green-400">- Cookies de Analytics (Google/Meta)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL COMPLIANCE SECTION */}
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

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-white mb-4">
              Do Wizard ao Deploy
            </h2>
            <p className="text-gray-400">Três passos simples para proteger seu projeto.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-cyan-400 font-bold z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Terminal size={20} className="text-gray-400"/>
                  <h3 className="font-bold text-white text-lg">Defina a Stack</h3>
                </div>
                <p className="text-sm text-gray-400">Conte para a IA o que seu software faz: coleta cookies? Usa Stripe? Tem login social? É B2B ou B2C?</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-cyan-400 font-bold z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className="text-gray-400"/>
                  <h3 className="font-bold text-white text-lg">Personalização Legal</h3>
                </div>
                <p className="text-sm text-gray-400">Selecione jurisdição (Brasil/LGPD ou Europa/GDPR) e cláusulas de proteção de responsabilidade (AS-IS).</p>
              </div>
            </div>

             {/* Step 3 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-cyan-400 font-bold z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={20} className="text-gray-400"/>
                  <h3 className="font-bold text-white text-lg">Exportação Pronta</h3>
                </div>
                <p className="text-sm text-gray-400">Baixe os arquivos, copie para o clipboard ou salve direto no GitHub Gist. Pronto para comitar.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING (Atualizado para Early Access) */}
      <section id="precos" className="py-24 px-6 bg-gradient-to-b from-black to-cyan-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-white mb-4">
              Invista na sua segurança
            </h2>
            <p className="text-gray-400">Comece grátis hoje. Funcionalidades Premium chegando em breve.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-cyan-500/30 bg-white/[0.02] flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  Disponível Agora
               </div>
              <div className="mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Early Access</span>
                <div className="text-4xl font-bold text-white mt-2">Grátis</div>
                <p className="text-gray-400 text-sm mt-2">Geração completa em Markdown.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-500"/> Geração Ilimitada (Por enquanto)
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-500"/> Termos, Privacidade e Cookies
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-500"/> Exportação GitHub Gist
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-500"/> Copy & Paste (Markdown)
                </li>
              </ul>
              <Link href="/step-1" className="w-full py-3 rounded-xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors">
                Gerar Documentos Agora
              </Link>
            </div>

            {/* Pro Tier (Coming Soon) */}
            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
              <div className="mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-purple-400">Roadmap Pro</span>
                <div className="text-4xl font-bold text-white mt-2">R$ 49,90 <span className="text-lg font-normal text-gray-500">/único</span></div>
                <p className="text-gray-500 text-sm mt-2">O que estamos construindo para você.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Lock size={16} className="text-gray-600"/> 
                  <span>Download em <strong>PDF Profissional</strong></span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded ml-auto">Em breve</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Lock size={16} className="text-gray-600"/> 
                  <span>Hospedagem de Link Público</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Lock size={16} className="text-gray-600"/> 
                  <span>Monitoramento de Leis (Updates)</span>
                </li>
              </ul>
              <button disabled className="w-full py-3 rounded-xl border border-white/10 text-gray-500 font-bold text-center cursor-not-allowed group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors">
                Entrar na Lista de Espera
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION (Novo) */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-2xl md:text-3xl font-title font-bold text-white mb-10">
              Construindo para o futuro do Compliance
           </h2>
           
           <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
                 <div className="p-3 bg-red-500/10 rounded-lg text-red-400 mb-4">
                    <FileText size={24} />
                 </div>
                 <h3 className="text-white font-bold mb-2">Exportação PDF</h3>
                 <p className="text-gray-500 text-sm">Gere documentos prontos para enviar para o jurídico ou assinar digitalmente.</p>
                 <span className="mt-4 text-xs font-mono text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded">Sprint Atual</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center opacity-60">
                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 mb-4">
                    <Terminal size={24} />
                 </div>
                 <h3 className="text-white font-bold mb-2">PolicyGen API</h3>
                 <p className="text-gray-500 text-sm">Gere políticas programaticamente direto do seu CI/CD ou backend.</p>
                 <span className="mt-4 text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">Planejado Q1</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center opacity-60">
                 <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400 mb-4">
                    <Zap size={24} />
                 </div>
                 <h3 className="text-white font-bold mb-2">Auto-Update</h3>
                 <p className="text-gray-500 text-sm">Se a lei mudar, te avisamos e atualizamos seu documento automaticamente.</p>
                 <span className="mt-4 text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">Planejado Q2</span>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-title font-bold text-white mb-10 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <details className="group bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition-colors font-medium text-white">
                Isso substitui um advogado real?
                <ArrowRight className="group-open:rotate-90 transition-transform" size={16}/>
              </summary>
              <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed">
                Não. O PolicyGen é uma ferramenta de automação para startups e projetos iniciais. Para casos complexos, empresas grandes ou situações específicas, sempre consulte um advogado especializado.
              </div>
            </details>

            <details className="group bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition-colors font-medium text-white">
                Os documentos servem para a LGPD e GDPR?
                <ArrowRight className="group-open:rotate-90 transition-transform" size={16}/>
              </summary>
              <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed">
                Sim. Nossa IA foi treinada com base nas diretrizes da LGPD (Brasil) e GDPR (Europa), criando cláusulas específicas para tratamento de dados, consentimento e direitos dos titulares.
              </div>
            </details>

            <details className="group bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition-colors font-medium text-white">
                Como funciona a integração com GitHub?
                <ArrowRight className="group-open:rotate-90 transition-transform" size={16}/>
              </summary>
              <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed">
                No final do processo, você pode conectar sua conta (via Token seguro) e criar um "Gist" privado ou público com seus documentos, facilitando a importação para o seu projeto.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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