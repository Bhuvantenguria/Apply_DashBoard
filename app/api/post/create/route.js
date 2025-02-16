import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const { position, companyName, location, status } = body;

  // Validate required fields
  if (!position || !companyName || !location) {
    return NextResponse.json(
      { error: "Position, company name, and location are required" },
      { status: 400 }
    );
  }

  try {
    // Get token from cookies
    const tokenCookie = cookies();
    const getToken = tokenCookie.get("token");

    if (!getToken) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    // Verify token and extract user ID
    const token = jwt.verify(getToken.value, "appSecret");
    const userId = token.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    // Create a new job posting
    const job = await prisma.job.create({
      data: {
        userId, // Store the user who created the job
        position,
        companyName,
        location,
        status: status || "APPLIED", // Default status is 'APPLIED'
      },
    });

    return NextResponse.json(
      { message: "Job posted successfully!", job },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
