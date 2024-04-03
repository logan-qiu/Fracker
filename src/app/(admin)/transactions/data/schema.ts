import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
