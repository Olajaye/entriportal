import { prisma } from "@/src/lib/prisma";
import { generatePassword } from "@/src/utils/generatePassword";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PAYSTACK_TRANSACTION_INI_URL, payStackKey } from "@/src/constant";

const baseUrl = process.env.BASE_URL;
const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      estateName,
      tenantAdminEmail,
      tenantAdminName,
      tenantAdminPhone,
      estateAddress,
      estatePlan,
    } = body;

    // Validation
    const requiredFields = {
      estateName,
      tenantAdminEmail,
      tenantAdminName,
      tenantAdminPhone,
      estatePlan,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if estate already exists
    const existingEstate = await prisma.estate.findFirst({
      where: { estateName },
    });

    if (existingEstate) {
      return NextResponse.json(
        { error: "Estate already exists" },
        { status: 409 } // 409 Conflict is more appropriate
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: { email: tenantAdminEmail },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const temporary_password = generatePassword();
    const currentDate = new Date();
    const subscriptionEndDate = new Date();
    // subscriptionEndDate.setDate(currentDate.getDate() + 30);
    // Set subscription duration based on estatePlan
    if (estatePlan === "BASIC" || estatePlan === "MEDIUM") {
      subscriptionEndDate.setMonth(currentDate.getMonth() + 1); // One month
    } else if (estatePlan === "ANNUAL") {
      subscriptionEndDate.setFullYear(currentDate.getFullYear() + 1); // One year
    } else {
      throw new Error("Invalid estate plan type");
    }

    // Create estate address
    const createdAddress = await prisma.estateAddress.create({
      data: estateAddress,
    });

    const creatEstate = await prisma.estate.create({
      data: {
        estateName,
        estateAddressId: createdAddress.id,
        paymentStatus: "PENDING",
        estatePlan,
        subscriptionStartDate: currentDate,
        subscriptionEndDate: subscriptionEndDate,
        tenantAdminId: "",
        slug: estateName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      },
      include: {
        estateAddress: true,
      },
    });

    // Then create the tenant
    const createdTenant = await prisma.user.create({
      data: {
        email: tenantAdminEmail,
        name: tenantAdminName,
        phone: tenantAdminPhone,
        password: temporary_password,
        userType: "TENANTADMIN",
        estateId: creatEstate.id,
      },
    });

    // Prepare metadata for Paystack
    const metadata = {
      user_id: createdTenant.id,
      product_id: createdTenant.name,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: createdTenant.name,
        },
        {
          display_name: "Email",
          variable_name: "email",
          value: createdTenant.email,
        },
      ],
    };

    const paystackCreateTransactionDto = {
      email: createdTenant.email,
      amount:
        estatePlan === "BASIC"
          ? 2000000
          : estatePlan === "MEDIUM"
          ? 3875000
          : 21600000,
      metadata,
      callback_url: `${baseUrl}/api/tenant/callback`,
      reference: `ESTATE_${createdTenant.id.slice(0.5)}_${Date.now()}`,
    };

    const response = await axios.post(
      PAYSTACK_TRANSACTION_INI_URL,
      paystackCreateTransactionDto,
      {
        headers: {
          Authorization: `Bearer ${payStackKey}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const paystackResponse = response.data;

    if (!paystackResponse.status) {
      return NextResponse.json(
        { error: "Paystack initialization failed" },
        { status: 400 }
      );
    }

    // Update tenant with payment reference
    await prisma.estate.update({
      where: { id: creatEstate.id },
      data: {
        paymentReference: paystackCreateTransactionDto.reference,
      },
    });

    // Prepare response data
    const responseData = {
      tenant: {
        ...createdTenant,
        temporary_password: undefined,
      },
      estate: { ...creatEstate },
      payment: {
        authorization_url: paystackResponse.data.authorization_url,
        reference: paystackResponse.data.reference,
        access_code: paystackResponse.data.access_code,
      },
      verify_url: `${baseUrl}/api/tenant/verify?reference=${paystackCreateTransactionDto.reference}`,
    };

    return NextResponse.json({
      status: 201,
      data: responseData,
      message: "Tenant created successfully. Payment initialization completed.",
    });
  } catch (error) {
    // console.error("Error creating tenant:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: "Payment service error",
          details: error.response?.data?.message || error.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create tenant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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

    // Verify transaction with Paystack
    const verifyResponse = await axios.get(
      `${PAYSTACK_VERIFY_URL}${reference}`,
      {
        headers: {
          Authorization: `Bearer ${payStackKey}`,
        },
      }
    );

    const verificationData = verifyResponse.data;

    if (verificationData.status && verificationData.data.status === "success") {
      // Update tenant status to active
      const estate = await prisma.estate.update({
        where: { paymentReference: reference },
        data: {
          paymentStatus: "SUCCESSFULL",
          isPaymentVerified: true,
          paymentVerifiedAt: new Date(),
        },
      });

      await prisma.user.update({
        where: { id: verificationData.data.metadata.user_id },
        data: {
          status: "ACTIVE",
          estateId: estate.id,
        },
      });

      return NextResponse.json({
        status: 200,
        data: verificationData.data,
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed", data: verificationData.data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);

    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
