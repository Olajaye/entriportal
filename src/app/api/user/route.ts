import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { UserType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/src/lib/email/emailUtils";

const baseUrl = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, userType, estateId, password, unitNumber } =
      body;

    const requiredFields = {
      name,
      email,
      phone,
      userType,
      estateId,
      password,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Check if estate exists
    const estate = await prisma.estate.findFirst({
      where: { id: estateId },
      select: {
        id: true,
        estateName: true,
        estatePlan: true, // assumes estate has a "plan" field like "BASIC" or "MEDIUM"
      },
    });

    if (!estate) {
      return NextResponse.json(
        { message: "Estate not found" },
        { status: 404 }
      );
    }

    // ✅ Check plan limits
    const userCount = await prisma.user.count({
      where: {
        estateId,
        OR: [{ userType: "RESIDENT" }, { userType: "GUARD" }],
      },
    });

    let limit = 0;
    if (estate.estatePlan === "BASIC") {
      limit = 50;
    } else if (estate.estatePlan === "MEDIUM") {
      limit = 100;
    } else {
      limit = Infinity;
    }

    if (userCount >= limit) {
      return NextResponse.json(
        {
          message: `User limit reached for ${estate.estatePlan} plan. Please upgrade your plan to add more users.`,
        },
        { status: 403 }
      );
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        userType,
        estateId,
        password,
        unitNumber,
      },
      include: {
        estate: true,
      },
    });

    const data = {
      name: newUser.name,
      email: newUser.email,
      estate: newUser.estate.estateName,
      role:
        newUser.userType === "RESIDENT"
          ? "Resident"
          : newUser.userType === "GUARD"
          ? "Guard"
          : "Estate Admin",
      password: newUser.password,
      link: `${baseUrl}/entri`,
    };

    await sendEmail(
      newUser.email,
      "Welcome to Entri",
      "tenantAdminTemplate",
      data
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle duplicate email or estate constraint
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A user with this email or estate already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const estateId = searchParams.get("estateId");
    const userTypeParam = searchParams.get("userType");

    let userType: UserType | undefined;

    if (userTypeParam) {
      if (Object.values(UserType).includes(userTypeParam as UserType)) {
        userType = userTypeParam as UserType;
      } else {
        return NextResponse.json(
          { error: `Invalid userType: ${userTypeParam}` },
          { status: 400 }
        );
      }
    }

    const users = await prisma.user.findMany({
      where: {
        ...(estateId ? { estateId } : {}),
        ...(userType ? { userType } : {}),
      },
      include: {
        estate: true, // includes related estate
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[GET USERS ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required for update." },
        { status: 400 }
      );
    }

    // Optional: Filter out undefined/null fields
    const cleanData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    if (Object.keys(cleanData).length === 0) {
      return NextResponse.json(
        { message: "No fields provided to update." },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Optional: Prevent duplicate email if email is changing
    if (cleanData.email && cleanData.email !== user.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: cleanData.email,
          NOT: { id },
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "Email is already in use by another user." },
          { status: 409 }
        );
      }
    }

    // If password is being updated, hash it
    if (
      cleanData.password &&
      typeof cleanData.password === "string" &&
      !cleanData.temporaryPassword
    ) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(cleanData.password, saltRounds);
      cleanData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: cleanData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
