import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const estateId = req.nextUrl.searchParams.get("estateId");
    if (!estateId) {
      return NextResponse.json(
        { error: "estateId is required" },
        { status: 400 }
      );
    }

    const codes = await prisma.accessCode.findMany({
      where: { estateId: estateId },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    codes;

    return NextResponse.json(codes);
  } catch (error: any) {
    console.error("GET /api/accessCodes/estate error:", error);
    return NextResponse.json(
      { error: "Failed to fetch access codes" },
      { status: 500 }
    );
  }
}
