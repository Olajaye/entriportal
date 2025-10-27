import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // adjust to your prisma client path

export async function POST(req: NextRequest) {
  try {
    const { email, password, estateId } = await req.json();

    if (!email || !password || !estateId) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { estate: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid User",
        },
        {
          status: 401,
        }
      );
    }

    // If user has temporary password, require password change
    if (user.temporaryPassword && user.userType !== "TENANTADMIN") {
      return NextResponse.json(
        {
          message: "Temporary password used. Password change required.",
          temporaryPassword: user.temporaryPassword,
          userId: user.id,
          userEmail: user.email,
          user: user,
        },
        { status: 200 }
      );
    }

    // Compare entered password with stored hashed password
    const passwordMatch =
      user.userType !== "TENANTADMIN"
        ? await bcrypt.compare(password, user.password)
        : user.temporaryPassword
        ? password === user.password
        : await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    if (user.estateId !== estateId) {
      return NextResponse.json(
        { error: "User does not belong to this estate" },
        { status: 403 }
      );
    }

    // TODO: Generate auth token/session here if you have authentication system (JWT, NextAuth, etc.)

    return NextResponse.json(
      {
        message: "Login successful",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
