// src/app/page.tsx
'use client';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-auto mx-auto space-y-auto">
      {/* HERO (card) */}
      <section className="card">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tron-glow">PolicyGen</h1>
            <p className="mt-3 text-gray-300 max-w-xl">
              Gerador de Termos de Uso e Políticas de Privacidade com IA.
              Responda passos simples e receba documentos alinhados com LGPD, GDPR e outras legislações.
            </p>

            <div className="mt-6 flex gap-3">
              <Link href="/step-1" className="btn-primary">
                Começar Agora
              </Link>

            </div>
          </div>

          <div className="w-full md:w-96">
            <div className="bg-gradient-to-br from-black/30 to-white/2 rounded-xl p-4 border border-white/5">
              <h3 className="text-sm text-gray-300">O que você obtém</h3>
              <ul className="mt-3 text-gray-300 space-y-2 text-sm">
                <li>🎯 Políticas e Termos personalizados</li>
                <li>⚖️ Ajuda para conformidade (LGPD / GDPR)</li>
                <li>✍️ Saída em Markdown pronta para devs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (card com mini-cards) */}
      <section className="card">
        <h2 className="section-title">Como funciona</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="mini-card">
            <strong>1. Escolha</strong>
            <p className="text-sm text-gray-300 mt-2">Selecione Política, Termos, Cookies ou Pacote Completo.</p>
          </div>

          <div className="mini-card">
            <strong>2. Identifique o projeto</strong>
            <p className="text-sm text-gray-300 mt-2">Nome, responsável e contato do DPO (opcional).</p>
          </div>

          <div className="mini-card">
            <strong>3. Dados e tecnologia</strong>
            <p className="text-sm text-gray-300 mt-2">Como coleta, sensíveis, país de transferência, etc.</p>
          </div>

          <div className="mini-card">
            <strong>4. Modelo de negócio</strong>
            <p className="text-sm text-gray-300 mt-2">SaaS, App, freemium, assinatura, etc.</p>
          </div>

          <div className="mini-card">
            <strong>5. Revisar</strong>
            <p className="text-sm text-gray-300 mt-2">Revise a prévia (bloqueada) antes de gerar.</p>
          </div>

          <div className="mini-card">
            <strong>6. Gerar</strong>
            <p className="text-sm text-gray-300 mt-2">Receba Markdown coberto por marca d'água (download após pagamento/opção).</p>
          </div>
        </div>
      </section>

      {/* FORM INICIAL (card) */}
      <section className="card">
        <h2 className="section-title">Iniciar Geração</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <h3 className="font-semibold">Tipo de Documento</h3>
            <ul className="mt-3 text-sm text-gray-300 space-y-2">
              <li>• Política de Privacidade</li>
              <li>• Termos de Uso</li>
              <li>• Política de Cookies</li>
              <li>• Pacote Completo</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <h3 className="font-semibold">Identificação</h3>
            <ul className="mt-3 text-sm text-gray-300 space-y-2">
              <li>• Nome do Projeto</li>
              <li>• Responsável Legal</li>
              <li>• E-mail do DPO (opcional)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <h3 className="font-semibold">Dados & Jurisdição</h3>
            <ul className="mt-3 text-sm text-gray-300 space-y-2">
              <li>• Coleta de dados pessoais?</li>
              <li>• Dados sensíveis?</li>
              <li>• Países de transferência</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold">Configurações</h3>
              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li>• Modelo (SaaS / App / API)</li>
                <li>• Monetização (Freemium / Assinatura)</li>
              </ul>
            </div>

       
          </div>
        </div>
      </section>

      {/* PREVIEW + BENEFÍCIOS (card) */}
      <section className="card">
        <div className="md:flex md:items-start md:gap-8">
          <div className="flex-1">
            <h2 className="section-title">Pré-visualização</h2>
            <p className="text-gray-300 mt-3">Visualize um preview bloqueado do documento. Download completo após confirmação (ou em plano gratuito com limitações).</p>
          </div>

          <div className="w-full md:w-72 mt-6 md:mt-0">
            <h3 className="font-semibold">Por que PolicyGen</h3>
            <ul className="mt-3 text-sm text-gray-300 space-y-2">
              <li>• Documentos atualizados e personalizados</li>
              <li>• Markdown pronto para devs</li>
              <li>• Interface rápida e focada em desenvolvedores</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="card text-center">
        <h2 className="text-2xl font-semibold tron-glow">Pronto para proteger seu projeto?</h2>
        <div className="mt-4">
          <Link href="/step-1" className="btn-primary">
            Gerar Documento Agora
          </Link>
        </div>
      </section>
    </main>
  );
}
