import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { authorize } from "@/lib/auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text", placeholder: "Enter your username" },
        password: {
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize,
    }),
  ],
  // 这个是做什么的？
  callbacks: {
    async authorized({ request, auth }) {
      return !!auth?.user;
    },
  },
  //TODO: ?
  pages: {
    signIn: "/auth/login",
  },
});
