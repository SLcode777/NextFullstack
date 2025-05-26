"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Save } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { MyLoadingButton } from "./my-loading-button";
import { updateProject } from "./project.edition";

interface UpdateProjectFormProps {
  name: string;
  id: string;
  description: string;
}

export function UpdateProjectForm(project: UpdateProjectFormProps) {
  const action = async (
    prevState: UpdateProjectFormProps,
    formData: FormData
  ) => {
    try {
      const updated = await updateProject(prevState, formData);
      toast.success("Projet mis à jour avec succès");
      return updated;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("une erreur est survenue");
      }
      return prevState;
    }
  };

  const [newProject, formAction] = useActionState(action, project);

  console.log("newProject:", newProject);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Project Name</label>
        <Input id="name" name="name" defaultValue={project.name} required />
      </div>
      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project.description}
          className="min-h-[100px]"
          required
        />
      </div>

      <MyLoadingButton
        className="w-full"
        loadingText="Mise à jour..."
        icon={<Save />}
        loadingIcon={<RefreshCw className="animate-spin" />}
      >
        Update Project with Server Action
      </MyLoadingButton>
    </form>
  );
}
