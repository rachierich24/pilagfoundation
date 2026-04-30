import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const drives = await prisma.drive.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(drives);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: any = await req.json();
  const drive = await prisma.drive.create({
    data: {
      title: body.title,
      location: body.location,
      date: body.date,
      impact: body.impact,
      imageUrl: body.imageUrl,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(drive, { status: 201 });
}
