// backend/routes/stores.js
import express from "express";
import dbConnect from "../lib/dbConnect.js";
import Store from "../models/Store.js";
import Order from "../models/Order.js"; // Para excluir pedidos relacionados
import Review from "../models/Review.js"; // Para excluir reviews relacionados
const router = express.Router();

router.get("/", async (req, res) => {
    await dbConnect();
    const stores = await Store.find({});
    res.json(stores);
});

router.post("/", async (req, res) => {
    await dbConnect();
    console.log("POST /api/stores body:", req.body);
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (err) {
        console.error("Erro ao criar loja:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    await dbConnect();
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: "Not found" });
    res.json(store);
});

router.put("/:id", async (req, res) => {
    await dbConnect();
    const updated = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete("/:id", async (req, res) => { // NOVO ENDPOINT DELETE
    await dbConnect();
    try {
        const storeId = req.params.id;
        const store = await Store.findByIdAndDelete(storeId);
        if (!store) return res.status(404).json({ error: "Loja não encontrada" });

        // Opcional: Excluir pedidos e reviews relacionados a esta loja
        await Order.deleteMany({ store: storeId });
        await Review.deleteMany({ store: storeId });

        res.json({ message: "Loja excluída com sucesso (e seus pedidos/reviews relacionados)", store });
    } catch (err) {
        console.error("Erro ao excluir loja:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;