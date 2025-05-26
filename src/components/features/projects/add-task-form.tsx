"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { MyLoadingButton } from "./my-loading-button";
import { createTaskAction } from "./project.edition";

interface AddTaskFormProps {
  // id: string;
  title: string;
  description: string;
  projectId: string;
  status: string;
}

export async function AddTaskForm(
  task: AddTaskFormProps,
  props: { params: { projectId: string } }
) {
  const params = await props.params;
  const projectId = params.projectId;

  const action = (prevState: AddTaskFormProps, formData: FormData) => {
    try {
      const created = createTaskAction(prevState, formData);
      toast.success("task created !");
      return created;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("une erreur est survenue");
      }
      return prevState;
    }
  };

  const [newTask, formAction] = useActionState(action, task);

  console.log(newTask);

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
