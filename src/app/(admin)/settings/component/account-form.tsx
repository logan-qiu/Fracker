"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AccountForm() {
  const accountFormSchema = z.object({
    displayName: z
      .string()
      .min(2, {
        message: "username must be at least 4 characters.",
      })
      .max(20, { message: "username must not be more than 20 characters." }),
    dob: z.date({ required_error: "Date of birth is required." }),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const form = useForm<AccountFormValues>({
    defaultValues: {},
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
  });

  const onSubmit = (values: AccountFormValues) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="display name" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  {/* <Input placeholder="enter your bio here" {...field} /> */}
                </FormControl>
                <FormMessage />
                <FormDescription>Your birthday is only used to calculate your age.</FormDescription>
              </FormItem>
            )}
          />
          <Button>Save Change</Button>
        </form>
      </Form>
    </>
  );
}

export default AccountForm;
