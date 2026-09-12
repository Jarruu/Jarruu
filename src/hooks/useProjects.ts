import { useEffect, useState } from "react";
import { loadProjects } from "../data/projectStore";
import type { Project } from "../data/projects";

/** DB saja. Gagal/kosong = []. */
export default function useProjects() {
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let on = true;
    loadProjects()
      .then((p) => {
        if (on) setList(p);
      })
      .catch(() => {
        if (on) setList([]);
      })
      .finally(() => {
        if (on) setLoading(false);
      });
    return () => {
      on = false;
    };
  }, []);
  return { list, loading };
}
