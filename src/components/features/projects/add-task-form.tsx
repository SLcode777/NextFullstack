"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { MyLoadingButton } from "./my-loading-button";
import { createTaskAction } from "./project.edition";

interface AddTaskFormProps {
  projectId: string;
}

export function AddTaskForm({ projectId }: AddTaskFormProps) {
  const router = useRouter();

  const action = async (_: unknown, formData: FormData) => {
    try {
      const created = await createTaskAction(
        {
          title: "",
          description: "",
          projectId,
          status: "PENDING",
        },
        formData
      );
      toast.success("task created !");
      router.refresh();
      return created;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );

      return {
        title: "",
        description: "",
        projectId,
        status: "PENDING",
      };
    }
  };

  const [_, formAction] = useActionState(action, {
    title: "",
    description: "",
    projectId,
    status: "PENDING",
  });

  return (
    <form action={formAction} className="space-y-4 border rounded-2xl p-4">
      <input type="hidden" name="projectId" value={projectId} />
      <Input
        id="title"
        name="title"
        required
        placeholder="new task title"
        className="border"
      />

      <Textarea
        id="description"
        name="description"
        required
        className="min-h-[100px]"
        placeholder="new task description"
      />

      <MyLoadingButton icon={<Plus />}>Add New Task</MyLoadingButton>
    </form>
  );
}
