"use server";

import { z } from "zod";
import { authActionClient } from "./my-safe-action";
import { prisma } from "./prisma";

const createProjectServerAction = async (
  name: string,
  description: string,
  userId: string
) => {
  return await prisma.project.create({
    data: { name, description, userId },
  });
};

const createProjectSchema = z.object({
  name: z.string().min(1, "le nom est requis"),
  description: z.string().min(1, "la description est requise"),
});

export const createProjectSafeAction = authActionClient
  .schema(createProjectSchema)
  .action(async ({ parsedInput: { name, description }, ctx: { user } }) => {
    return await createProjectServerAction(name, description, user.id);
  });
