// backend/routes/users.js
import express from "express";
import dbConnect from "../lib/dbConnect.js";
import User from "../models/User.js";
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
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => { // NOVO ENDPOINT DELETE
    await dbConnect();
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json({ message: "Usuário excluído com sucesso", user });
    } catch (err) {
        console.error("Erro ao excluir usuário:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;