import express from "express";
import User from "../models/User.js";
import dbConnect from "../lib/dbConnect.js";
const router = express.Router();

router.get("/", async (req, res) => {
    await dbConnect();
    const users = await User.find({});
    res.json(users);
});

router.post("/", async (req, res) => {
    await dbConnect();
    try {
        const u = await User.create(req.body);
        res.status(201).json(u);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;