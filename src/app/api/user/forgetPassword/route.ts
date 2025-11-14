import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/src/lib/email/emailUtils";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found",
        },
        { status: 400 }
      );
    }

    if (user.temporaryPassword) {
      return NextResponse.json(
        {
          message:
            "Please check your email to reset your initial password first.",
        },
        { status: 400 }
      );
    }

    const recentReset = await prisma.passwordResetAttempt.findFirst({
      where: {
        userId: user.id,
        attemptedAt: {
          gte: new Date(Date.now() - 2 * 60 * 1000), // Last 2 minutes
        },
      },
    });

    if (recentReset) {
      console.log("Too many reset attempts", recentReset);
      return NextResponse.json(
        {
          message: "Please wait before requesting another reset code.",
        },
        { status: 429 }
      );
    }

    // Generate 6-digit numeric code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const resetCodeHash = await hash(resetCode, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      }),

      prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: resetCodeHash,
          resetTokenExpiry: resetCodeExpiry,
        },
      }),
      // Log reset attempt
      prisma.passwordResetAttempt.create({
        data: {
          userId: user.id,
          email: normalizedEmail,
        },
      }),
    ]);

    // Email data
    const emailData = {
      FULL_NAME: user.name,
      EMAIL_ADDRESS: user.email,
      RESET_CODE: resetCode,

      expiryTime: "15 minutes",
    };

    // Send reset email
    try {
      await sendEmail(
        user.email,
        "Reset Your Password",
        "passwordResetTemplate",
        emailData
      );
    } catch (emailError) {
      console.error("Error sending reset email:", emailError);

      // Clear the reset token if email fails
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      return NextResponse.json(
        { message: "Failed to send reset email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "If an account with that email exists, a password reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in forgot password:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
