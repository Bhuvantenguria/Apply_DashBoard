import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { position, companyName, location, status, category } = await request.json();

    if (!id) return NextResponse.json({ error: "Job ID required!" }, { status: 400 });

    const tokenCookie = cookies().get("token");
    if (!tokenCookie) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

    const { id: userId } = jwt.verify(tokenCookie.value, "appSecret");

    const job = await prisma.job.findUnique({ where: { id } });

    if (!job || job.userId !== userId) {
      return NextResponse.json({ error: "Not authorized to edit!" }, { status: 403 });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: { position, companyName, location, status, category },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job!" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
