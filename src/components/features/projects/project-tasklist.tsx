"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTaskForm } from "./add-task-form";
import { TaskItem } from "./task-item";

interface Task {
  // id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
}

export const TaskListDisplay = async ({
  tasks,
  currentUrl,
  props,
}: {
  tasks: Task[];
  currentUrl: string;
  props: { params: { projectId: string } };
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const newTask = {
    projectId: projectId,
    title: "",
    description: "",
    status: "",
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>TASK LIST</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <AddTaskForm
          title={newTask.title}
          description={newTask.description}
          projectId={newTask.projectId}
          status="PENDING"
        />
        {tasks.map(async (task) => (
          <TaskItem key={task.title} {...task} currentUrl={currentUrl} />
        ))}
      </CardContent>
    </Card>
  );
};
