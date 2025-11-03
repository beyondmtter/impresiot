import { default as mongoose } from "mongoose";

const analyticSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    earnings: {
        type: Number,
        default: 0
    },
    totalWorkshop:{
        type: Number,
        default: 0
    },
    workshopSold: {
        type: Number,
        default: 0
    },
    totalWorkshopHours: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Analytic = mongoose.models.Analytic || mongoose.model('Analytic', analyticSchema);

export default Analytic;
  