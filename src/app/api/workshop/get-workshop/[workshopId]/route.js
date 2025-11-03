import connectDB from "@/lib/connectDB";
import { Workshop } from "@/models/workshop.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await connectDB();

    const { workshopId } = params;

    if (!workshopId) {
        return NextResponse.json({
            success: false,
            message: "Workshop ID is required",
        }, { status: 400 });
    }

    try {
        const workshopObjectId = new mongoose.Types.ObjectId(workshopId);
        const [workshop] = await Workshop.aggregate([
            {
                $match: {
                    "_id": workshopObjectId,
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $unwind: "$userDetails",
            },
            {
                $project: {
                    _id: 1,
                    creatorId: 1,
                    title: 1,
                    description: 1,
                    thumbNail: 1,
                    startDate: 1,
                    time: 1,
                    isDiscount: 1,
                    price: 1,
                    discount: 1,
                    language: 1,
                    discountToNumberOfTicket: 1,
                    batchSize: 1,
                    location: 1,
                    duration: 1,
                    isSellingClosed: 1,
                    "userDetails.profilePicture": 1,
                    "userDetails.fullName": 1,
                }
            }
        ]);

        if (!workshop) {
            return NextResponse.json({
                success: false,
                message: "Workshop not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Workshop fetched successfully",
            workshop, 
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching workshop:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
        }, { status: 500 });
    }
};
