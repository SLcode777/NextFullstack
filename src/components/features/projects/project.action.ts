"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/safe-actions";
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

// export const editProjectAction = userAction
//   .schema(
//     z.object({
//       id: z.string(),
//       name: z.string().min(1),
//       description: z.string().min(1),
//     })
//   )
//   .action(async ({ parsedInput, ctx }) => {
//     const { name, description, id } = parsedInput;
//     const user = ctx.user;

//     const updatedProject = await prisma.project.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: name,
//         description: description,
//         userId: user.id,
//       },
//     });

//     return updatedProject;
//   });

