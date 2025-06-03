import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { userRoute } from "../../zod-route";



export const GET = userRoute
  .query(z.object({ query: z.string().optional() }))
  .handler(async (req, context) => {
    const projects = await prisma.project.findMany({
      where: {
        userId: context.ctx.user.id,
        name: {
          contains: context.query.query,
          mode: "insensitive",
        },
      },
    });
    return { projects };
  });
