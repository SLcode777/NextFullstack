import { EditProjectForm } from "@/components/features/projects/edit-project-form";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = await params.projectId;
  console.log("id in params : ", projectId);
  const currentUrl = await getCurrentExerciseUrl();
  console.log(currentUrl);

  return (
    <div className="space-y-6">
      <EditProjectForm />

      {/* <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <CardTitle>Create New Project</CardTitle>
          </div>
          <div>user : {user.name}</div>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card> */}
    </div>
  );
}
