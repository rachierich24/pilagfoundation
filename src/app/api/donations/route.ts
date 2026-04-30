import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  const body: any = await req.json();
  const donation = await prisma.donation.create({
    data: {
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      amount: body.amount,
      fundType: body.fundType || "general",
      status: "completed",
    },
  });
  return NextResponse.json(donation, { status: 201 });
}
