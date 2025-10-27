import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const payStackKey = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Reference parameter is required" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${payStackKey}`,
        },
      }
    );

    const verificationData = await verifyResponse.json();

    if (verificationData.status && verificationData.data.status === "success") {
      // Update tenant status
      const updatedTenant = await prisma.estate.update({
        where: { paymentReference: reference },
        data: {
          isPaymentVerified: true,
          paymentVerifiedAt: new Date(),
        },
        include: {
          estateAddress: true,
        },
      });

      return NextResponse.json({
        status: 200,
        data: {
          tenant: updatedTenant,
          payment: verificationData.data,
        },
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        {
          error: "Payment verification failed",
          data: verificationData.data,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
