"use client";

import { LoadingButton } from "@/components/form/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createProjectAction } from "./project.action";
import { FormSchema } from "@/lib/product.schema";

// const FormSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
// });

export const CreateProjectForm = () => {
  const router = useRouter();

  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { execute } = useAction(createProjectAction, {
    onSuccess: () => {
      toast.success("Project created");
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.error.serverError);
    },
  });

  const createProject = (values: z.infer<typeof FormSchema>) => {
    execute({
      name: values.name,
      description: values.description,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle>Create New Project with react-hook-form</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form
          className="flex flex-col space-y-6"
          form={form}
          onSubmit={async (values) => {
            createProject(values);
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project Description" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <LoadingButton
            // forceLoading={isPending}
            type="submit"
            className="w-full"
          >
            Create Project
          </LoadingButton>
        </Form>
      </CardContent>
    </Card>
  );
};
