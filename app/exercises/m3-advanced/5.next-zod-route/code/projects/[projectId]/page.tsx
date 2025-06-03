import { UpdateProjectForm } from "@/components/features/projects/project-edition-form";
import { OptimisticTaskList } from "@/components/features/projects/task-list-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { PlusCircle } from "lucide-react";
import { cookies } from "next/headers";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const currentUrl = await getCurrentExerciseUrl();
  const res = await fetch(
    `http://localhost:3000/code/projects/${params.projectId}`,
    {
      headers: {
        Cookie: await cookies().toString(),
      },
    }
  );

  if (!res.ok) {
    return <p>Project not found</p>;
  }

  const { project } = await res.json();

  return (
    <div className=" space-y-8">
      <Card className="space-y-6 px-2 flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-6">
            {project.name}
          </CardTitle>
          <div className="text-sm text-muted-foreground italic">
            {project.description}
          </div>
        </CardHeader>
      </Card>
      <OptimisticTaskList projectId={project.id} currentUrl={currentUrl} />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Edit Project</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <UpdateProjectForm
            name={project.name}
            id={project.id}
            description={project.description}
          />
        </CardContent>
      </Card>
    </div>
  );
}
