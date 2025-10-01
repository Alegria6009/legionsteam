import mongoose from "mongoose";

const OrderItem = new mongoose.Schema({
    nome: String,
    preco: Number,
    qty: Number,
    productIndex: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    storeIndex: Number, // para compatibilidade com o frontend original
    items: [OrderItem],
    total: Number,
    status: { type: String, default: "Pendente" }, // Pendente, Entregue, Recebido, AguardandoVerificacao
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    customerPhoto: String,
    proof: String, // base64 or URL
    log: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);