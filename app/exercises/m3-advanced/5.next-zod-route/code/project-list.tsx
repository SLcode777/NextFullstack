"use client";

import { ProjectCard } from "@/components/features/projects/project-card";
import { Input } from "@/components/ui/input";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { Project } from "@prisma/client";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");

  type ProjectType = typeof projects;

  useEffect(() => {
    setLoading(true);
    fetch(`${getCurrentExerciseUrlClient()}/api/projects`)
      .then((res) => res.json())
      .then(({ projects }) => setProjects(projects))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader className="animate-spin" />;
  }

  const filteredProjects = (arr: ProjectType[], query: string) => {
    return arr.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="grid gap-4">
      <Input
        value={query}
        placeholder="rechercher par nom"
        onChange={(e) => {
          setQuery(e.target.value);
          console.log(query);
        }}
      />
      {filteredProjects(projects, query).map((p) => (
        <ProjectCard
          key={p.id}
          {...p}
          currentUrl={getCurrentExerciseUrlClient()}
        />
      ))}
    </div>
  );
};


//##step 1 à terminer, j'ai le champ query qui fonctionne mais pas en utilisant les params