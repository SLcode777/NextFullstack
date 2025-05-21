"use server";

import { getRequiredUser } from "@/lib/auth-session";
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

  //update

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
