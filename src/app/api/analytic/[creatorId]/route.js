import Analytic from "@/models/analytic.model";
import WorkshopTicket from "@/models/workshopTicket.model"; // Assuming this is your ticket model
import Workshop from "@/models/workshop.model";
import connectDB from "@/lib/connectDB";
import Follow from "@/models/follow.model";
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

        const creatorObjectId = new mongoose.Types.ObjectId(creatorId);

        // Fetch analytics for the creator
        const analytics = await Analytic.findOne({ creatorId: creatorObjectId });

        if (!analytics) {
            return NextResponse.json(
                { success: false, message: "No analytics found for this Creator ID" },
                { status: 404 }
            );
        }

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const followersGained = await Follow.aggregate([
            {
                $match: {
                    followingId: creatorObjectId,
                    createdAt: { $gte: oneMonthAgo },
                },
            },
            { $count: "followersGained" },
        ]);

        const followerCount = followersGained[0]?.followersGained || 0;

        const topWorkshops = await WorkshopTicket.aggregate([
            { $match: { creatorId: creatorObjectId } }, 
            {
                $group: {
                    _id: "$workshopId",
                    ticketCount: { $sum: 1 },
                },
            },
            { $sort: { ticketCount: -1 } }, 
            { $limit: 5 }, 
            {
                $lookup: { 
                    from: "workshops", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "workshopDetails",
                },
            },
            {
                $unwind: "$workshopDetails",
            },
            {
                $project: {
                    _id: 1,
                    ticketCount: 1,
                    "workshopDetails.title": 1,
                    "workshopDetails.description": 1,
                    "workshopDetails.price": 1,
                    "workshopDetails.thumbNail": 1
                },
            },
        ]);

        const analytic = {
            ...analytics.toObject(),
            followersGained: followerCount,
            topWorkshops,
        };

        return NextResponse.json(
            {
                success: true,
                message: "Analytics fetched successfully",
                analytic,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching analytics:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
