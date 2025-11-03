import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";

export const GET = async (req) => {
    try {
        await connectDB();

        const url = new URL(req.url);
        const query = url.searchParams.get('query') || ''; 
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        if (!query) {
            return NextResponse.json(
                { success: false, message: "Search query is required" },
                { status: 400 }
            );
        }

        const pipeline = [
            {
                $search: {
                    index: "searchUser",
                    text: {
                        query: query,
                        path: {
                            wildcard: "*",
                        }
                    }
                }
            },
            { $sort: { createdAt: -1 } }, 
            { $skip: skip },              
            { $limit: limit },            
            {
                $project: { 
                    fullName: 1,
                    email: 1,
                    profilePicture: 1,
                    followers: 1,
                    about: 1,
                    createdAt: 1,
                }
            },
        ];

        const totalUsers = await User.aggregate([
            { $search: { index: "searchUser", text: { query, path: { wildcard: "*" } } } },
            { $count: "total" }
        ]);

        const users = await User.aggregate(pipeline);

        const total = totalUsers[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json(
            {
                success: true,
                message: "User fetched successfully",
                data: users,
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
        console.error("Error fetching users:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
