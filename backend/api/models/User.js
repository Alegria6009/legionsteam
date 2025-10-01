import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    emailOrPhone: String,
    password: String, // Em produção, armazenar hash da senha
    address: String,
    photo: String,
    role: { type: String, default: 'client' },  // Diferencia cliente/vendedor
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);