import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, {params}) => {
  try {

    await connectDB();
    const { userId } = params
    const { setting } = await req.json();
    
    if (!userId || !setting) {
      return NextResponse.json(
        { error: "userId and settings are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { setting: setting } }, 
      { new: true, runValidators: true } 
    ).select("-password -updatedAt -createdAt -verifyTokenExpiry -verifyToken");

    if (!updatedUser) {
      return NextResponse.json(
        { error: `No user found with id ${userId}` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User settings updated successfully", user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating user settings:", error.message);
    return NextResponse.json(
      { error: "An error occurred while updating user settings" },
      { status: 500 }
    );
  }
};
