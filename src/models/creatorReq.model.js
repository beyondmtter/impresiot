import mongoose from "mongoose";

const creatorReqSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export const CreatorReq = mongoose.models.CreatorReq || mongoose.model("CreatorReq", creatorReqSchema);
