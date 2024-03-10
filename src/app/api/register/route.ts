import { registerUserSchema } from "@/lib/formatValidation";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();
    const { username, password, email } = registerUserSchema.parse(payload);
    console.log({ username, password, email })
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: { equals: email }
          },
          {
            username: { equals: username }
          },
        ],
      },
    });
    console.log('user: ', users)
    if (users && users.length) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(password);
    console.log('hi', hashedPassword)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    console.log('newuser: ', newUser)
    if (newUser) {
      return NextResponse.json(
        { message: `created user ${username} successful` },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "create user in database failed" });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Create user failed, please try again or contact support" },
      { status: 400 }
    );
  }
};
