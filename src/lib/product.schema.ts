import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
