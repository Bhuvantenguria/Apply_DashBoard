import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

    const { id: userId } = jwt.verify(tokenCookie.value, "appSecret");

    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs!" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
