import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get search param (e.g., ?search=lagos)
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase();

    // Build dynamic where clause if search exists
    const whereClause = search
      ? {
          estateName: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    const estates = await prisma.estate.findMany({
      where: whereClause,
      include: {
        estateAddress: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({ estates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching estates:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch estates",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
