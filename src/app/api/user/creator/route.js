import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    try {
        connectDB()

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const creators = await User.aggregate([
            { $match: { approvedToCreator: true } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    profilePicture: 1,
                    profession: 1
                },
            },
        ]);

        const total = await User.countDocuments({ approvedToCreator: true });
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json(
            {
                success: true,
                message: "Creators fetched successfully",
                creators,
                pagination: {
                    total,
                    totalPages,
                    currentPage: page,
                    limit,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while fetching the user data' },
            { status: 500 }
        );
    }
};
