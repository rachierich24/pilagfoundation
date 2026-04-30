import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: any = await req.json();
  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage || "",
      isPublished: body.isPublished ?? false,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
