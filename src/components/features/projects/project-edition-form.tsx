"use client";

import { LoadingButton } from "@/components/form/loading-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { updateProject } from "./project.edition";

interface UpdateProjectFormProps {
  name: string;
  id: string;
  description: string;
}

export function UpdateProjectForm(project: UpdateProjectFormProps) {
  const [newProject, action, isPending] = useActionState(
    updateProject,
    project
  );

  console.log("newProject:", newProject);


  return (
    <form className="space-y-4" action={action}>
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

      <LoadingButton forceLoading={isPending} type="submit" className="w-full">
        Update Project with Server Action
      </LoadingButton>
    </form>
  );
}
