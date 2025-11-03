import connectDB from "@/lib/connectDB";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  try {
    const { fullname, contact, countryCode, email, password, country, state, agreeToTerms } = await req.json();

    if (!fullname || !contact || !countryCode || !email || !password || !country || !state || !agreeToTerms) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

  
    // Check if username already exists and is verified
    const existingUserVerifiedByEmail = await User.findOne({
      email,
      isVerified: true,
    });

    const verifyCodeExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry time for verification code

    if (existingUserVerifiedByEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email.",
        },
        { status: 400 }
      );
    }

    // Check if the email is already in use by an unverified user
    const existingUserByEmail = await User.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit verification code

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with this email.",
          },
          { status: 400 }
        );
      } else {
        // If the email exists but the user is not verified, update their password and verification code
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
        await existingUserByEmail.save();
      }
    } else {
      // If the user doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullName: fullname,
        contact: `${countryCode}-${contact}`,
        email,
        password: hashedPassword,
        agreeToTerms,
        location: {
            state,
            country
        },
        verifyCode,
        verifyCodeExpiry,
        isVerified: false, 
        
      });

      if (!newUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Something went wrong while creating the user.",
          },
          { status: 500 }
        );
      }
    }

    const emailResponse = await sendVerificationEmail(
      fullname,
      verifyCode,
      email
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP has sent. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error registering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user.",
      },
      { status: 400 }
    );
  }
};
