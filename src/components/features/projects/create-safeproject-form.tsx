"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProjectSafeAction } from "@/lib/project.safeaction";
import { Plus, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MyLoadingButton } from "./my-loading-button";

export const CreateSafeProjectForm = () => {
  const router = useRouter();
  const { execute } = useAction(createProjectSafeAction, {
    onSuccess: (data) => {
      toast.success("Projet créé!");
      console.log("created project : ", data);
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle>Create New SAFE Project</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-2 flex flex-col"
          action={(formData) =>
            execute({
              name: formData.get("name") as string,
              description: formData.get("description") as string,
            })
          }
        >
          <div className="space-y-2 flex flex-col">
            <label htmlFor="name">Project Name</label>
            <Input
              id="name"
              name="name"
              placeholder="Enter project name"
              required
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project"
              className="min-h-[100px]"
              required
            />
          </div>

          <MyLoadingButton
            className="w-full mt-4"
            loadingText="Création..."
            icon={<Plus />}
          >
            Create Project
          </MyLoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};
