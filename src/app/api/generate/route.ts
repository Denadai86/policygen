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

    // --- LÓGICA DE FILTRO CRÍTICA ---
    const selectedDocs = answers.documentType || [];
    
    // Mapeamento das chaves de documentos do JSON e o título selecionável
    const docMap: Record<string, string> = {
      privacyPolicy: "Política de Privacidade",
      termsOfUse: "Termos de Uso",
      cookiePolicy: "Política de Cookies",
    };
    
    // Identifica quais documentos a IA DEVE gerar
    const docsToGenerate = Object.keys(docMap)
      .filter(key => selectedDocs.includes(docMap[key]))
      .map(key => `"${key}"`); 
    
    if (docsToGenerate.length === 0) {
        return NextResponse.json({ 
            documents: { privacyPolicy: "", termsOfUse: "", cookiePolicy: "" } 
        });
    }

    // Cria a lista de documentos requeridos para o prompt
    const requiredDocsList = docsToGenerate.join(", "); 
    
    // --- GERAÇÃO E CONFIGURAÇÃO ---
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "numeric", month: "long", year: "numeric"
    });
    answers.currentDate = today;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      Você é um gerador de documentos jurídicos (Legal Tech).
      Gere os seguintes documentos (e SOMENTE estes): ${requiredDocsList}.
      Baseie-se nos dados do usuário: ${JSON.stringify(answers)}

      REGRAS CRÍTICAS:
      1. Retorne APENAS um objeto JSON válido.
      2. Para os documentos NÃO solicitados, coloque o valor como uma string vazia ("").
      3. NUNCA use Markdown no JSON.
      4. As chaves DEVEM ser: "privacyPolicy", "termsOfUse", "cookiePolicy".
      
      IMPORTANTE SOBRE DATAS:
      - A data de hoje é: "${today}".
      - SEMPRE substitua placeholders como [DATA] ou "Data Atual" por "${today}".
      - No final dos documentos, coloque: "Última atualização: ${today}".

      Exemplo da Estrutura (mesmo que um seja vazio):
      {
        "privacyPolicy": "...",
        "termsOfUse": "", // Vazio se não for solicitado
        "cookiePolicy": "..."
      }
    `;

    console.log("🤖 Enviando prompt ao Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Limpeza de segurança (se a IA responder com markdown)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const documents = JSON.parse(text);

    return NextResponse.json({ documents });

  } catch (error: any) {
    console.error("💥 Erro Geral:", error);
    return NextResponse.json({ error: "Erro interno na geração." }, { status: 500 });
  }
}