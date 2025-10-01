import express from "express";
import Review from "../models/Review.js";
import dbConnect from "../lib/dbConnect.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
    await dbConnect();
    const { storeId, productName } = req.query;
    const filter = {};
    if (storeId) filter.store = mongoose.Types.ObjectId(storeId);
    if (productName) filter.productName = productName;
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
});

router.post("/", async (req, res) => {
    await dbConnect();
    try {
        const data = req.body;
        if (data.store) data.store = mongoose.Types.ObjectId(data.store);
        const r = await Review.create(req.body);
        res.status(201).json(r);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;