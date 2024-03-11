import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginUserSchema } from "@/lib/formatValidation";

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
            console.log(1, username, password);
            const user = await prisma.user.findUnique({
              where: { username },
            });
    
            if (!user) return null;
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            return isPasswordValid ? user : null;
        } catch (error) {
            //TODO: 1. split this part out
            //TODO: 2. log to monitor platform
            console.log(error);
            return null;
        }
      },
    }),
  ],
});
