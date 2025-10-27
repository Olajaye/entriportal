import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/src/lib/email/emailUtils";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }
    const normalizedEmail = email.toLowerCase();

    // Check if user exists
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

    // Check if user has temporary password
    if (user.temporaryPassword) {
      return NextResponse.json(
        {
          message:
            "Please check your email to reset your initial password first.",
        },
        { status: 400 }
      );
    }

    // Check for recent reset attempts (prevent spam)
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
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    console.log("Generated reset code:", resetCode);
    // Store reset code in database (hash it for security)
    const resetCodeHash = await hash(resetCode, 12);

    // Store reset token in database
    await prisma.$transaction([
      // Clear any existing reset tokens
      prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      }),
      // Store new reset code
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
      name: user.name,
      resetCode,
      expiryTime: "15 minutes",
      supportEmail: "support@yourapp.com",
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
