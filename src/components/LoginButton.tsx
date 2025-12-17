// src/components/LoginButton.tsx
"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Importa nossa conexão configurada
import { useState } from "react";
import { Loader2 } from "lucide-react"; // Usamos Loader2 para o estado de carregamento

// Define a interface para receber o conteúdo interno (children) e o estilo (className)
interface LoginButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function LoginButton({ children, className }: LoginButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            
            // 🚨 CORREÇÃO ESSENCIAL: Força a tela de seleção de contas do Google.
            // Isso resolve o problema de ir direto para a conta anterior.
            provider.setCustomParameters({
                prompt: 'select_account' 
            });

            const result = await signInWithPopup(auth, provider);
            
            // O redirecionamento é tratado automaticamente pelo listener na Home Page e Dashboard.
            console.log("Sucesso no login! Usuário:", result.user.email);
            
        } catch (error: any) {
            // Ignora o erro se o usuário simplesmente fechar o pop-up (UX)
            if (error.code !== 'auth/popup-closed-by-user') {
                 console.error("Erro ao logar:", error);
                 alert("Erro no login: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            // Aplica o estilo dinâmico recebido da Landing Page (className)
            className={className} 
        >
            {/* Exibe o loader ou o conteúdo original (children) */}
            {loading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    Conectando...
                </>
            ) : (
                children // Isso renderiza o conteúdo que foi passado (ex: "Começar Blindagem")
            )}
        </button>
    );
}