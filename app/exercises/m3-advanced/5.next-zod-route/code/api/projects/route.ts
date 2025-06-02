import { prisma } from "@/lib/prisma";
import { route } from "../../zod-route";
import { getRequiredUser } from "@/lib/auth-session";

export const GET = route.handler(async (req, context) => {
  const user = await getRequiredUser();

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
  });
  return { projects };
});
