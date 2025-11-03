import { Workshop } from "@/models/workshop.model";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

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
                    index: "searchWorkshop",
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
                $lookup: {
                    from: "users", 
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creator",
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
                }
            },
        ];

        const totalWorkshops = await Workshop.aggregate([
            { $search: { index: "searchWorkshop", text: { query, path: { wildcard: "*" } } } },
            { $count: "total" }
        ]);

        let workshops = await Workshop.aggregate(pipeline);


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
        workshops = filterEvents(workshops);

        const total = totalWorkshops[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json(
            {
                success: true,
                message: "Workshops fetched successfully",
                data: workshops,
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
        console.error("Error fetching workshops:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
