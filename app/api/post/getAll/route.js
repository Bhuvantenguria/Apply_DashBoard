import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all jobs from the database, ordered by latest created jobs first
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true }, // Fetch job creator details
        },
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
