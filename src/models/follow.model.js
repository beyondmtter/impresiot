import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema);
export default Follow