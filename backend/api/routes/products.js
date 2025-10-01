import express from "express";
import dbConnect from "../lib/dbConnect.js";
import Store from "../models/Store.js";
const router = express.Router();

// GET products for store (by store id)
router.get("/:storeId", async (req, res) => {
    await dbConnect();
    const store = await Store.findById(req.params.storeId);
    if (!store) return res.status(404).json([]);
    res.json(store.produtos || []);
});

// POST product into store
router.post("/:storeId", async (req, res) => {
    await dbConnect();
    try {
        const store = await Store.findById(req.params.storeId);
        if (!store) return res.status(404).json({ error: "Loja não encontrada" });
        store.produtos.push(req.body);
        await store.save();
        res.status(201).json(store.produtos[store.produtos.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE product by index
router.delete("/:storeId/:index", async (req, res) => {
    await dbConnect();
    const store = await Store.findById(req.params.storeId);
    if (!store) return res.status(404).json({ error: "Loja não encontrada" });
    store.produtos.splice(Number(req.params.index), 1);
    await store.save();
    res.json({ ok: true });
});

export default router;