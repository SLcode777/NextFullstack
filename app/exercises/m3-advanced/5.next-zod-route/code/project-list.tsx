"use client";

import { ProjectCard } from "@/components/features/projects/project-card";
import { Input } from "@/components/ui/input";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { Project } from "@prisma/client";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useDebounceValue<T>(value: T, delay = 1000) {
  const [debounceState, setDebounceState] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceState(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceState;
}

export const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounceValue(query, 500);

  console.log(debounceQuery);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${getCurrentExerciseUrlClient()}/api/projects?query=${debounceQuery}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        toast.error("invalid request");
      })
      .then(({ projects }) => setProjects(projects))
      .finally(() => setLoading(false));
  }, [debounceQuery]);

  return (
    <div className="grid gap-4">
      <Input
        value={query}
        placeholder="rechercher par nom"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        projects.map((p) => (
          <ProjectCard
            key={p.id}
            {...p}
            currentUrl={getCurrentExerciseUrlClient()}
          />
        ))
      )}
    </div>
  );
};
