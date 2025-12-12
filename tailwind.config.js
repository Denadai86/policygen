// /tailwind.config.js
/** @type {import('tailwindcss').Config} */

const preset = require("./tailwind.preset.js");
const presetExtend = (preset && preset.theme && preset.theme.extend) ? preset.theme.extend : {};

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'rounded-2xl', 'p-6', 'bg-black/40', 'border', 'border-white/5', 'mb-6',
    'bg-white/5', 'border-white/6', 'rounded-lg', 'p-4',
    'inline-block', 'bg-cyan-500', 'text-black', 'font-semibold', 'px-4', 'py-2', 'transition',
    'text-gray-200', 'px-3', 'py-1.5', 'rounded-md', 'hover:bg-white/2',
    'relative', 'w-14', 'h-8', 'rounded-full', 'transition-all', 'duration-200',
    'absolute', 'top-1/2', '-translate-y-1/2', 'h-6', 'w-6', 'bg-white', 'shadow'
  ],
  theme: {
    extend: {
      ...presetExtend,
      // extras que geralmente queremos globais
      fontFamily: {
        sans: ["var(--font-main)", "system-ui", "Segoe UI", "Roboto", "Arial"],
        title: ["var(--font-title)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [
    // plugins já instalados
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  // Para evitar mensagens do Next.js/Turbopack quanto a experimental
  turbopack: {},
};