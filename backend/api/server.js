import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Conecte-se ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB database connection established successfully!"))
    .catch(err => console.log(err));

// Defina suas rotas aqui

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});