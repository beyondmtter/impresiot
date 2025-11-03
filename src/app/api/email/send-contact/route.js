import { sendContactEmail } from "@/lib/sendContactEmail";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { name, email, message, phoneNumber } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Every field is required",
                },
                { status: 400 }
            );
        }

        console.log("api", phoneNumber)
        await sendContactEmail(name, message, email, phoneNumber);

        return NextResponse.json(
            {
                success: true,
                message: "Contact send",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while sending contact email",
            },
            { status: 500 }
        );
    }
};
