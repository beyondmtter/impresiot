import User from "@/models/user.model";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendForgotPassEmail } from "@/lib/sendForgotPassEmail";

export const PATCH = async (req) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
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

    const otpCode = crypto.randomInt(100000, 999999).toString();

    user.verifyCode = otpCode;
    user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); 

    await user.save();

    await sendForgotPassEmail(user.fullName, otpCode, user.email);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending OTP email",
      },
      { status: 500 }
    );
  }
};
