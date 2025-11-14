import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { payStackKey } from "@/src/constant";
import { sendEmail } from "@/src/lib/email/emailUtils";

const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");
    // const trxref = searchParams.get("trxref");

    if (!reference) {
      return NextResponse.redirect(
        `${baseUrl}/payment/failed?error=missing_reference`
      );
    }

    // Verify the transaction
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
      const user = await prisma.user.update({
        where: { id: verificationData.data.metadata.user_id },
        data: {
          status: "ACTIVE",
        },
      });

      const estate = await prisma.estate.update({
        where: { paymentReference: reference },
        data: {
          tenantAdminId: user.id,
          paymentStatus: "SUCCESSFULL",
          isPaymentVerified: true,
          paymentVerifiedAt: new Date(),
        },
      });

      const data = {
        FULL_NAME: user.name,
        ESTATE_NAME: estate.estateName,
        EMAIL_ADDRESS: user.email,
        TEMP_PASSWORD: user.password,
        LOGIN_URL: `${baseUrl}/entri`,
      };

      await sendEmail(user.email, "Welcome to Entri", "estateAdmin", data);

      return NextResponse.redirect(`${baseUrl}/entri/?reference=${reference}`);
    } else {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/payment/failed?reference=${reference}`
      );
    }
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/payment/failed?error=server_error`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle webhook from Paystack
    if (body.event === "charge.success") {
      const { reference } = body.data;

      await prisma.estate.update({
        where: { paymentReference: reference },
        data: {
          paymentStatus: "SUCCESSFULL",
          isPaymentVerified: true,
          paymentVerifiedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ status: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
