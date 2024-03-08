"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useEffect, useState } from "react";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface signupFormData {
  username: string;
  password: string;
  confirmedPassword: string;
  email: string;
}
export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMissing, setIsMissing] = useState(false);
  const [formData, setFormData] = useState<signupFormData>({
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
  });

  const handleDataChange = (
    dataType: keyof signupFormData,
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
  }
  
  const validateMatchedPassword = () => {
    const { password, confirmedPassword } = formData;
    {
      formData.password.length > 0 &&
      formData.confirmedPassword.length > 0 &&
      formData.password !== formData.confirmedPassword ? (
        <p className="text-xs text-red-600">Password has to be the same!</p>
      ) : null;
    }
    if (
      password.length > 0 &&
      confirmedPassword.length > 0 &&
      password !== confirmedPassword
    ) {
      return (
        <p className="text-xs text-red-600">Password has to be the same!</p>
      );
    }
  };

  const validatePassword = () => {
    const {password} = formData;
    if (password.length < 6 && password.length > 0) {
      return (
        <p className="text-xs text-red-600">Password has to be at minimum 6 digits</p>
      )
    }
  }

  const handleRegister = () => {
    const {username, password, email} = formData;
    const cacheData = {
      password, email
    }
    localStorage.setItem(username, JSON.stringify(cacheData))
  }

  useEffect(() => {
    if (Object.values(formData).every((inputVal) => inputVal.length > 0)) {
      setIsMissing(false);
    } else {
      setIsMissing(true);
    }
  }, [formData])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
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
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("username", e.target.value)
              }
              required
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
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("password", e.target.value)
              }
              required
            />
            {validatePassword()}
            <Label className="sr-only" htmlFor="confirm-password">
              confirm password
            </Label>
            <Input
              id="confirm-password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("confirmedPassword", e.target.value)
              }
              required
            />
            {validateMatchedPassword()}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDataChange("email", e.target.value)
              }
              required
            />
          </div>
          <Button disabled={isLoading || isMissing} onClick={handleRegister}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register with Email
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
