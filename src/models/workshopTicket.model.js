import mongoose from 'mongoose';

const WorkshopTicketSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop',
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        requred: true
    },
    orderId: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    paymentId: {
        type: String,
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

const WorkshopTicket = mongoose.models.WorkshopTicket || mongoose.model('WorkshopTicket', WorkshopTicketSchema);

export default WorkshopTicket;
