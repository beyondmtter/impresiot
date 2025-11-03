import connectDB from "@/lib/connectDB";
import WorkshopTicket from "@/models/workshopTicket.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);

        const buyerId = searchParams.get("buyerId");
        const workshopId = searchParams.get("workshopId");

        if (!buyerId || !workshopId) {
            return NextResponse.json({
                success: false,
                message: "buyerId and workshopId are required"
            }, { status: 400 });
        }

        const isTicketBought = await WorkshopTicket.findOne({ buyerId, workshopId });

        return NextResponse.json({
            success: true,
            isTicketBought: !!isTicketBought, 
            message: "Tickets fetched successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching tickets:", error);

        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error"
        }, { status: 500 });
    }
};
