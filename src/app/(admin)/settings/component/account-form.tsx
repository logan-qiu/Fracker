"use client";

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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function AccountForm() {
  const accountFormSchema = z.object({
    displayName: z
      .string()
      .min(2, {
        message: "display must be at least 2 characters.",
      })
      .max(20, { message: "display must not be more than 20 characters." }),
    dob: z.date({ required_error: "Date of birth is required." }),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const defaultValues: Partial<AccountFormValues> = {
    // from api
  }

  const form = useForm<AccountFormValues>({
    defaultValues,
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
  });

  const onSubmit = (values: AccountFormValues) => {
    console.log(values);
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
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
                <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => { field.onChange(e); setIsCalendarOpen(false); }}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Save Change</Button>
        </form>
      </Form>
  );
}

export default AccountForm;
