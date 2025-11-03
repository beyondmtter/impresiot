import mongoose, { Schema } from "mongoose";

const workShopSchema = new mongoose.Schema({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    batchSize: {
        type: Number,
        required: true,
        default: 0
    },
    language: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    discountToNumberOfTicket: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    thumbNail: {
        type: String,
        required: true
    },
    isSellingClosed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Workshop = mongoose.models.Workshop || mongoose.model("Workshop", workShopSchema);