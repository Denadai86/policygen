// src/app/(wizard)/step-6/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useWizard } from "../../context/WizardContext";
import { FileText, ArrowRight, CheckCircle } from "lucide-react";

// -----------------------------
// Mapeamentos (Mantidos para exibição correta)
// -----------------------------
const jurisdictions = {
  br: "Brasil (LGPD)",
  us: "Estados Unidos (CCPA/VCDPA)",
  eu: "União Europeia (GDPR)",
};

const languages = {
  "pt-br": "Português (Brasil)",
  pt: "Português",
  en: "Inglês",
  es: "Espanhol",
  fr: "Francês",
};

// -----------------------------
// Helpers
// -----------------------------
const show = (v: any) =>
  v !== undefined &&
  v !== null &&
  v !== "" &&
  !(Array.isArray(v) && v.length === 0);

const prettyCategories = (obj: any) => {
  if (!obj || typeof obj !== "object") return [];
  const map: Record<string, string> = {
    essential: "Essenciais",
    functional: "Funcionais",
    analytics: "Analytics",
    marketing: "Marketing",
    performance: "Performance",
    security: "Segurança",
    ads: "Publicidade / Ads",
  };
  return Object.entries(obj)
    .filter(([_, v]) => v === true)
    .map(([k]) => map[k] ?? k);
};

export default function Step6() {
  const router = useRouter();
  const { data } = useWizard();

  // Ação simples: Navegar para a página que chama a API
  const handleConfirm = () => {
    // IMPORTANTE: Verifique se sua pasta é 'src/app/(wizard)/final' -> rota '/final'
    // Se for 'src/app/wizard/final' -> rota '/wizard/final'
    router.push("/final"); 
  };

  return (
    <div className="w-full min-h-screen pb-40 relative select-none">
      
      {/* Header Simples */}
      <div className="text-center pt-10 pb-8 px-8">
        <h1 className="text-4xl md:text-5xl font-title tron-glow">
          Revisão Final
        </h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Confira se os dados abaixo estão corretos antes de prosseguir.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* CARD DE RESUMO (Clean) */}
        <div className="card border border-white/10 bg-white/5 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl text-white font-bold">Resumo do Projeto</h2>
              <p className="text-xs text-gray-400">Dados coletados para geração</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 text-sm leading-relaxed">
            
            {/* COLUNA 1: Identidade & Docs */}
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  Identidade
                </h3>
                <div className="pl-4 space-y-1">
                  <p><span className="text-gray-500">Nome:</span> {data.projectName || "—"}</p>
                  {show(data.brandName) && <p><span className="text-gray-500">Fantasia:</span> {data.brandName}</p>}
                  {show(data.legalName) && <p><span className="text-gray-500">Razão Social:</span> {data.legalName}</p>}
                  <p><span className="text-gray-500">Email:</span> {data.contactEmail || "—"}</p>
                  {show(data.projectUrls) && (
                    <p><span className="text-gray-500">URL:</span> {Array.isArray(data.projectUrls) ? data.projectUrls.join(", ") : data.projectUrls}</p>
                  )}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  Documentos
                </h3>
                <div className="pl-4">
                  {show(data.documentType) ? (
                    <div className="flex flex-wrap gap-2">
                      {data.documentType?.map((d) => (
                        <span key={d} className="px-2 py-1 bg-white/10 rounded text-xs text-white border border-white/10">
                          {d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhum selecionado</p>
                  )}
                </div>
              </section>
            </div>

            {/* COLUNA 2: Legal & Dados */}
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Jurídico & Coleta
                </h3>
                <div className="pl-4 space-y-1">
                  <p><span className="text-gray-500">Jurisdição:</span> {jurisdictions[data.jurisdiction as keyof typeof jurisdictions] || data.jurisdiction}</p>
                  <p><span className="text-gray-500">Idioma:</span> {languages[data.language as keyof typeof languages] || data.language}</p>
                  <p><span className="text-gray-500">Coleta Pessoal:</span> {data.collectsPersonal ? "Sim" : "Não"}</p>
                  <p><span className="text-gray-500">Coleta Sensível:</span> {data.collectsSensitive ? "Sim" : "Não"}</p>
                </div>
              </section>

              {data.usesCookies && (
                <section>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    Cookies & Ads
                  </h3>
                  <div className="pl-4 space-y-1">
                    <p><span className="text-gray-500">Categorias:</span> {prettyCategories(data.cookieCategories).join(", ") || "Nenhuma"}</p>
                    <p><span className="text-gray-500">Ads Tracking:</span> {data.adTracking ? "Sim" : "Não"}</p>
                    <p><span className="text-gray-500">Compartilha Dados:</span> {data.sharesDataWithThirdParties ? "Sim" : "Não"}</p>
                    {show(data.cookieTools) && <p><span className="text-gray-500">Ferramentas:</span> {data.cookieTools!.join(", ")}</p>}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 w-full border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl py-6 px-6 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            Voltar
          </button>

          <button
            onClick={handleConfirm}
            className="group px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold flex items-center gap-3 shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            Confirmar e Gerar
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}