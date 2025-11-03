import { uploadImageToBlob } from "@/lib/azureBlobUpload";
import connectDB from "@/lib/connectDB";
import Analytic from "@/models/analytic.model";
import { Workshop } from "@/models/workshop.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectDB();

    try {
        const {
            creatorId,
            title,
            description,
            batchSize,
            discountToNumberOfTicket,
            price,
            discount,
            startDate,
            duration,
            language,
            time,
            location,
            thumbNail,
        } = await req.json();

        if (!creatorId || !title || !description || !price || !startDate || !time || !location || !thumbNail || !language) {
            return NextResponse.json({
                success: false,
                message: "All required fields must be provided"
            }, { status: 400 });
        }

        const thumbNailUrl = await uploadImageToBlob(thumbNail);

        const newWorkshop = Workshop.create({
            creatorId,
            title,
            description,
            batchSize: batchSize || 0,
            discountToNumberOfTicket: discountToNumberOfTicket || 0,
            price,
            discount: discount || 0,
            startDate,
            duration : Number(duration),
            time,
            language,
            location,
            thumbNail: thumbNailUrl
        });

        if(newWorkshop){
            const userAnalytic = await Analytic.findOne({creatorId});
            if(userAnalytic){
                userAnalytic.totalWorkshopHours += Number(duration);
                await userAnalytic.save();
            }
        }

        return NextResponse.json({
            success: true,
            message: "Workshop created successfully",
            workshop: newWorkshop
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating workshop:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
};
