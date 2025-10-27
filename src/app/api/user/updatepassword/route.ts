import { prisma } from "@/src/lib/prisma";
import { compare } from "bcrypt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// app/api/auth/reset-password/route.ts
export async function PUT(request: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await request.json();

    // Validate required fields
    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { message: "Email, reset code, and new password are required" },
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

    // Validate reset code format (6-digit numeric)
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(resetCode)) {
      return NextResponse.json(
        { message: "Reset code must be a 6-digit number" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Find user with valid reset code
    const user = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or reset code has expired" },
        { status: 400 }
      );
    }

    // Verify the reset code
    if (!user.resetToken) {
      return NextResponse.json(
        { message: "Fill in your Email to generate a reset code" },
        { status: 400 }
      );
    }

    const isCodeValid = await compare(resetCode, user.resetToken);
    if (!isCodeValid) {
      // Increment failed attempts for security
      await prisma.passwordResetAttempt.create({
        data: {
          userId: user.id,
          email: normalizedEmail,
        },
      });

      return NextResponse.json(
        { message: "Invalid reset code" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password and clear reset data in a transaction
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update user password and clear reset fields
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      // Log successful password reset
      await tx.passwordResetAttempt.create({
        data: {
          userId: user.id,
          email: normalizedEmail,
        },
      });

      return updatedUser;
    });

    return NextResponse.json(
      {
        message: "Password has been reset successfully",
        user: {
          email: updatedUser.email,
          name: updatedUser.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error resetting password:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
