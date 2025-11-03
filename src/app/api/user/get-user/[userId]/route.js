import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export const GET = async (req, {params}) => {
    try {
        connectDB();
        
        const { userId } =  params;
        console.log(userId)

        if (!userId) {
            return NextResponse.json(
                { error: "userId not given" },
                { status: 400 }
            );
        }

        const user = await User.findById(userId).select("-password -updatedAt -createdAt -verifyTokenExpiry -verifyToken");

        if (!user) {
            return NextResponse.json(
                { error: `No user found with id ${userId}` },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User Found successfull", user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while fetching the user data' },
            { status: 500 }
        );
    }
};
