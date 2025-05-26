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

  return <TaskListDisplay tasks={tasks} currentUrl={currentUrl} />;
};
