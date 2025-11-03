import { Workshop } from "@/models/workshop.model";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        const { workshopId } = params;

        if (!workshopId) {
            return NextResponse.json(
                { success: false, message: "Workshop ID is required" },
                { status: 400 }
            );
        }

        const deletedWorkshop = await Workshop.findByIdAndDelete(workshopId);

        if (!deletedWorkshop) {
            return NextResponse.json(
                { success: false, message: "No workshop found with this ID" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Workshop deleted successfully",
                data: deletedWorkshop,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting workshop:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
};
