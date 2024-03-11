import { loginUserSchema } from "./formatValidation";
import bcrypt from "bcryptjs";

export const authorize = async (credentials: string) => {
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
    //TODO: Log to monitor platform
    console.log('failed to login: ', error);
    return null;
  }
};
