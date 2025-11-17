// ===================================================================
// app/layout.tsx - LAYOUT PRINCIPAL (Server Component)
// CORREÇÃO: Implementação Otimizada do Google AdSense (Ad Unit Manual)
// ===================================================================

import type { Metadata } from "next";
import Script from 'next/script'; // Importa o componente Script para carregar externos
import { Geist, Geist_Mono } from "next/font/google"; // Importação das fontes
import Header from './components/Header'; // Seu componente Header
import "tailwindcss/tailwind.css"; // Se você usa o Next.js v14, isso deve ser em globals.css
import "./globals.css"; // Importação global de CSS e Tailwind

// ------------------------------------------------------------
// CONSTANTES DE CONFIGURAÇÃO (Variáveis públicas ou constantes)
// ------------------------------------------------------------

// Seu ID de Publicador do AdSense
const ADSENSE_PUB_ID = 'ca-pub-9532990788495378';

// ID do Slot de Anúncio criado manualmente (PolicyGen-Header-Ad)
const ADSENSE_SLOT_ID = '8590355353'; 

// ------------------------------------------------------------
// CONFIGURAÇÃO DE FONTES
// ------------------------------------------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ------------------------------------------------------------
// METADATA (Otimização SEO e Verificação)
// ------------------------------------------------------------
export const metadata: Metadata = {
  title: "PolicyGen | Gerador de Políticas de Privacidade e Termos de Uso com IA",
  description: "Crie Políticas de Privacidade e Termos de Uso completos, escaláveis e em conformidade legal em minutos com a inteligência artificial.",
  keywords: ["Política de Privacidade", "Termos de Uso", "Gerador IA", "Micro-SaaS", "Next.js"],
  
  // Exemplo de como adicionar a verificação do Google/Search Console
  // Substitua 'SEU_CÓDIGO_DE_VERIFICAÇÃO' pelo valor real
  verification: {
    google: 'SEU_CÓDIGO_DE_VERIFICAÇÃO', 
  },
  
  openGraph: {
    title: 'PolicyGen',
    description: 'Gerador de Políticas com IA',
    url: 'https://policygen.acaoleve.com',
    siteName: 'PolicyGen',
    locale: 'pt_BR',
    type: 'website',
  },
};


// ------------------------------------------------------------
// COMPONENTE ROOTLAYOUT
// ------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Define o idioma principal e aplica as variáveis das fontes
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      
      {/* 1. Script principal do AdSense para ativar os Anúncios Automáticos */}
      {/* Utilizamos o next/script com 'afterInteractive' para priorizar o LCP/performance */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive" // Carrega o script após o carregamento inicial da página
      />

      {/* Estrutura de corpo */}
      <body className="antialiased min-h-screen flex flex-col bg-gray-50 text-gray-900">

        {/* HEADER - componente cliente que encolhe ao rolar */}
        <Header />

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
          
          {/* ⭐️ INÍCIO DA UNIDADE DE ANÚNCIO MANUAL (AdSense Slot) ⭐️ */}
          {/* Este bloco força o AdSense a renderizar, resolvendo o problema de ads não aparecerem. */}
          {/* Adicionamos uma altura mínima para evitar o CLS (Cumulative Layout Shift) */}
          <div className="my-8 flex justify-center w-full min-h-[100px] sm:min-h-[150px] lg:min-h-[200px] bg-gray-100/50 rounded-lg">
            
            {/* O elemento INS do Google AdSense. */}
            <ins 
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '100%' }} // Estilo para ocupar o div pai
              data-ad-client={ADSENSE_PUB_ID}
              data-ad-slot={ADSENSE_SLOT_ID} // USANDO O SLOT QUE VOCÊ FORNECEU
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            
            {/* O Script que empurra a Ad Unit para ser renderizada. */}
            {/* O ID aqui é uma boa prática para o Next.js evitar conflitos de re-hidratação. */}
            <Script id="ads-header-init">
              {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>
          {/* FIM DO BLOCO ADSENSE MANUAL */}

          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white p-6 mt-8 w-full">
          <div className="max-w-7xl mx-auto text-center text-sm">
            <p>&copy; {new Date().getFullYear()} AcaoLeve - PolicyGen. Todos os direitos reservados.</p>
            <p className="mt-1">Desenvolvido com Next.js, TypeScript e Tailwind CSS.</p>
            {/* Adicione links importantes para SEO e conformidade (ex: Própria Política de Privacidade, Termos de Uso) */}
          </div>
        </footer>
      </body>
    </html>
  );
}