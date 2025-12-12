<!-- Instruções concisas para agentes IA trabalhando neste repositório -->
# Copilot / Agente: instruções rápidas

Objetivo curto
- Ajudar a gerar, revisar e integrar o gerador de políticas (PolicyGen) construído com Next.js (App Router), TypeScript e Tailwind.

Arquitetura — visão rápida
- App Router do Next.js 15 com páginas em `src/app` e um grupo de rotas de wizard em `src/app/(wizard)`.
- Estado do wizard centralizado em `src/app/context/WizardContext.tsx` (provê tipos `WizardData`, defaults e hooks `useWizard`).
- Geração de conteúdo por IA implementada no servidor em `src/app/api/generate/route.ts` usando `@google/genai` e validação com `zod`.

Padrões e convenções do projeto
- Componentes com estado local ou hooks do React são `"use client"` quando necessário (veja `src/app/(wizard)/layout.tsx`).
- Código do servidor (rota API, chamadas a bibliotecas de IA) deve ficar em route handlers (executa no servidor). Não exponha chaves em código cliente.
- Tipagem: TypeScript estrito é usado; localizações dos tipos importantes: `src/app/context/WizardContext.tsx` (modelo `WizardData`).
- Dados estáticos/enumerações: `src/data/*` (ex.: `jurisdictions.ts`, `documentTypes.ts`). Use esses arquivos para preencher selects/options.

Scripts e fluxo de desenvolvimento
- Para rodar localmente: `pnpm dev` (ou `npm run dev`). Scripts principais estão em `package.json` — `dev`, `build`, `start`, `lint`, `type-check`.
- Recomendado: rodar `pnpm type-check` e `pnpm lint` antes de PRs.

Pontos de integração críticos
- Chave da API Gemini: variável de ambiente esperada (lida em `src/app/api/generate/route.ts` pela biblioteca `@google/genai`).
- Prompt-engineering centralizado no `route.ts`: prefira ajustar prompts lá e manter validação com `zod` (veja `PromptDataSchema`).
- Modelos: implementação tenta `gemini-2.5-flash` e faz fallback para `gemini-2.5-pro` em caso de resposta ruim — preserve essa lógica ao modificar.

Regras de edição e testes rápidos
- Alterando UI dos steps: edite as páginas em `src/app/(wizard)/step-*/page.tsx`. O layout do wizard está em `src/app/(wizard)/layout.tsx` e injeta `WizardProvider`.
- Alterando schema / tipos: atualize `WizardContext.tsx` para manter defaults e evitar `undefined` em etapas posteriores.
- Teste rápido do endpoint de geração (servidor deve estar rodando):

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"promptData": {"productName":"MeuApp","dataCollection":["email","ip"],"thirdPartySharing":false}}'
```

Exemplos de código a observar
- `src/app/api/generate/route.ts` — inicialização do cliente `GoogleGenAI`, validação `zod`, tentativa + fallback de modelo.
- `src/app/context/WizardContext.tsx` — definição `WizardData`, `initialWizardData` e `useWizard()`.
- `src/app/layout.tsx` e `src/app/(wizard)/layout.tsx` — fontes, providers e estrutura global.

Notas operacionais para agentes
- Não mover chamadas de IA para o cliente. Mantenha a comunicação com IA no route handler.
- Preserve a validação com `zod` para entradas de API; qualquer mudança de shape deve atualizar schema e os callers (frontend forms).
- Ao alterar prompts, mantenha temperatura baixa (`config.temperature: 0.1`) ou documente a mudança de custo/qualidade.

Onde buscar mais contexto
- Leitura rápida: [README.md](README.md) para descrição do projeto.
- Arquivos-chave: [src/app/api/generate/route.ts](src/app/api/generate/route.ts), [src/app/context/WizardContext.tsx](src/app/context/WizardContext.tsx), [src/app/(wizard)/layout.tsx](src/app/(wizard)/layout.tsx).

Seções que precisam de feedback humano
- Se quiser alterar fluxos de deployment, como variáveis de ambiente para Gemini, pergunte ao mantenedor antes de atualizar `route.ts`.

-- Fim --
