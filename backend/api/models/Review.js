import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    productName: String,
    customerName: String,
    customerPhoto: String,
    rating: Number,
    text: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);