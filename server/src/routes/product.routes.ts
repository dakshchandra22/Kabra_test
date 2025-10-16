import { Router } from 'express';
import { ProductModel } from '../models/product.model';
import { upload } from '../middleware/upload';

const router = Router();

// Create product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, quantity, unitPrice } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    const product = await ProductModel.create({
      name,
      description: description || '',
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      imagePath: `/uploads/${req.file.filename}`
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// List products
router.get('/', async (_req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list products' });
  }
});

export default router;

// Update stock quantity
router.patch('/:id/quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body as { quantity: number };
    const q = Math.max(0, Number(quantity));
    const updated = await ProductModel.findByIdAndUpdate(
      id,
      { $set: { quantity: q } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (_err) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});


