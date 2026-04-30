import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: any = await req.json();
  const testimonial = await prisma.testimonial.create({
    data: {
      text: body.text,
      authorName: body.authorName,
      authorRole: body.authorRole,
      authorInitials: body.authorInitials,
      isVisible: body.isVisible ?? true,
    },
  });
  return NextResponse.json(testimonial, { status: 201 });
}
