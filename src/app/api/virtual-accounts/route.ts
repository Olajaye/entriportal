// app/api/virtual-accounts/route.ts
import { payStackKey } from "@/src/constant";
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, customerName, phone, preferredBank } =
      await request.json();

    // Create virtual account via Paystack API
    const paystackResponse = await fetch(
      "https://api.paystack.co/dedicated_account",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${payStackKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: customerEmail,
          preferred_bank: preferredBank || "",
        }),
      }
    );
    console.log(paystackResponse);

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { error: paystackData.message },
        { status: 400 }
      );
    }

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { email: customerEmail },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: customerEmail,
          name: customerName,
          phone: phone,
        },
      });
    }

    // Create virtual account record
    const virtualAccount = await prisma.virtualAccount.create({
      data: {
        customerId: customer.id,
        accountNumber: paystackData.data.account_number,
        bankName: paystackData.data.bank.name,
        bankCode: paystackData.data.bank.id.toString(),
        customerName: customerName,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        virtualAccount,
        customer,
      },
    });
  } catch (error) {
    console.error("Error creating virtual account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
