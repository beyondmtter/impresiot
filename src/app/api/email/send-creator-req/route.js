import { sendCreatorReqEmail } from "@/lib/sendCreatorReqEmail";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { fullName, instaProfile, youtubeProfile, userId } = await req.json();

    if (!fullName || !instaProfile || !youtubeProfile || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
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

    user.isRequestedToCreator = true;
    user.dateOfRequest = new Date();

    await user.save();

    await sendCreatorReqEmail(fullName, instaProfile, youtubeProfile, userId, user.email);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully and user updated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending email",
      },
      { status: 500 }
    );
  }
};
