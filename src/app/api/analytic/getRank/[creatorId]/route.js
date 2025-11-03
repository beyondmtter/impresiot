import connectDB from "@/lib/connectDB";
import WorkshopTicket from "@/models/workshopTicket.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const { creatorId } = params;

        if (!creatorId) {
            return NextResponse.json(
                { success: false, message: "Creator ID is required" },
                { status: 400 }
            );
        }

        const pipeline = [
            {
                $group: {
                    _id: "$creatorId",
                    count: { $sum: 1 }
                }
            },
            {
                $setWindowFields: {
                    sortBy: { count: -1 },
                    output: { rank: { $rank: {} } }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            {
                $unwind: {
                    path: "$userData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    "userData.fullName": 1,
                    "userData.profilePicture": 1,
                    rank: 1
                }
            },
            {
                $facet: {
                    topRanks: [
                        { $sort: { count: -1 } },
                        { $limit: 5 }
                    ],
                    creatorRank: [
                        { $match: { _id: new mongoose.Types.ObjectId(creatorId) } }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$creatorRank",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    topRanks: 1,
                    creatorRank: 1
                }
            }
        ];

        const result = await WorkshopTicket.aggregate(pipeline);

        const top5Users = result[0]?.topRanks || [];
        const creatorRank = result[0]?.creatorRank || null;

        return NextResponse.json(
            {
                success: true,
                message: "Rankboard fetched successfully",
                rankboard: {
                    top5Users,
                    userRank: creatorRank ? creatorRank : null,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching rankboard:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
