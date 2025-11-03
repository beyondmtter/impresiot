import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { uploadImageToBlob } from "@/lib/azureBlobUpload"; // Import the utility function
import { deleteImageFromBlob } from "@/lib/deleteImageFromBlob";

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();

    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "userId not provided" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      fullName,
      contact,
      email,
      countryCode,
      state,
      about,
      country,
      profilePicture, // base64 string expected
      profession,
      instagram,
      facebook,
      twitter,
      youtube,
      website,
      deleteProfilePic,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = body;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: `No user found with id ${userId}` },
        { status: 404 }
      );
    }

    // Check if the email is already in use by another user
    const emailExists = await User.findOne({
      email: email,
      _id: { $ne: userId },
    });
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already in use by another user" },
        { status: 409 }
      );
    }

    // Check if the mobile number is already in use by another user
    const mobileExists = await User.findOne({
      contact: contact,
      _id: { $ne: userId },
    });
    if (mobileExists) {
      return NextResponse.json(
        { error: "Mobile number already in use by another user" },
        { status: 409 }
      );
    }

    // Handle password change
    if (currentPassword || newPassword || confirmNewPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return NextResponse.json(
          { error: "All password fields are required" },
          { status: 400 }
        );
      }

      if (newPassword !== confirmNewPassword) {
        return NextResponse.json(
          { error: "New passwords do not match" },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Update profile details
    user.fullName = fullName || user.fullName;
    user.contact = `${countryCode}-${contact}` || user.contact;
    user.email = email || user.email;
    user.countryCode = countryCode || user.countryCode;
    user.location.state = state || user.location.state;
    user.location.country = country || user.location.country;
    user.socialLinks.instagram = instagram || user.socialLinks.instagram;
    user.socialLinks.facebook = facebook || user.socialLinks.facebook;
    user.socialLinks.twitter = twitter || user.socialLinks.twitter;
    user.socialLinks.youtube = youtube || user.socialLinks.youtube;
    user.socialLinks.website = website || user.socialLinks.website;
    user.profession = profession || user.profession
    user.about = about || user.about;

    if (deleteProfilePic) {
      try {
        await deleteImageFromBlob(user?.profilePicture);
        user.profilePicture = ""; 
      } catch (error) {
        console.error("Error deleting profile picture:", error);
        return NextResponse.json(
          { error: "Failed to delete profile picture" },
          { status: 500 }
        );
      }
    }

    if (profilePicture && !profilePicture.includes("https")) {
      try {
        const imageUrl = await uploadImageToBlob(profilePicture);
        user.profilePicture = imageUrl; 
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return NextResponse.json(
          { error: "Failed to upload profile picture" },
          { status: 500 }
        );
      }
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with the updated user data (excluding password)
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return NextResponse.json(
      {
        message: "User profile updated successfully",
        success: true,
        user: userWithoutPassword,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the user profile" },
      { status: 500 }
    );
  }
};
