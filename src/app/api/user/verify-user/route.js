import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PATCH(request) {
  await connectDB();

  try {
    const { email, otp } = await request.json();
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === otp;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      const accessToken = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.TOKEN_SECRET,
        { expiresIn: "15m" } 
      );

      const refreshToken = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" } 
      );

      const response = NextResponse.json(
        { success: true, message: "Account verified successfully", user },
        { status: 200 }
      );

      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60,
      });

      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
      });

      return response;

    } else if (!isCodeNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verification OTP has expired." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect verification OTP" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
