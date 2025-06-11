import { ProjectCard } from "@/components/features/projects/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import { parseAsString, SearchParams } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
import { CreateProjectForm } from "../../3.use-query/code/create-project-form";
import { SearchInput } from "./search-input";
// Note: import from 'nuqs/server' to avoid the "use client" directive

// 🦁 Créer un searchParamsCache pour la page
export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  q: parseAsString,
});

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProjectsPage(props: PageProps) {
  const user = await getRequiredUser();
  const currentUrl = await getCurrentExerciseUrl();
  // 🦁 Remplace par le `q` du searchParams
  const searchParams = await searchParamsCache.parse(props.searchParams);
  const query = searchParams.q;

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SearchInput />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              currentUrl={currentUrl}
            />
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">No projects found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Create New Project</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
