//src/app/(wizard)/step-5/page.tsx

"use client";

import { useState, Suspense } from "react";
import { useWizard } from "../../context/WizardContext";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Cookie, Cpu, Globe, Shield, ArrowLeft } from "lucide-react";

function Step5Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { data, update } = useWizard();

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
  const [cookieTools, setCookieTools] = useState<string[]>(data.cookieTools ?? []);
  const [analyticsTools, setAnalyticsTools] = useState<string[]>(data.analyticsTools ?? []);
  const [adTracking, setAdTracking] = useState<boolean>(data.adTracking ?? false);
  const [sharesDataWithThirdParties, setSharesDataWithThirdParties] = useState(data.sharesDataWithThirdParties ?? false);
  const [thirdPartyList, setThirdPartyList] = useState<string[]>(data.thirdPartyList ?? []);
  const [cookieBannerStyle, setCookieBannerStyle] = useState(data.cookieBannerStyle ?? "");
  const [retentionPolicy, setRetentionPolicy] = useState(data.retentionPolicy ?? "");
  const [customCookieNotes, setCustomCookieNotes] = useState(data.customCookieNotes ?? "");

  const toggleCookieCategory = (key: keyof typeof cookieCategories) => {
    setCookieCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTool = (tool: string, state: string[], setter: any) => {
    if (state.includes(tool)) setter(state.filter(t => t !== tool));
    else setter([...state, tool]);
  };

  const nextStep = () => {
    update({ usesCookies, cookieCategories, cookieTools, analyticsTools, adTracking, sharesDataWithThirdParties, thirdPartyList, cookieBannerStyle, retentionPolicy, customCookieNotes });
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-6${query}`);
  };

  const handleBack = () => {
    const query = projectId ? `?projectId=${projectId}` : "";
    router.push(`/step-4${query}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-title tron-glow">Cookies & Tracking</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Como seu sistema utiliza dados.</p>
      </div>

      <div className="space-y-10 pb-20">
        <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4"><Cookie size={20} className="text-cyan-300" /> Seu sistema usa cookies?</h2>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-white"><input type="radio" checked={usesCookies === true} onChange={() => setUsesCookies(true)} /> Sim</label>
            <label className="flex items-center gap-2 cursor-pointer text-white"><input type="radio" checked={usesCookies === false} onChange={() => setUsesCookies(false)} /> Não</label>
          </div>
        </section>

        {usesCookies && (
          <>
            <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4"><Shield size={20} className="text-cyan-300" /> Categorias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[["Essenciais", "essential"], ["Funcionais", "functional"], ["Analytics", "analytics"], ["Marketing", "marketing"], ["Ads", "ads"]].map(([label, key]) => (
                  <button key={key} onClick={() => toggleCookieCategory(key as any)} className={`p-3 rounded-xl border text-left ${cookieCategories[key as keyof typeof cookieCategories] ? "bg-cyan-500 text-black border-cyan-400" : "bg-white/5 text-white border-white/10"}`}>{label}</button>
                ))}
              </div>
            </section>

            <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4"><Cpu size={20} className="text-cyan-300" /> Ferramentas</h2>
              {["Google Analytics", "Meta Pixel", "Hotjar"].map(tool => (
                <label key={tool} className="flex items-center gap-2 cursor-pointer text-gray-300 mb-2"><input type="checkbox" checked={cookieTools.includes(tool)} onChange={() => toggleTool(tool, cookieTools, setCookieTools)} /> {tool}</label>
              ))}
            </section>
            
            <section className="card bg-white/5 border border-white/10 p-6 rounded-2xl">
               <h2 className="text-xl font-semibold text-white mb-4">Política de Retenção</h2>
               <textarea rows={3} className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" placeholder="Por quanto tempo?" value={retentionPolicy} onChange={e => setRetentionPolicy(e.target.value)} />
            </section>
          </>
        )}

        <div className="flex justify-between pt-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white flex items-center gap-2"><ArrowLeft size={16}/> Voltar</button>
          <button onClick={nextStep} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-xl">Avançar</button>
        </div>
      </div>
    </div>
  );
}

export default function Step5() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]"/>}>
      <Step5Content />
    </Suspense>
  );
}