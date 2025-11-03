import connectDB from "@/lib/connectDB"; // DB connection utility
import WorkshopTicket from "@/models/workshopTicket.model"; // WorkshopTicket model
import Workshop from "@/models/workshop.model"; // Workshop model
import { NextResponse } from "next/server"; // Next.js Response
import mongoose from "mongoose";

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
                    _id: "$workshopId",
                    viewCount: { $sum: 1 },
                    revenue: { $sum: { $toInt: "$price" } },
                },
            },
            {
                $lookup: {
                    from: "workshops",
                    localField: "_id",
                    foreignField: "_id",
                    as: "workshop",
                },
            },
            {
                $unwind: {
                    path: "$workshop",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $match: {
                    "workshop.creatorId": new mongoose.Types.ObjectId(creatorId), 
                },
            },
            {
                $project: {
                    name: "$workshop.title",
                    category: { $literal: "Workshop" },
                    viewCount: 1,
                    revenue: 1,
                },
            },
            {
                $sort: { revenue: -1 }, 
            },
        ];

        const workshops = await WorkshopTicket.aggregate(pipeline)

        const formattedWorkshops = workshops.map((workshop) => ({
            ...workshop,
            revenue: new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
            }).format(workshop.revenue),
        }));

        return NextResponse.json(
            {
                success: true,
                message: "Workshops fetched successfully",
                workshops: formattedWorkshops,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching workshops:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
