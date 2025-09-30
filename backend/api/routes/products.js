// backend/routes/products.js
import express from "express";
import dbConnect from "../lib/dbConnect.js";
import Store from "../models/Store.js";
import mongoose from "mongoose";
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
        const newProduct = req.body;
        // Mongoose will add _id to subdocument on save
        store.produtos.push(newProduct);
        await store.save();
        res.status(201).json(store.produtos[store.produtos.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE product by index (for seller dashboard)
router.delete("/:storeId/:index", async (req, res) => {
    await dbConnect();
    const store = await Store.findById(req.params.storeId);
    if (!store) return res.status(404).json({ error: "Loja não encontrada" });
    store.produtos.splice(Number(req.params.index), 1);
    await store.save();
    res.json({ message: "Produto excluído por índice com sucesso." });
});

// NOVO ENDPOINT DELETE por _id do produto (para admin)
router.delete("/:storeId/product/:productId", async (req, res) => {
    await dbConnect();
    try {
        const store = await Store.findById(req.params.storeId);
        if (!store) return res.status(404).json({ error: "Loja não encontrada" });

        // Filtra produtos para remover o que tem o _id correspondente
        const initialProductCount = store.produtos.length;
        store.produtos = store.produtos.filter(p => p._id.toString() !== req.params.productId);

        if (store.produtos.length === initialProductCount) {
            return res.status(404).json({ error: "Produto não encontrado na loja." });
        }

        await store.save();
        res.json({ message: "Produto excluído por ID com sucesso." });
    } catch (err) {
        console.error("Erro ao excluir produto por ID:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;