import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { code: codeToVerify } = await req.json();
    if (!codeToVerify) {
      return NextResponse.json(
        { valid: false, reason: "code is required" },
        { status: 400 }
      );
    }

    const record = await prisma.accessCode.findUnique({
      where: { code: codeToVerify },
    });

    if (!record) {
      return NextResponse.json({ valid: false, reason: "not found" });
    }

    // Check expired
    const now = new Date();
    if (record.expiresAt < now) {
      // Optionally update status to expired
      await prisma.accessCode.update({
        where: { code: codeToVerify },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json({ valid: false, reason: "expired" });
    }

    // Check if already used
    if (record.status === "USED") {
      return NextResponse.json({ valid: false, reason: "already used" });
    }

    // If valid, mark as used and set used_at
    const updated = await prisma.accessCode.update({
      where: { code: codeToVerify },
      data: {
        status: "USED",
        usedAt: new Date(),
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ valid: true, data: updated });
  } catch (error: any) {
    console.error("POST /api/access-codes/verify error:", error);
    return NextResponse.json(
      { valid: false, reason: "server error" },
      { status: 500 }
    );
  }
}
