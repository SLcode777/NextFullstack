"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTaskForm } from "./add-task-form";
import { TaskItem } from "./task-item";

interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
}

export const TaskListDisplay = ({
  tasks,
  currentUrl,
  projectId,
}: {
  tasks: Task[];
  currentUrl: string;
  projectId: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TASK LIST</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddTaskForm projectId={projectId} />
        {tasks.map((task) => (
          <TaskItem key={task.title} {...task} currentUrl={currentUrl} />
        ))}
      </CardContent>
    </Card>
  );
};
