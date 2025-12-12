// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google';

// Configuração das fontes com next/font
const fontMain = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-main',
});

const fontTitle = Orbitron({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-title',
});


//import { WizardProvider } from "./context/WizardContext";

export const metadata: Metadata = {
  title: "PolicyGen — Gerador Inteligente de Políticas Legais",
  description: "Gere documentos jurídicos completos com apoio de IA e conformidade legal real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${fontMain.variable} ${fontTitle.variable} min-h-screen antialiased bg-dark text-gray-200 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black`}>
        {/* Header Global (Opcional aqui, ou mova para layouts específicos se quiser headers diferentes) */}
        <header className="w-full border-b border-white/10 py-4 backdrop-blur-md bg-black/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <h1 className="font-title text-2xl md:text-3xl tron-glow">PolicyGen</h1>
            <nav className="hidden md:flex gap-6 text-sm text-gray-300">
              <a href="/" className="hover:text-cyan-300 transition-colors">Início</a>
              <a href="/#como-funciona" className="hover:text-cyan-300 transition-colors">Como funciona</a>
              <a href="/step-1" className="hover:text-cyan-300 transition-colors">Começar</a>
            </nav>
          </div>
        </header>

        {/* Renderiza as páginas sem restrição de largura aqui */}
        {children}

        {/* Footer Global */}
        <footer className="w-full border-t border-white/10 py-8 mt-auto bg-black/40">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PolicyGen — Uma solução AçãoLeve.
          </div>
        </footer>
      </body>
    </html>
  );
}