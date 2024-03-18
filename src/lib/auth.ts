import NextAuth, { AuthError } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { loginUserSchema } from "@/lib/formatValidation";
import bcrypt from "bcryptjs";
import prisma from '@/lib/prisma';

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
      async authorize(credentials) {
        try {
          const { username, password } = loginUserSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { username },
          });

          if (!user) return null;
          
          const isPasswordValid = await bcrypt.compare(password, user.password);
          return isPasswordValid ? user : null;
        } catch (error) {
          //TODO: Log to monitor platform
          console.log("failed to login: ", error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // 这个是做什么的？这个是github返回protected info后会执行的callbacks
  callbacks: {
    async authorized({ request, auth }) {
      console.log('auth.ts: authorized');
      
      return !!auth?.user;
    },
  },
  //TODO: 这个是告诉next auth我们的自定义配置，signIn在哪里页面
  pages: {
    signIn: "/auth/login",
  },
});
