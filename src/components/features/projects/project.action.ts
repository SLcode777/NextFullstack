"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/safe-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProjectAction = userAction
  .schema(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { name, description } = parsedInput;
    const user = ctx.user;

    const project = await prisma.project.create({
      data: { name, description, userId: user.id },
    });

    return project;
  });

export async function deleteProjectAction(formData: FormData) {
  const currentUrl = formData.get("currentUrl") as string;
  const projectId = formData.get("projectId") as string;
  if (!projectId) throw new Error("ID de projet manquant");

  await prisma.project.delete({
    where: { id: projectId },
  });

  if (currentUrl) {
    revalidatePath(currentUrl);
  } else {
    revalidatePath("/");
  }
}
