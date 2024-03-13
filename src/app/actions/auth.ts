"use server";

import { signIn, signOut } from "@/lib/auth";

export const signInWithGithubAction = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const signOutAction = async () => {
  await signOut({
    //TODO: 为什么我不能用redirectTo而虎哥可以？A: 这个是我们封装到lib里面的，是server component，nextauth/react给的是client component
    redirectTo: "/auth/login",
  });
};
