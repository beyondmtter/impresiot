import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, {params}) => {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.rejectedToCreator) {
      return NextResponse.json(
        {
          success: false,
          message: "User has already been rejected as a creator",
        },
        { status: 400 }
      );
    }

    if (!user.isRequestedToCreator) {
      return NextResponse.json(
        {
          success: false,
          message: "User has not requested to be a creator",
        },
        { status: 400 }
      );
    }

    user.rejectedToCreator = true;
    user.isRequestedToCreator = false;
    user.approvedToCreator = false;
    user.dateOfReject = new Date();

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User's request to become a creator has been rejected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rejecting user as creator:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while rejecting the user",
      },
      { status: 500 }
    );
  }
};
