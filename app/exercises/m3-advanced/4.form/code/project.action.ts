"use server";

import { prisma } from "@/lib/prisma";
import { FormSchema } from "@/lib/product.schema";
import { userAction } from "./safe-action";

export const createProjectAction = userAction
  .schema(FormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, description } = parsedInput;
    const user = ctx.user;

    const project = await prisma.project.create({
      data: { name, description, userId: user.id },
    });

    return project;
  });
