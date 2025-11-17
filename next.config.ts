import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Esta é a configuração que instrui o Next.js a não empacotar 'firebase-admin'
    // no build, resolvendo o problema de "Invalid PEM formatted message" durante a compilação.
    experimental: {
        serverComponentsExternalPackages: ['firebase-admin'],
    },
    // Adicione outras configurações aqui, se houver
};

export default nextConfig;