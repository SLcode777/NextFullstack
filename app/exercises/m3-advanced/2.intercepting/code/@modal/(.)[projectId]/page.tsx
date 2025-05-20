"use client";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useParams, useRouter } from "next/navigation";
import ProjectPage from "../../[projectId]/page";

export default function ProjectModal() {
  const router = useRouter();

  const params = useParams();
  const projectId = params.slug;
  console.log(projectId);

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      {" "}
      <DialogTitle>THIS IS A DIALOG</DialogTitle>
      <DialogContent>
        <ProjectPage />
      </DialogContent>
    </Dialog>
  );
}
