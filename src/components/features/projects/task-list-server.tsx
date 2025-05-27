import { OptimisticTaskListDisplay } from "./project-optimistic-tasklist";
import { TaskListDisplay } from "./project-tasklist";
import { retrieveTasks } from "./project.edition";

export const TaskList = async ({
  projectId,
  currentUrl,
}: {
  projectId: string;
  currentUrl: string;
}) => {
  const tasks = await retrieveTasks(projectId);

  return (
    <TaskListDisplay
      tasks={tasks}
      currentUrl={currentUrl}
      projectId={projectId}
    />
  );
};

export const OptimisticTaskList = async ({
  projectId,
  currentUrl,
}: {
  projectId: string;
  currentUrl: string;
}) => {
  const tasks = await retrieveTasks(projectId);

  return (
    <OptimisticTaskListDisplay
      tasks={tasks}
      currentUrl={currentUrl}
      projectId={projectId}
    />
  );
};
