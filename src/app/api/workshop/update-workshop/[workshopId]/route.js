import connectDB from "@/lib/connectDB";
import { Workshop } from "@/models/workshop.model";
import { NextResponse } from "next/server";
import { uploadImageToBlob } from "@/lib/azureBlobUpload";
import { deleteImageFromBlob } from "@/lib/deleteImageFromBlob";
import Analytic from "@/models/analytic.model";

export const PATCH = async (req, { params }) => {

    await connectDB();

    const { workshopId } = params

    try {
        const {
            title, 
            description,
            batchSize,
            discountToNumberOfTicket,
            price,
            discount,
            startDate,
            language,
            duration,
            time,
            location,
            thumbNail,
            isSellingClosed,
        } = await req.json();

        if (!workshopId) {
            return NextResponse.json({
                success: false,
                message: "Workshop ID is required"
            }, { status: 400 });
        }

        const workshop = await Workshop.findById(workshopId);
        if (!workshop) {
            return NextResponse.json({
                success: false,
                message: "Workshop not found"
            }, { status: 404 });
        }

        let thumbNailUrl = workshop.thumbNail;
        if (!thumbNail.includes("https")) {
            const oldBlobName = thumbNailUrl.split("/").pop();
            await deleteImageFromBlob(oldBlobName);

            thumbNailUrl = await uploadImageToBlob(thumbNail);
        }

        const updatedWorkshop = await Workshop.findByIdAndUpdate(
            workshopId,
            {
                $set: {
                    title,
                    description,
                    batchSize,
                    discountToNumberOfTicket,
                    price,
                    discount,
                    startDate,
                    time,
                    language: String(language),
                    duration: Number(duration),
                    location,
                    thumbNail: thumbNailUrl,
                    isSellingClosed: isSellingClosed !== undefined ? isSellingClosed : workshop.isSellingClosed,
                }
            },
            { new: true }
        );

        if(updatedWorkshop){
            const userAnalytic = await Analytic.findOne({creatorId: workshop.creatorId});
            if(userAnalytic){
                userAnalytic.totalWorkshopHours -= workshop?.duration;
                userAnalytic.totalWorkshopHours += Number(duration);
                await userAnalytic.save();
            }
        }

        return NextResponse.json({
            success: true,
            message: "Workshop updated successfully",
            workshop
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating workshop:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
};
