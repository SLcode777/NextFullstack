"use client";

import { Trash } from "lucide-react";
import { deleteTask } from "./project.edition";
import { ServerActionButton } from "./server-action-button";

interface TaskItemProps {
  // id: string;
  title: string;
  description: string;
  status: string;
  currentUrl: string;
}

export function TaskItem({
  // id,
  title,
  description,
  status,
  currentUrl,
}: TaskItemProps) {
  const taskId = "taskID to retrieve";
  return (
    <div className="flex flex-col p-4 border rounded-2xl gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold">{title}</div>
        <div className="text-sm">{status}</div>
      </div>
      <div className="text-sm text-muted-foreground italic">{description}</div>
      <ServerActionButton
        className="w-1/3 mt-4"
        loadingText="Suppression..."
        icon={<Trash />}
        action={async () => {
          await deleteTask(taskId, currentUrl);
        }}
        children="Delete Task"
      />
    </div>
  );
}
