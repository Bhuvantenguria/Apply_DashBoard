import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const { name, email, password } = body;

  // Check if all required fields are present
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const isUserCreatedBefore = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserCreatedBefore) {
      return NextResponse.json(
        { error: "The email address has been used before!" },
        { status: 400 }
      );
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create the user with name, email, and hashed password
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hash,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully!", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred, please try again later!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
