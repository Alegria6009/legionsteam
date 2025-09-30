// backend/routes/orders.js
import express from "express";
import dbConnect from "../lib/dbConnect.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
    await dbConnect();
    const { storeId, customerId } = req.query; // Adicionado customerId
    const filter = {};
    if (storeId) filter.store = mongoose.Types.ObjectId(storeId); // Filtra por MongoDB _id da loja
    if (customerId) filter.clientRefId = mongoose.Types.ObjectId(customerId); // Filtra por MongoDB _id do cliente

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
});

router.post("/", async (req, res) => {
    await dbConnect();
    try {
        const data = req.body;
        if (data.store) data.store = mongoose.Types.ObjectId(data.store);
        if (data.clientRefId) data.clientRefId = mongoose.Types.ObjectId(data.clientRefId); // Adiciona clientRefId
        const order = await Order.create(data);
        res.status(201).json(order);
    } catch (err) {
        console.error("Erro ao criar pedido:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    await dbConnect();
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
});

router.put("/:id", async (req, res) => {
    await dbConnect();
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete("/:id", async (req, res) => { // NOVO ENDPOINT DELETE
    await dbConnect();
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
        res.json({ message: "Pedido excluído com sucesso", order });
    } catch (err) {
        console.error("Erro ao excluir pedido:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;