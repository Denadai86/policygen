"use client";

import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Cookie,
  Cpu,
  Globe,
  Shield,
} from "lucide-react";

export default function Step5() {
  const router = useRouter();
  const { data, update } = useWizard();

  // ============================================
  // STATES (são preenchidos com os valores existentes)
  // ============================================

  const [usesCookies, setUsesCookies] = useState(data.usesCookies ?? false);

  const [cookieCategories, setCookieCategories] = useState({
    essential: data.cookieCategories?.essential ?? true,
    functional: data.cookieCategories?.functional ?? false,
    analytics: data.cookieCategories?.analytics ?? false,
    marketing: data.cookieCategories?.marketing ?? false,
    performance: data.cookieCategories?.performance ?? false,
    security: data.cookieCategories?.security ?? false,
    ads: data.cookieCategories?.ads ?? false,
  });

  const [cookieTools, setCookieTools] = useState<string[]>(
    data.cookieTools ?? []
  );

  const [analyticsTools, setAnalyticsTools] = useState<string[]>(
    data.analyticsTools ?? []
  );

  const [adTracking, setAdTracking] = useState<boolean>(
    data.adTracking ?? false
  );

  const [sharesDataWithThirdParties, setSharesDataWithThirdParties] = useState(
    data.sharesDataWithThirdParties ?? false
  );

  const [thirdPartyList, setThirdPartyList] = useState<string[]>(
    data.thirdPartyList ?? []
  );

  const [cookieBannerStyle, setCookieBannerStyle] = useState(
    data.cookieBannerStyle ?? ""
  );

  const [retentionPolicy, setRetentionPolicy] = useState(
    data.retentionPolicy ?? ""
  );

  const [customCookieNotes, setCustomCookieNotes] = useState(
    data.customCookieNotes ?? ""
  );

  // ============================================
  // Helpers
  // ============================================

  const toggleCookieCategory = (key: keyof typeof cookieCategories) => {
    setCookieCategories(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleTool = (tool: string, state: string[], setter: any) => {
    if (state.includes(tool)) {
      setter(state.filter(t => t !== tool));
    } else {
      setter([...state, tool]);
    }
  };

  // ============================================
  // NEXT STEP
  // ============================================

  const nextStep = () => {
    update({
      usesCookies,
      cookieCategories,
      cookieTools,
      analyticsTools,
      adTracking,
      sharesDataWithThirdParties,
      thirdPartyList,
      cookieBannerStyle,
      retentionPolicy,
      customCookieNotes,
    });

    router.push("/step-6");
  };

  // ============================================
  // UI
  // ============================================
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-title tron-glow">Cookies & Tracking</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Como seu sistema utiliza cookies, rastreamento, analytics e dados de terceiros.
        </p>
      </div>

      <div className="space-y-10">

        {/* Usa cookies? */}
        <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
            <Cookie size={20} className="text-cyan-300" />
            Seu sistema usa cookies?
          </h2>

          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={usesCookies === true}
                onChange={() => setUsesCookies(true)}
              />
              Sim
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={usesCookies === false}
                onChange={() => setUsesCookies(false)}
              />
              Não
            </label>
          </div>
        </section>

        {/* Categorias */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
              <Shield size={20} className="text-cyan-300" />
              Categorias de Cookies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {[
                ["Essenciais", "essential"],
                ["Funcionais", "functional"],
                ["Analytics", "analytics"],
                ["Marketing", "marketing"],
                ["Performance", "performance"],
                ["Segurança", "security"],
                ["Ads (Publicidade)", "ads"],
              ].map(([label, key]) => (
                <button
                  key={key}
                  onClick={() =>
                    toggleCookieCategory(key as keyof typeof cookieCategories)
                  }
                  className={`p-3 rounded-xl border text-left ${
                    cookieCategories[key as keyof typeof cookieCategories]
                      ? "bg-cyan-500 text-black border-cyan-400"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Ferramentas */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
              <Cpu size={20} className="text-cyan-300" />
              Ferramentas / Scripts
            </h2>

            {[
              "Google Analytics",
              "Meta Pixel",
              "Hotjar",
              "Google Tag Manager",
              "Firebase Analytics",
              "Cloudflare Analytics",
            ].map(tool => (
              <label key={tool} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookieTools.includes(tool)}
                  onChange={() =>
                    toggleTool(tool, cookieTools, setCookieTools)
                  }
                />
                {tool}
              </label>
            ))}
          </section>
        )}

        {/* Analytics */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
              <Globe size={20} className="text-cyan-300" />
              Ferramentas de Analytics
            </h2>

            {["Google Analytics 4", "Plausible", "Mixpanel", "Amplitude"].map(
              an => (
                <label key={an} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={analyticsTools.includes(an)}
                    onChange={() =>
                      toggleTool(an, analyticsTools, setAnalyticsTools)
                    }
                  />
                  {an}
                </label>
              )
            )}
          </section>
        )}

        {/* Terceiros */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
              <CheckCircle size={20} className="text-cyan-300" />
              Rastreadores / Terceiros
            </h2>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={adTracking}
                onChange={() => setAdTracking(!adTracking)}
              />
              Usa rastreamento de anúncios (Ads Tracking)
            </label>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={sharesDataWithThirdParties}
                onChange={() =>
                  setSharesDataWithThirdParties(!sharesDataWithThirdParties)
                }
              />
              Compartilha dados com terceiros
            </label>

            {sharesDataWithThirdParties && (
              <textarea
                placeholder="Liste empresas terceiras..."
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
                value={thirdPartyList.join(", ")}
                onChange={e =>
                  setThirdPartyList(
                    e.target.value.split(",").map(s => s.trim())
                  )
                }
              />
            )}
          </section>
        )}

        {/* Banner */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Aparência do Banner de Cookies
            </h2>

            <input
              type="text"
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Ex: Banner inferior escuro com botões verde-neon..."
              value={cookieBannerStyle}
              onChange={e => setCookieBannerStyle(e.target.value)}
            />
          </section>
        )}

        {/* Retenção */}
        {usesCookies && (
          <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Política de Retenção
            </h2>

            <textarea
              rows={3}
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
              placeholder="Por quanto tempo os dados são mantidos?"
              value={retentionPolicy}
              onChange={e => setRetentionPolicy(e.target.value)}
            />
          </section>
        )}

        {/* Notas extras */}
        <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Observações Extras
          </h2>
          <textarea
            rows={3}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
            placeholder="Detalhes adicionais..."
            value={customCookieNotes}
            onChange={e => setCustomCookieNotes(e.target.value)}
          />
        </section>

        {/* NAV */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            Voltar
          </button>

          <button
            onClick={nextStep}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-xl"
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
