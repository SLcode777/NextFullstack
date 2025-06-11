import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectForm } from "@app/exercises/m3-advanced/3.server-action/final-5/create-project-form";

export default async function ProjectsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
