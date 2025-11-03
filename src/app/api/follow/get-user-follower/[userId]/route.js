import Follow from "@/models/follow.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const { userId } = params;
        
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId is required" },
                { status: 400 }
            );
        }
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "No user found with this userId" },
                { status: 404 }
            );
        }
        const followers = await Follow.find({ followingId: user._id });

        return NextResponse.json(
            { success: true, message: "Followers fetched successfully", data: followers },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user followers:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
