import connectDB from "@/lib/connectDB"; // DB connection utility
import WorkshopTicket from "@/models/workshopTicket.model"; // Ticket model
import mongoose from "mongoose";
import { NextResponse } from "next/server"; // Next.js Response

export const GET = async (req, {params}) => {
    try {
        await connectDB(); // Connect to MongoDB

        const { creatorId } = params

        // Get the first and last day of the current month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: firstDayOfMonth,
                        $lte: lastDayOfMonth,
                    },
                    creatorId: new mongoose.Types.ObjectId(creatorId),
                },
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    ticketCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    date: { $toString: "$_id" },
                    ticket: "$ticketCount",
                },
            },
            {
                $sort: { date: 1 },
            },
        ];

        const ticketData = await WorkshopTicket.aggregate(pipeline);

        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const chartData = Array.from({ length: daysInMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, "0");
            const ticket = ticketData.find((data) => data.date === day)?.ticket || 0;
            return { date: day, ticket };
        });

        return NextResponse.json(
            {
                success: true,
                message: "Ticket sales fetched successfully",
                chartData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching ticket sales:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
