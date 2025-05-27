"use client";

import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteTask } from "./project.edition";
import { ServerActionButton } from "./server-action-button";

interface TaskItemProps {
  id?: string;
  tempId?: string;
  title: string;
  description: string;
  status: string;
  currentUrl: string;
  sending?: boolean;
}

export function TaskItem({
  id,
  title,
  description,
  status,
  currentUrl,
  sending,
}: TaskItemProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!id) return;
    await deleteTask(id, currentUrl);
    router.refresh();
  };
  return (
    <div className="flex flex-col p-4 border rounded-2xl gap-2">
      <div className="flex flex-row justify-between items-center">
        {sending ? (
          <div className="flex flex-row">
            {title}
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="font-bold">{title} </div>
        )}
        <div className="text-sm">{status}</div>
      </div>
      <div className="text-sm text-muted-foreground italic">{description}</div>
      <ServerActionButton
        className="w-1/3 mt-4"
        loadingText="Suppression..."
        icon={<Trash />}
        action={handleDelete}
        children="Delete Task"
      />
    </div>
  );
}
