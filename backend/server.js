javascript
import 'dotenv/config';
import dbConnect from './lib/dbConnect.js';
import express from 'express';
import cors from 'cors';
import storesRouter from './routes/stores.js';
import productsRouter from './routes/products.js';

await dbConnect();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rota para testar a conexão
app.get('/api/health', (req, res) => {
    res.status(200).send('API ok');
  });

app.use('/api/stores', storesRouter);
app.use('/api/products', productsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
  });
