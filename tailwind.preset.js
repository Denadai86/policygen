// /tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neon: {
          50: "#eaffff",
          DEFAULT: "#00e5ff",
          glow: "#00f0ff80",
        },
        dark: {
          50: "#0a0e17",
          DEFAULT: "#03060a",
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at top left, rgba(0,229,255,0.08), transparent 40%)",
        "dark-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      boxShadow: {
        neon: "0 0 10px rgba(0,229,255,0.12), 0 0 20px rgba(6,182,212,0.08)",
      },
      borderRadius: {
        "2xl": "1rem", // sobrescreve / garante que rounded-2xl exista
      },
    },
  },
  plugins: [],
};
