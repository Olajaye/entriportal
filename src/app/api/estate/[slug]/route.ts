// src/app/api/estate/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // adjust path to your prisma client

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const estate = await prisma.estate.findUnique({
      where: { slug },
      include: {
        user: true,
        estateAddress: true,
      },
    });

    if (!estate) {
      return NextResponse.json({ error: "Estate not found" }, { status: 404 });
    }

    return NextResponse.json(estate, { status: 200 });
  } catch (error) {
    console.error("Error fetching estate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update estate address only
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Only allow address fields to be updated
    const { streetName, city, state, zipCode, country } = body;

    // Validate required address fields
    if (!streetName || !city || !state || !zipCode || !country) {
      return NextResponse.json(
        {
          error:
            "All address fields (streetName, city, state, zipCode, country) are required",
        },
        { status: 400 }
      );
    }

    // Check if estate exists
    const existingEstate = await prisma.estate.findUnique({
      where: { slug },
      include: {
        estateAddress: true,
      },
    });

    if (!existingEstate) {
      return NextResponse.json({ error: "Estate not found" }, { status: 404 });
    }

    // Update the estate address
    const updatedEstate = await prisma.estate.update({
      where: { slug },
      data: {
        estateAddress: {
          update: {
            streetName,
            city,
            state,
            zipCode,
            country,
          },
        },
      },
      include: {
        user: true,
        estateAddress: true,
      },
    });

    return NextResponse.json(updatedEstate, { status: 200 });
  } catch (error) {
    console.error("Error updating estate address:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
