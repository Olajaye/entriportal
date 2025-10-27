import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, residentId, estateId, userId } = body;

    if (!guestName || !residentId || !estateId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // (Optional) you can check payment restrictions or other business rules here

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(23, 59, 59, 999);

    const newCode = await prisma.accessCode.create({
      data: {
        code,
        guestName,
        residentId,
        estateId,
        status: "ACTIVE",
        createdAt: now,
        expiresAt: expiresAt,
        userId: userId,
      },
    });

    return NextResponse.json(newCode, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/access-codes error:", error);
    return NextResponse.json(
      { error: "Failed to create access code" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const residentId = req.nextUrl.searchParams.get("residentId");
    if (!residentId) {
      return NextResponse.json(
        { error: "resident_id is required" },
        { status: 400 }
      );
    }

    const codes = await prisma.accessCode.findMany({
      where: { residentId: residentId },
      orderBy: { createdAt: "desc" },
    });

    codes;

    return NextResponse.json(codes);
  } catch (error: any) {
    console.error("GET /api/access-codes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch access codes" },
      { status: 500 }
    );
  }
}
