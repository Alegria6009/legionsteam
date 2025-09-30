import mongoose from "mongoose";

const ProductSub = new mongoose.Schema({
    nome: String,
    desc: String,
    preco: Number,
    estoque: Number,
    foto: String
}, { _id: false });

const StoreSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    categoria: String,
    nacionalidade: String,
    telefone: String,
    email: String,
    pagamento: String,
    pagamentoDetalhes: mongoose.Schema.Types.Mixed,
    logo: String,
    produtos: [ProductSub],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);