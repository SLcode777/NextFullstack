import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MyLoadingButton } from "./my-loading-button";
import { deleteProjectAction } from "./project.action";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  currentUrl: string;
}

export function ProjectCard({
  id,
  name,
  description,
  currentUrl,
}: ProjectCardProps) {
  return (
    <form action={deleteProjectAction} className="w-full">
      <input type="hidden" name="projectId" value={id} />
      <input type="hidden" name="currentUrl" value={currentUrl} />
      <Card className="border-l-4 border-l-muted rounded-l-none hover:bg-muted/50 transition-colors w-full">
        <CardContent className="p-4 flex flex-row justify-between items-center ">
          <Link href={`${currentUrl}/projects/${id}`} className="flex-1">
            <div className="">
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            </div>
          </Link>
          <MyLoadingButton loadingText="Suppression...">X</MyLoadingButton>
        </CardContent>
      </Card>
    </form>
  );
}
