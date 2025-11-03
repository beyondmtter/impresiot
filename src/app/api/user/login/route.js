import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export const POST = async (req) => {
    await connectDB();

    try {
        const { email, inputPassword } = await req.json();
        const ip = (req.headers.get('x-forwarded-for')).split(',')[0];

        if (!email || !inputPassword) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        const user = await User.findOne({ email: email }).select('-updatedAt -createdAt -verifyCode -verifyCodeExpiry');

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User with the credential not found"
            }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(inputPassword, user.password);

        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        if (user && !user.isVerified) {
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            const emailResponse = await sendVerificationEmail(
                user.fullName,
                verifyCode
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

            user.verifyCodeExpiry = new Date(Date.now() + 300000);
            user.verifyCode = verifyCode;

            await user.save();

            return NextResponse.json({
                OTP: true,
                success: true,
                message: "Verification email sent successfully"
            }, { status: 201 });
        }

        const { password, ...newUserWithoutPassword } = user.toObject();

        const tokenValue = {
            _id: user._id,
            username: user.username,
        };

        const accessToken = jwt.sign(tokenValue, process.env.TOKEN_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign(tokenValue, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30d",
        });

        const response = NextResponse.json(
            { success: true, message: "Login successfull", user: newUserWithoutPassword, ip },
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

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
};
