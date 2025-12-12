// src/components/MagicSwitch.tsx
"use client";

import React from "react";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  id?: string;
};

export default function MagicSwitch({ checked, onChange, label, id }: Props) {
  return (
    <button
      aria-pressed={checked}
      aria-label={label ?? "Alternar"}
      id={id}
      data-checked={checked}
      onClick={() => onChange(!checked)}
      className={`magic-switch rounded-full inline-flex items-center justify-start p-1 focus:outline-none ${
        checked ? "data-[checked=true]" : ""
      }`}
      style={{
        display: "inline-block",
      }}
      >
      <span className="dot" />
    </button>
  );
}
