import Follow from "@/models/follow.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { userId, followingId } = await req.json();

        if (!userId || !followingId) {
            return NextResponse.json(
                {
                    success: false,
                    message: !userId
                        ? "User ID is missing"
                        : "Following ID is missing",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
        const followingUser = await User.findById(followingId);

        if (!user || !followingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: !user
                        ? "No user found with this User ID"
                        : "No user found with this Following ID",
                },
                { status: 404 }
            );
        }

        const existingFollow = await Follow.findOne({ followerId: userId, followingId });

        if (existingFollow) {
            await Follow.findByIdAndDelete(existingFollow._id);

            user.following = user.following - 1;
            followingUser.followers = followingUser.followers - 1;

            await followingUser.save();
            await user.save();

            return NextResponse.json(
                { success: true, unfollowed: true, message: "Unfollowed successfully", user },
                { status: 200 }
            );
        }

        const newFollow = await Follow.create({ followerId: userId, followingId });

        followingUser.followers = followingUser.followers + 1;
        user.following = user.following + 1;

        await followingUser.save()
        await user.save();

        return NextResponse.json(
            { success: true, messaeg: "Followed successfully", data: newFollow, user },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in follow API:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
