"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { signInWithGithubAction } from "@/app/actions/auth";

interface GithubSSOButtonProps {
  isLoading: boolean;
}

function GithubSSOButton(props: GithubSSOButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <form action={signInWithGithubAction}>
      <Button
        onClick={() => setIsLoading(true)}
        variant="outline"
        type="submit"
        disabled={props.isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </form>
  );
}

export default GithubSSOButton;
