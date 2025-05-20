import { prisma } from "@/lib/prisma";

export default async function ProjectPage() {
  const projects = await prisma.project.findUnique({
    where: {
      id: "cmauuk5y100044y0vgprvl2t0",
    },
    include: {
      user: true,
      tasks: true,
    },
  });

  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-xl font-extrabold">{projects?.name}</h1>
      <p className="text-sm text-muted-foreground italic">
        {projects?.description}
      </p>
    </div>
  );
}
