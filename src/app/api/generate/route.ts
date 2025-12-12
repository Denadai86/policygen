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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // Forçamos JSON, mas vamos garantir a limpeza manual também
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      Você é um gerador de documentos jurídicos (Legal Tech).
      Gere 3 documentos baseados nos dados: ${JSON.stringify(answers)}

      REGRAS CRÍTICAS DE SAÍDA:
      1. Retorne APENAS um objeto JSON válido.
      2. NÃO use Markdown (sem \`\`\`json ou \`\`\`).
      3. As chaves DEVEM ser exatas: "privacyPolicy", "termsOfUse", "cookiePolicy".
      
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

    console.log("🔍 TEXTO ORIGINAL DO GEMINI (Primeiros 100 chars):", text.substring(0, 100));

    // --- LIMPEZA DE SEGURANÇA ---
    // Remove blocos de código markdown se o Gemini insistir em mandá-los
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Tenta fazer o parse
    let documents;
    try {
      documents = JSON.parse(text);
    } catch (e) {
      console.error("❌ Erro ao fazer parse do JSON:", e);
      console.error("Conteúdo problemático:", text);
      return NextResponse.json({ error: "A IA retornou um formato inválido (Parse Error)." }, { status: 500 });
    }

    // Validação final das chaves
    if (!documents.privacyPolicy && !documents.termsOfUse) {
       console.error("❌ JSON válido, mas chaves erradas:", Object.keys(documents));
       return NextResponse.json({ error: "A IA não gerou as chaves corretas." }, { status: 500 });
    }

    console.log("✅ Sucesso! Enviando para o front.");
    return NextResponse.json({ documents });

  } catch (error: any) {
    console.error("💥 Erro Geral:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}