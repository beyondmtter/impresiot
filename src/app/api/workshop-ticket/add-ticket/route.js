import connectDB from "@/lib/connectDB";
import { sendTicketConfirmationEmail } from "@/lib/sendTicketConfirmationEmail";
import Analytic from "@/models/analytic.model";
import User from "@/models/user.model";
import { Workshop } from "@/models/workshop.model";
import WorkshopTicket from "@/models/workshopTicket.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectDB();

    try {
        const {
            creatorId,
            buyerId,
            workshopId,
            eventDate,
            time,
            orderId,
            contact,
            paymentId,
            price,
        } = await req.json();

        if (!creatorId || !buyerId || !workshopId || !orderId || !contact || !price) {
            return NextResponse.json({
                success: false,
                message: "All required fields must be provided",
            }, { status: 400 });
        }

        const user = await User.findById(buyerId);
        const workshop = await Workshop.findById(workshopId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        if (!workshop) {
            return NextResponse.json({
                success: false,
                message: "Workshop not found",
            }, { status: 404 });
        }

        const boughtDate = new Date();
        const boughtDateString = boughtDate.toLocaleString('en-IN');
        const formattedEventDate = new Date(eventDate).toLocaleDateString();

        const emailSent = await sendTicketConfirmationEmail({
            fullName: user.fullName,
            title: workshop.title,
            boughtDate: boughtDateString,
            email: user.email,
            eventDate: formattedEventDate,
            time,
            location: workshop.location
        });

        if (!emailSent) {
            return NextResponse.json({
                success: false,
                message: "Failed to send confirmation email",
            }, { status: 500 });
        }

        const newTicket = await WorkshopTicket.create({
            creatorId,
            buyerId,
            workshopId,
            orderId,
            eventDate,
            time,
            contact,
            paymentId,
            price,
            boughtDate,
        });

        if (newTicket){
            const userAnalytic = await Analytic.findOne({creatorId});
            if(userAnalytic){
                userAnalytic.earnings += Number(price);
                userAnalytic.workshopSold += 1;
                await userAnalytic.save();
            }
        }

        return NextResponse.json({
            success: true,
            message: "Workshop ticket created successfully",
            ticket: newTicket,
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating workshop ticket:", error);

        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error",
        }, { status: 500 });
    }
};
