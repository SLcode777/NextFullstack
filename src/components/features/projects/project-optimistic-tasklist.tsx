"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOptimistic, useState } from "react";
import { AddOptimisticTaskForm } from "./add-optimistic-task-form";
import { createTaskAction } from "./project.edition";
import { TaskItem } from "./task-item";

interface Task {
  id?: string;
  tempId?: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  sending?: boolean;
}

export const OptimisticTaskListDisplay = ({
  tasks,
  currentUrl,
  projectId,
}: {
  tasks: Task[];
  currentUrl: string;
  projectId: string;
}) => {
  const [taskList, setTaskList] = useState(tasks);

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    taskList,
    (state, newTask: Task) => [newTask, ...state]
  );

  const updateTaskList = (confirmedTask: Task, tempId: string) => {
    setTaskList((prev) => [
      confirmedTask,
      ...prev.filter((t) => t.tempId !== tempId),
    ]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>TASK LIST</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddOptimisticTaskForm
          projectId={projectId}
          createTaskAction={createTaskAction}
          optimisticTasks={optimisticTasks}
          setOptimisticTasks={(task) => setOptimisticTasks(task)}
          updateTaskList={updateTaskList}
        />
        {optimisticTasks.map((task) => (
          <TaskItem
            key={task.id ?? task.tempId}
            {...task}
            currentUrl={currentUrl}
          />
        ))}
      </CardContent>
    </Card>
  );
};
