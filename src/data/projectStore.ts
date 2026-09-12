import type { Project } from "./projects";
import { supabase } from "../lib/supabase";

/** DB satu-satunya sumber. Gagal = lempar error, kosong = []. */
export async function loadProjects(): Promise<Project[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function createProject(project: Omit<Project, "id">) {
  if (!supabase) throw new Error("Penyimpanan online belum disambungkan.");
  const { error } = await supabase.from("projects").insert(project);
  if (error) throw error;
}

export async function updateProject(id: string, project: Omit<Project, "id">) {
  if (!supabase) throw new Error("Penyimpanan online belum disambungkan.");
  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  if (!supabase) throw new Error("Penyimpanan online belum disambungkan.");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
