// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const bodySchema = z.object({
  answers: z.record(z.string(), z.any()), 
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key ausente" }, { status: 500 });
    }

    const body = await req.json();
    const validation = bodySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { answers } = validation.data;

    // --- CORREÇÃO 1: DATAS REAIS ---
    // Cria a data formatada (ex: "12 de dezembro de 2025")
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    // Injeta a data no objeto de respostas para a IA ler
    answers.currentDate = today;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      Você é um gerador de documentos jurídicos (Legal Tech).
      Gere 3 documentos baseados nos dados: ${JSON.stringify(answers)}

      REGRAS CRÍTICAS:
      1. Retorne APENAS um objeto JSON válido.
      2. NÃO use Markdown no JSON.
      3. As chaves DEVEM ser: "privacyPolicy", "termsOfUse", "cookiePolicy".
      
      IMPORTANTE SOBRE DATAS:
      - A data de hoje é: "${today}".
      - SEMPRE substitua placeholders como [DATA], [DATE] ou "Data Atual" por "${today}".
      - No final dos documentos, coloque: "Última atualização: ${today}".

      Estrutura do JSON:
      {
        "privacyPolicy": "# Política de Privacidade\n\nTexto aqui...",
        "termsOfUse": "# Termos de Uso\n\nTexto aqui...",
        "cookiePolicy": "# Política de Cookies\n\nTexto aqui..."
      }
    `;

    console.log("🤖 Enviando prompt ao Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Limpeza de segurança
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const documents = JSON.parse(text);

    return NextResponse.json({ documents });

  } catch (error: any) {
    console.error("💥 Erro Geral:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}