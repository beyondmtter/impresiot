import connectDB from "@/lib/connectDB";
import { Workshop } from "@/models/workshop.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await connectDB();

    const { creatorId } = params;

    const url  = new URL(req.url);
    const profile = url.searchParams.get('profile');

    try {
        if (!creatorId) {
            return NextResponse.json({
                success: false,
                message: "creator ID is required",
            }, { status: 400 });
        }

        const creatorObjectId = new mongoose.Types.ObjectId(creatorId)

        let workshops = await Workshop.aggregate([
            {
                $match: { creatorId: creatorObjectId },
            },
            {
                $sort: { date: -1 },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creator"
                }
            },
            {
                $unwind: {
                    path: "$creator",
                    preserveNullAndEmptyArrays: true,
                },
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
                    discountedPrice: 1,
                    discountToNumberOfTicket: 1,
                    batchSize: 1,
                    location: 1,
                    isSellingClosed: 1,
                    "creator.fullName": 1
                },
            },
        ]);

        const filterEvents = (workshops) => {
            const currentDate = new Date();

            const istOffset = 5.5 * 60 * 60 * 1000;

            const istCurrentDate = new Date(currentDate.getTime() + istOffset);

            istCurrentDate.setDate(istCurrentDate.getDate() - 1);  

            const filteredDocuments = workshops.filter(doc => {
                if (!doc.startDate || !doc.time) return false;

                const fullStartDateTime = new Date(`${doc.startDate.toISOString().split('T')[0]}T${doc.time}:00.000Z`);

                return fullStartDateTime > istCurrentDate;
            });

            return filteredDocuments;
        };

        if (profile == 1) {
            workshops = filterEvents(workshops);
        }

        if (workshops.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No workshops found for this user",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Workshops fetched successfully",
            workshops,
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching workshops:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
        }, { status: 500 });
    }
};
