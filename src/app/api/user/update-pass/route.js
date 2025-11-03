import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PATCH = async (req) => {
  try {
    const { email, otpCode, newPassword, confirmPassword } = await req.json();

    if (!email || !otpCode || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.verifyCode !== otpCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid otpCode",
        },
        { status: 400 }
      );
    }

    const currentTime = new Date();
    if (user.verifyCodeExpiry < currentTime) {
      return NextResponse.json(
        {
          success: false,
          message: "otpCode has expired",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.verifyCode = null; 
    user.verifyCodeExpiry = null;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating the password",
      },
      { status: 500 }
    );
  }
};
