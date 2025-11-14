// app/api/webhooks/paystack/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle transfer success event
    if (event.event === "transfer.success") {
      const { data } = event;

      // Find virtual account by account number
      const virtualAccount = await prisma.virtualAccount.findFirst({
        where: {
          accountNumber: data.recipient.account_number,
          isActive: true,
        },
        include: {
          customer: true,
        },
      });

      if (virtualAccount) {
        // Create transaction record
        await prisma.transaction.create({
          data: {
            virtualAccountId: virtualAccount.id,
            amount: data.amount / 100, // Convert from kobo to naira
            reference: data.reference,
            status: "SUCCESS",
            paidAt: new Date(data.transferred_at),
          },
        });

        // Here you can trigger other business logic:
        // - Send confirmation email
        // - Update order status
        // - Activate subscription
        // - etc.

        console.log(
          `Payment received from ${virtualAccount.customer.name}: ${
            data.amount / 100
          }`
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
