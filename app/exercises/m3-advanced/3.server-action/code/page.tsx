import { ProjectCard } from "@/components/features/projects/project-card";
import { LoadingButton } from "@/components/form/loading-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { AlertCircle, ClipboardList, PlusCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      tasks: true,
    },
  });

  const currentUrl = await getCurrentExerciseUrl();
  console.log(currentUrl);

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle>My Projects</CardTitle>
          </div>
          <CardDescription>Manage your projects and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  currentUrl={currentUrl}
                />
              ))}
            </div>
          ) : (
            <Alert className="bg-muted/50">
              <AlertCircle className="size-4" />
              <AlertTitle>No projects found</AlertTitle>
              <AlertDescription>
                You don't have any projects yet. Create your first project
                below.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Create New Project</CardTitle>
          </div>
          <div>user : {user.name}</div>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              const name = formData.get("name") as string;
              const description = formData.get("description") as string;
              await prisma.project.create({
                data: {
                  name: name,
                  description: description,
                  userId: user.id,
                },
              });
              revalidatePath(currentUrl);
            }}
          >
            <div className="space-y-2">
              <label htmlFor="name">Project Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project"
                className="min-h-[100px]"
                required
              />
            </div>

            <LoadingButton
              // forceLoading={isPending}
              type="submit"
              className="w-full"
            >
              Create Project
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
