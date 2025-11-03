import connectDB from "@/lib/connectDB";
import Follow from "@/models/follow.model";
import { Workshop } from "@/models/workshop.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await connectDB();

    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const upcoming = parseInt(url.searchParams.get('upcoming'));
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);

        const skip = (page - 1) * limit;

        let extractedIds = [];

        if (userId) {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const userFollowedCreator = await Follow.aggregate([
                {
                    $match: {
                        followerId: userObjectId
                    },
                },
                {
                    $project: {
                        _id: 0,
                        followingId: 1,
                    },
                },
            ]);

            if (!userFollowedCreator) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User following not found",
                    },
                    { status: 404 }
                );
            }

            extractedIds = userFollowedCreator.map((item) => item.followingId);
        }

        const pipeline = [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creator",
                },
            },
            {
                $match: {
                    "creator.approvedToCreator": true,
                },
            },
            {
                $unwind: {
                    path: "$creator",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    creatorId: 1,
                    title: 1,
                    description: 1,
                    price: 1,
                    discount: 1,
                    batchSize: 1,
                    sold: 1,
                    language: 1,
                    duration: 1,
                    startDate: 1,
                    time: 1,
                    location: 1,
                    thumbNail: 1,
                    isSellingClosed: 1,
                    createdAt: 1,
                    "creator.fullName": 1,
                },
            },
        ];

        if (extractedIds.length) {
            pipeline.unshift({
                $match: {
                    creatorId: { $in: extractedIds },
                },
            });
        }

        let workshops = [];

        if (!upcoming || extractedIds.length) {
            workshops = await Workshop.aggregate(pipeline);
        }

        if (!Array.isArray(workshops)) {
            console.error("Workshops aggregation returned an invalid value:", workshops);
            workshops = [];
        }

        const filterEvents = (workshops) => {
            if (!Array.isArray(workshops)) {
                console.error("Workshops is not an array or undefined:", workshops);
                return [];
            }

            const currentDate = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const istCurrentDate = new Date(currentDate.getTime() + istOffset);

            istCurrentDate.setDate(istCurrentDate.getDate() - 1);

            return workshops.filter((doc) => {
                if (!doc.startDate || !doc.time) return false;

                const fullStartDateTime = new Date(`${doc.startDate.toISOString().split('T')[0]}T${doc.time}:00.000Z`);
                return fullStartDateTime > istCurrentDate;
            });
        };

        workshops = filterEvents(workshops);

        const totalWorkshops = await Workshop.countDocuments();
        const totalPages = Math.ceil(totalWorkshops / limit);

        return NextResponse.json(
            {
                success: true,
                workshops,
                pagination: {
                    total: totalWorkshops,
                    totalPages,
                    currentPage: page,
                    pageSize: limit,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching workshops:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
};
