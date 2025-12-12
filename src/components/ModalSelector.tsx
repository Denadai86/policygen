//src/components/ModalSelector.tsx

"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function ModalSelector({
  title,
  options,
  selected,
  onSelect,
  onClose,
}: {
  title: string;
  options: { label: string; value: string }[];
  selected: string | undefined;
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col z-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button onClick={onClose}>
          <X size={28} className="text-white" />
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Pesquisar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400"
      />

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filtered.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              onSelect(opt.value);
              onClose();
            }}
            className={`w-full text-left p-4 rounded-xl transition-all border 
              ${
                selected === opt.value
                  ? "bg-cyan-700/30 border-cyan-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            `}
          >
            <span className="text-white text-lg">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
