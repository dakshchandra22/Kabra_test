import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';

import productRouter from './routes/product.routes';
import cartRouter from './routes/cart.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Static folder for product images
const uploadsDir = path.resolve('uploads');
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// Start server first so health endpoint works even if Mongo is down
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Mongo connected');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Mongo connection error', err);
  });


