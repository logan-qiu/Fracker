"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GithubSSOButton from './GithubSSOButton'
import { useCustomToast } from "@/hooks/useCustomToast";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface loginFormData {
  username: string;
  password: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<loginFormData>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();
  const { showToast } = useCustomToast();

  const handleDataChange = (
    dataType: keyof loginFormData,
    newValue: string
  ) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [dataType]: newValue,
      };
    });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const { username, password } = formData;

    try {
      const result = await signIn("credentials", {
        username,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });
      console.log("res: ", result);
      /*
      result可能会返回:则不会掉入catch block
      {
        "error": "CredentialsSignin",
        "status": 200,
        "ok": true,
        "url": null
      }
      github上有很多人说v4版本已经修复此问题但v5重新出现了
      */
      if (!result?.error && result?.status === 200) {
        router.push("/dashboard");
      }
      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            showToast({
              title: "Invalid Credential",
              description: "User doesn't exist or password incorrect, please try again"
            })
          default:
            return null;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const { username, password } = formData;
    if (username && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
        <Link
            href="/auth/signup"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Register
          </Link>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="username"
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("username", e.target.value)
              }
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="current-password"
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("password", e.target.value)
              }
            />
          </div>
          <Button disabled={isLoading || isDisabled}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSSOButton isLoading={isLoading} />
    </div>
  );
}
