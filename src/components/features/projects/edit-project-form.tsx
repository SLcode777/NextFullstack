"use client";

import { LoadingButton } from "@/components/form/loading-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Label } from "recharts";
import { toast } from "sonner";
import { editProjectAction } from "./project.action";

export const EditProjectForm = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const router = useRouter();

  const { execute, isPending } = useAction(editProjectAction, {
    onSuccess: () => {
      toast.success("Project updated");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.error.serverError);
    },
  });

  const editProject = (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const id = params.projectId;

    execute({
      name,
      description,
      id,
    });
  };

  return (
    <form action={editProject} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" value={""} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value="description"
          className="min-h-[100px]"
          required
        />
      </div>

      <LoadingButton forceLoading={isPending} type="submit" className="w-full">
        `Update Project`
      </LoadingButton>
    </form>
  );
};
