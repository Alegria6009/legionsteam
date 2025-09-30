// backend/models/Order.js
import mongoose from "mongoose";

const OrderItem = new mongoose.Schema({
    nome: String,
    preco: Number,
    qty: Number,
    productIndex: Number,
    productId: String // Adicionado para guardar o ID do produto
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    storeIndex: Number, // Índice local da loja (para compat. frontend antigo)
    items: [OrderItem],
    total: Number,
    status: { type: String, default: "Pendente" }, // Pendente, Entregue, Recebido, AguardandoVerificacao
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    customerPhoto: String,
    clientRefId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // NOVO: Referência ao _id do cliente
    proof: String, // base64 or URL
    log: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);