import { z } from "zod";

const config = {
  username: z.string().min(4, "Username has to be at least 4 characters"),
  password: z.string().min(6, "Password should at least have 6 characters"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid email"
    ),
};

const { username, password, email } = config;

export const registerUserSchema = z.object({
    username, password, email
});

export const loginUserSchema = z.object({
    username, password
})
