// src/app/(wizard)/layout.tsx
"use client";

import { WizardProvider } from "../context/WizardContext";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      {/* REMOVI TODO O PADDING FORÇADO E DEIXEI 100% RESPONSÁVEL PELO FILHO */}
      <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0e17] to-black">
        {/* Container limpo — sem padding fixo, sem largura máxima rígida */}
        <div className="w-full">
          {/* Borda neon superior (mantive o detalhe bonito) */}
          <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          {/* Aqui entra seu step-1, step-2, etc — totalmente livre */}
          {children}
        </div>
      </main>
    </WizardProvider>
  );
}