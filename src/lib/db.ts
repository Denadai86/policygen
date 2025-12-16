// src/lib/db.ts
import { db } from "@/lib/firebase"; 
import { 
  doc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  getDoc, // Adicionado
  serverTimestamp 
} from "firebase/firestore";

// Definição do Tipo de Projeto
export interface ProjectData {
  userId: string;
  name: string;
  answers: any;
  status: "draft" | "paid";
  createdAt?: any;
}

// 1. Criar Projeto
export async function createProject(userId: string, answers: any) {
  try {
    const projectsRef = collection(db, "projects");
    const docRef = await addDoc(projectsRef, {
      userId,
      name: answers.projectName || "Projeto Sem Nome",
      answers,
      status: "draft",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Projeto salvo:", docRef.id);
    return { success: true, projectId: docRef.id };
  } catch (error: any) {
    console.error("❌ Erro ao salvar:", error);
    return { success: false, error: error.message };
  }
}

// 2. Atualizar Projeto
export async function updateProject(projectId: string, newAnswers: any) {
  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      answers: newAnswers,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 3. Buscar Projeto (Para Edição) -> ESSA É A NOVA
export async function getProject(projectId: string) {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() as ProjectData };
    } else {
      return { success: false, error: "Projeto não encontrado" };
    }
  } catch (error: any) {
    console.error("Erro ao buscar projeto:", error);
    return { success: false, error: error.message };
  }
}