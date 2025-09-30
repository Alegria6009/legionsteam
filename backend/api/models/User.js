// backend/models/User.js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: String,
    emailOrPhone: String,
    password: String, // ESSENCIAL: para guardar a senha (mesmo que em texto puro para protótipo)
    address: String,
    photo: String,
    role: { type: String, default: 'client' }, // ESSENCIAL: para diferenciar cliente/vendedor
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.User || mongoose.model("User", UserSchema);