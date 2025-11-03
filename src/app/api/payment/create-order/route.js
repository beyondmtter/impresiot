import { instance } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { amount } = await req.json()
    try {
        var options = {
            amount: Number(amount * 100),
            currency: "INR"
        };
        const order = await instance.orders.create(options);

        return NextResponse.json(
            {
                message: "Order created successfully",
                success: true,
                order,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error creating", error);
        return NextResponse.json(
            { error: "An error occurred while creating order" },
            { status: 500 }
        );
    }
};
