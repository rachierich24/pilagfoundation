import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drive = await prisma.drive.findUnique({ where: { id } });
  if (!drive) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(drive);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body: any = await req.json();
  const drive = await prisma.drive.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(drive);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.drive.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
