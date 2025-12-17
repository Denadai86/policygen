// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google';
import React from "react"; // Necessário se for usar componentes React

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


// ======================================
// CONFIGURAÇÃO DE METADADOS (SEO & FAVICON)
// ======================================

const BASE_URL = "https://policygen.acaoleve.com"; // Defina o domínio base

export const metadata: Metadata = {
  // Configurações de SEO padrão
  title: "PolicyGen — Gerador Inteligente de Políticas Legais",
  description: "Gere documentos jurídicos completos com apoio de IA e conformidade legal real. Saída em Markdown.",
  
  // Favicon/Ícones de Aplicativo
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', url: '/site.webmanifest' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' },
  ],
  
  // Open Graph / Facebook / LinkedIn (Melhor para compartilhamento)
  openGraph: {
    title: "PolicyGen — Blindagem Jurídica para Desenvolvedores e SaaS",
    description: "Gere Políticas de Privacidade, Termos de Uso e Cookies personalizados em minutos. Saída em Markdown, com conformidade LGPD e GDPR.",
    url: BASE_URL,
    siteName: "PolicyGen",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // URL ABSOLUTA é crucial
        width: 1200,
        height: 630,
        alt: 'PolicyGen - Legal Tech para SaaS',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: "PolicyGen — Blindagem Jurídica para Desenvolvedores e SaaS",
    description: "Gere Políticas de Privacidade, Termos de Uso e Cookies personalizados em minutos. Saída em Markdown, com conformidade LGPD e GDPR.",
    images: [`${BASE_URL}/og-image.jpg`], // URL ABSOLUTA
  },
};

// ======================================
// ROOT LAYOUT
// ======================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${fontMain.variable} ${fontTitle.variable} min-h-screen antialiased bg-dark text-gray-200 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black`}>
        
        {/*
          ATENÇÃO: Removido o Header e Footer globais daqui.
          O Header da Landing Page e o Footer do Wizard são diferentes.
          Mantenha-os nos layouts específicos ou nas páginas, ou crie um layout para a pasta (wizard)
        */}
        
        {children}

      </body>
    </html>
  );
}