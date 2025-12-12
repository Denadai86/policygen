// src/app/actions/github.ts

"use server";

import { Octokit } from "octokit";

export async function saveToGist(filename: string, content: string) {
  console.log("🐙 Iniciando conexão com GitHub...");

  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) {
    return { success: false, error: "Token do GitHub não configurado." };
  }

  try {
    const octokit = new Octokit({ auth: token });

    // Cria o Gist
    const response = await octokit.request("POST /gists", {
      description: `Gerado automaticamente via PolicyGen em ${new Date().toLocaleString()}`,
      public: false, // Cria como secreto por segurança inicial
      files: {
        [filename]: {
          content: content,
        },
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    console.log("✅ Gist criado com sucesso:", response.data.html_url);
    
    return { 
      success: true, 
      url: response.data.html_url 
    };

  } catch (error: any) {
    console.error("❌ Erro ao falar com GitHub:", error);
    return { success: false, error: error.message };
  }
}