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

        const following = await Follow.aggregate([
            { 
                $match: { followerId: user._id } 
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "followingId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 1,
                    followingId: 1,
                    followerId: 1,
                    "userDetails.fullName": 1,
                    "userDetails.profilePicture": 1
                }
            }
        ]);

        return NextResponse.json(
            { success: true, message: "Following fetched successfully", data: following },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching following users:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
