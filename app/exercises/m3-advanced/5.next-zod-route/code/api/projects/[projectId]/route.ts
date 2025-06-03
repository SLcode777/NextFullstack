import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { route } from "../../../zod-route";

export const GET = route
  .params(z.object({ projectId: z.string() }))
  .handler(async (req, { params }) => {
    const user = await getRequiredUser();
    const project = await prisma.project.findUnique({
      where: {
        userId: user.id,
        id: params.projectId,
      },
    });
    return { project };
  });
