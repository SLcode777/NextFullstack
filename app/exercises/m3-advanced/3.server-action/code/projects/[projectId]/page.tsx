// import { EditProjectForm } from "@/components/features/projects/edit-project-form";
import { UpdateProjectForm } from "@/components/features/projects/project-edition-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";

export default async function ProjectDetailsPage(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  console.log("id in params : ", params);
  const currentUrl = await getCurrentExerciseUrl();
  console.log(currentUrl);

  const user = await getRequiredUser();

  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!project) {
    return <p>Project not found</p>;
  }

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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Edit Project</CardTitle>
          </div>
          <div>user : {user.name}</div>
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
