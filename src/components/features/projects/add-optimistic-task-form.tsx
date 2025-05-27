"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { MyLoadingButton } from "./my-loading-button";

interface Task {
  id?: string;
  tempId?: string;
  title: string;
  description: string;
  projectId: string;
  status: string;
  sending?: boolean;
}

interface AddTaskFormProps {
  projectId: string;
  createTaskAction: (
    prevState: {
      title: string;
      description: string;
      projectId: string;
      status: string;
    },
    formData: FormData
  ) => Promise<Task>;
  optimisticTasks: Task[];
  setOptimisticTasks: (task: Task) => void;
  updateTaskList: (confirmedTask: Task, tempId: string) => void;
}

export function AddOptimisticTaskForm({
  projectId,
  createTaskAction,
  optimisticTasks,
  setOptimisticTasks,
  updateTaskList,
}: AddTaskFormProps) {
  const router = useRouter();

  console.log(
    "log de optimisticTasks so it gets used in the scope : ",
    optimisticTasks
  );

  function formAction(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tempId = crypto.randomUUID();

    const newTask: Task = {
      tempId,
      title,
      description,
      projectId,
      status: "PENDING",
      sending: true,
    };

    setOptimisticTasks(newTask);

    startTransition(async () => {
      try {
        const createdTask = await createTaskAction(
          {
            title: "",
            description: "",
            projectId,
            status: "PENDING",
          },
          formData
        );
        updateTaskList(createdTask, tempId);
        toast.success("Tâche créée !");
        router.refresh();
      } catch (error: unknown) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur lors de la création de la tâche"
        );
      }
    });
  }

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
