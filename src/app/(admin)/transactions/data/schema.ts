import { z } from "zod";

export const transactionSchema = z.object({
    transaction_date: z.string(),
    posted_date: z.string(),
    bank: z.string(),
    account: z.string(),
    account_name: z.string(),
    category: z.string(),
    transaction_memo: z.string(),
    amount: z.number(),

  });
  
  export type Transaction = z.infer<typeof transactionSchema>;
  