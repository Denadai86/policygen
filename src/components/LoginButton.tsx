"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Importa nossa conexão configurada
import { useState } from "react";
import { Zap } from "lucide-react";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Se chegou aqui, FUNCIONOU!
      const user = result.user;
      alert(`Sucesso! Logado como: ${user.displayName} (${user.email})`);
      console.log("Dados do usuário:", user);
      
    } catch (error: any) {
      console.error("Erro ao logar:", error);
      alert("Erro no login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
    >
      {loading ? "Conectando..." : (
        <>
          <Zap size={20} className="text-blue-600" fill="currentColor" />
          Testar Login com Google
        </>
      )}
    </button>
  );
}