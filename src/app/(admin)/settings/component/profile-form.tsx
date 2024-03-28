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

function ProfileForm() {
  const profileFormSchema = z.object({
    username: z
      .string()
      .min(4, {
        message: "username must be at least 4 characters.",
      })
      .max(20, { message: "username must not be more than 20 characters." }),
    email: z.string().email(),
    bio: z.string()
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>

  const form = useForm<ProfileFormValues>({
    defaultValues: {},
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange'
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  }

  return (
    <>
      <div>profile-form</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder='username' {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.</FormDescription>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bio"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                            <Input placeholder='enter your bio here' {...field} />
                        </FormControl>
                        <FormDescription>This is your public bio.</FormDescription>
                    </FormItem>
                )}
            />
        </form>
      </Form>
    </>
  );
}

export default ProfileForm;