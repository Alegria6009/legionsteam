import express from "express";
import Order from "../models/Order.js";
import dbConnect from "../lib/dbConnect.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
    await dbConnect();
    const { storeId } = req.query;
    const filter = {};
    if (storeId) filter.store = mongoose.Types.ObjectId(storeId);
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
});

router.post("/", async (req, res) => {
    await dbConnect();
    try {
        const data = req.body;
        if (data.store) data.store = mongoose.Types.ObjectId(data.store);
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
});

router.put("/:id", async (req, res) => {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

export default router;