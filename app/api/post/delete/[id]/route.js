import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function DELETE(_request, context) {
  try {
    const params = context.params;
    const jobId = params.id;

    // Validate job ID
    if (!jobId) {
      return NextResponse.json({ error: "Job ID not provided!" }, { status: 400 });
    }

    // Get token from cookies
    const tokenCookie = cookies();
    const getToken = tokenCookie.get("token");

    if (!getToken) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    // Verify token and get userId
    const token = jwt.verify(getToken.value, "appSecret");
    const userId = token.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    // Find the job to check ownership
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found!" },
        { status: 404 }
      );
    }

    // Check if the logged-in user is the owner of the job
    if (job.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this job!" },
        { status: 403 }
      );
    }

    // Delete the job
    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(
      { message: "Job deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
