import { CreateSafeProjectForm } from "@/components/features/projects/create-safeproject-form";
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
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { AlertCircle, ClipboardList, Loader } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { getProjectData } from "./data";
import { ProjectChartCard } from "./project-chart-card";

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const currentUrl = await getCurrentExerciseUrl();

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const { projectData, trendPercentage, dateRange } = await getProjectData(
    user.id,
    10
  );

  return (
    <div className="space-y-6">
      <Suspense fallback={<Loader className="animate-spin" />}>
        <ProjectChartCard
          projectData={projectData}
          trendPercentage={trendPercentage}
          dateRange={dateRange}
        />
      </Suspense>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle>My Projects </CardTitle>
          </div>
          <CardDescription>Manage your projects and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center gap-2">
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    currentUrl={currentUrl}
                  />
                  <form>
                    <LoadingButton
                      formAction={async () => {
                        "use server";

                        await prisma.project.delete({
                          where: { id: project.id, userId: user.id },
                        });

                        revalidatePath(`${currentUrl}`);
                      }}
                      type="submit"
                      variant="destructive"
                    >
                      X
                    </LoadingButton>
                  </form>
                </div>
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
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateSafeProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
