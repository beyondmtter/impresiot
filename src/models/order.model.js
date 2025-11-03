import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    workshopId: {
        type: Schema.Types.ObjectId,
        ref: "Workshop",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    }
    },{timestamps: true})

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);