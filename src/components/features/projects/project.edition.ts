"use server";

import { getRequiredUser } from "@/lib/auth-session";
import { verifyBadWord } from "@/lib/bad-words";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateProject = async (
  prevProject: { id: string; name: string; description: string },
  formData: FormData
) => {
  const _user = await getRequiredUser();
  const currentUrl = await getCurrentExerciseUrl();

  const newName = formData.get("name") as string;
  const newDescription = formData.get("description") as string;

  //check badwords
  const nameCheck = verifyBadWord(newName);
  if (nameCheck.hasBadWord) {
    throw new Error(`Le mot ${nameCheck.badWord} n'est pas autorisé`);
  }

  const descriptionCheck = verifyBadWord(newDescription);
  if (descriptionCheck.hasBadWord) {
    throw new Error(`Le mot ${descriptionCheck.badWord} n'est pas autorisé`);
  }

  const updatedProject = await prisma.project.update({
    where: { id: prevProject.id, userId: _user.id },
    data: {
      id: prevProject.id,
      name: newName ? newName : prevProject.name,
      description: newDescription ? newDescription : prevProject.description,
    },
  });

  revalidatePath(currentUrl);

  return updatedProject;
};

export const retrieveTasks = async (projectId: string) => {
  const taskList = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      projectId: true,
    },
  });

  return taskList;
};

export const deleteTask = async (taskId: string, currentUrl: string) => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath(currentUrl);

  return deletedTask;
};

export const createTaskAction = async (
  prevState: {
    // id: string;
    title: string;
    description: string;
    projectId: string;
    status: string;
  },
  formData: FormData,
) => {
  const _user = await getRequiredUser();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectId = formData.get("projectId") as string;

  const task = await prisma.task.create({
    data: {
      // id: "randomId",
      title: title,
      description: description,
      projectId: projectId,
      status: "PENDING",
    },
  });

  // revalidatePath(currentUrl);

  return task;
};
