// src/lib/schemas.ts
import { z } from "zod";

// 1. Validação dos Passos (O que o usuário preenche)
export const wizardAnswersSchema = z.object({
  projectName: z.string().min(2, "Nome do projeto é obrigatório"),
  projectUrl: z.string().url().optional().or(z.literal("")),
  companyName: z.string().optional(),
  
  // Dados Jurídicos
  jurisdiction: z.enum(["br", "eu", "us", "global"]),
  collectsPersonalData: z.boolean(),
  collectsSensitiveData: z.boolean(),
  
  // Contato
  responsibleName: z.string().min(2),
  contactEmail: z.string().email("E-mail inválido"),
  
  // Configs
  includeAsIs: z.boolean(),
  includeAnalytics: z.boolean(),
});

// 2. O Objeto do Projeto no Banco de Dados (Firestore)
export const projectSchema = z.object({
  id: z.string(),
  userId: z.string(), // Vincula ao dono (Você acertou!)
  status: z.enum(["draft", "pending_payment", "paid"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  
  // Aqui dentro vão as respostas do formulário
  data: wizardAnswersSchema, 
  
  // Aqui ficam os textos gerados pela IA (Só preenche depois de gerar)
  documents: z.object({
    privacyPolicy: z.string().optional(),
    termsOfUse: z.string().optional(),
    cookiePolicy: z.string().optional(),
  }).optional(),
});

// Tipo TypeScript inferido automaticamente
export type Project = z.infer<typeof projectSchema>;