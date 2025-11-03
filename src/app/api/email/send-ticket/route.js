import { NextResponse } from "next/server";
import { sendTicketConfirmationEmail } from "@/lib/sendTicketConfirmationEmail";
import User from "@/models/user.model";
import { generateQrCode } from "@/helper/genearteQrForTicket";

export const POST = async (req) => {
    try {
        const { fullName, title, boughtDate } = await req.json();

        if (!fullName || !title || !boughtDate) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Every field is required",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ "fullName": fullName });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        await sendTicketConfirmationEmail(fullName, title, boughtDate, user.email);

        return NextResponse.json(
            {
                success: true,
                message: "Ticket sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while sending ticket email",
            },
            { status: 500 }
        );
    }
};
