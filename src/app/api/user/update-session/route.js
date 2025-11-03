import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    await connectDB();

    const accessToken = cookies().get("accessToken")?.value || "";
    const refreshToken = cookies().get("refreshToken")?.value || "";

    const tokenSecret = process.env.TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!tokenSecret || !refreshTokenSecret) {
        return NextResponse.json({
            message: "Token secrets are not defined"
        }, { status: 500 });
    }

    const generateTokens = (userId, username) => {
        const newAccessToken = jwt.sign(
            { _id: userId, username },
            tokenSecret,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { _id: userId, username },
            refreshTokenSecret,
            { expiresIn: "30d" } 
        );

        return { newAccessToken, newRefreshToken };
    };

    try {
        const decodedAccessToken = jwt.verify(accessToken, tokenSecret);
        const userId = decodedAccessToken._id;

        const user = await User.findById(userId).select("-password -updatedAt -createdAt -verifyCode -verifyCodeExpiry");
        if (!user) {
            return NextResponse.json(
                { error: `No user found by id ${userId}` },
                { status: 404 }
            );
        }

        return NextResponse.json({ user, message: "Session active" }, { status: 200 });

    } catch (accessTokenError) {
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret);
            const userId = decodedRefreshToken._id;
            const username = decodedRefreshToken.username;

            const user = await User.findById(userId).select("-password -updatedAt -createdAt -verifyCode -verifyCodeExpiry");

            if (!user) {
                return NextResponse.json(
                    { error: `No user found by id ${userId}` },
                    { status: 404 }
                );
            }

            const { newAccessToken, newRefreshToken } = generateTokens(userId, username);

            const response = NextResponse.json({ user, message: "Session refreshed" }, { status: 200 });

            response.cookies.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 15 * 60, 
            });

            response.cookies.set("refreshToken", newRefreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60, 
            });

            return response;

        } catch (refreshTokenError) {
            return NextResponse.json({ error: 'Invalid session. Please log in again.' }, { status: 401 });
        }
    }
};
