// app/api/customers/[email]/virtual-accounts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { email: decodeURIComponent(params.email) },
      include: {
        virtualAccounts: {
          where: { isActive: true },
          include: {
            transactions: {
              orderBy: { createdAt: "desc" },
              take: 10,
            },
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: customer.virtualAccounts,
    });
  } catch (error) {
    console.error("Error fetching virtual accounts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
