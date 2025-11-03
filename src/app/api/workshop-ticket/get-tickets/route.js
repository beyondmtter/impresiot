import connectDB from "@/lib/connectDB";
import WorkshopTicket from "@/models/workshopTicket.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        
        const buyerId = searchParams.get("buyerId");
        const workshopId = searchParams.get("workshopId");
        const creatorId = searchParams.get("creatorId");
        const library = parseInt(searchParams.get("library"));
        const bill = parseInt(searchParams.get("bill"));
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const sortBy = searchParams.get("sortBy") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;

        const matchQuery = {};
        if (creatorId) matchQuery.creatorId = new mongoose.Types.ObjectId(creatorId);
        if (buyerId) matchQuery.buyerId = new mongoose.Types.ObjectId(buyerId);
        if (workshopId) matchQuery.workshopId = new mongoose.Types.ObjectId(workshopId);

        let tickets = await WorkshopTicket.aggregate([
            { $match: matchQuery },

            {
                $lookup: {
                    from: "users",
                    localField: "buyerId",
                    foreignField: "_id",
                    as: "buyerDetails"
                }
            },
            {
                $lookup: {
                    from: "workshops",
                    localField: "workshopId",
                    foreignField: "_id",
                    as: "workshopDetails"
                }
            },

            { $unwind: { path: "$buyerDetails", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$workshopDetails", preserveNullAndEmptyArrays: true } },

            { $sort: { [sortBy]: sortOrder } },

            { $skip: skip },
            { $limit: limit },

            {
                $project: {
                    _id: 1,
                    creatorId: 1,
                    buyerId: 1,
                    workshopId: 1,
                    orderId: 1,
                    eventDate: 1,
                    time: 1,
                    contact: 1,
                    paymentId: 1,
                    price: 1,
                    createdAt: 1,
                    "buyerDetails.fullName": 1,
                    "buyerDetails.email": 1,
                    "workshopDetails.title": 1,
                    "workshopDetails.location": 1
                }
            }
        ]);
        
        const filterTickets = (tickets) => {
            const currentDate = new Date();

            const istOffset = 5.5 * 60 * 60 * 1000;

            const istCurrentDate = new Date(currentDate.getTime() + istOffset);

            istCurrentDate.setDate(istCurrentDate.getDate() - 1);  

            const filteredDocuments = tickets.filter(doc => {
                if (!doc.eventDate || !doc.time) return false;

                const fullStartDateTime = new Date(`${doc.eventDate.toISOString().split('T')[0]}T${doc.time}:00.000Z`);

                return fullStartDateTime > istCurrentDate;
            });

            return filteredDocuments;
        };

        if(!library && !bill){
            tickets = filterTickets(tickets);
        }

        const totalTickets = await WorkshopTicket.countDocuments(matchQuery);

        const totalPages = Math.ceil(totalTickets / limit);
        // cosole.log(tickets)

        return NextResponse.json({
            success: true,
            tickets,
            pagination: {
                total: totalTickets,
                totalPages,
                currentPage: page,
                pageSize: limit,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching tickets:", error);

        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error"
        }, { status: 500 });
    }
};
