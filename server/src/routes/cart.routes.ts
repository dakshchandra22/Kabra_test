import { Router } from 'express';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';

const router = Router();

// Utility: derive a simple session id via cookie; if not present, set one
router.use((req, res, next) => {
  const cookieName = 'cart_session_id';
  let sessionId = req.cookies?.[cookieName];
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2);
    res.cookie(cookieName, sessionId, { httpOnly: false, sameSite: 'lax' });
  }
  (req as any).sessionId = sessionId;
  next();
});

// Get or create cart by session
async function getOrCreateCart(sessionId: string) {
  let cart = await CartModel.findOne({ sessionId });
  if (!cart) cart = await CartModel.create({ sessionId, items: [] });
  return cart;
}

// Add to cart: { productId, quantity }
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Math.max(1, Number(quantity || 1));
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const sessionId = (req as any).sessionId as string;
    const cart = await getOrCreateCart(sessionId);

    const item = cart.items.find((i: any) => i.product.toString() === productId);
    const currentQty = item ? item.quantity : 0;
    const desired = currentQty + qty;
    const limited = Math.min(desired, product.quantity);
    if (item) item.quantity = limited; else cart.items.push({ product: product._id, quantity: limited } as any);
    await cart.save();
    const populated = await cart.populate('items.product');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Update quantity: { productId, quantity }
router.post('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Math.max(0, Number(quantity || 0));
    const sessionId = (req as any).sessionId as string;
    const cart = await getOrCreateCart(sessionId);
    const index = cart.items.findIndex((i: any) => i.product.toString() === productId);
    if (index === -1) return res.status(404).json({ error: 'Item not in cart' });
    if (qty === 0) {
      cart.items.splice(index, 1);
    } else {
      const product = await ProductModel.findById(productId);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      cart.items[index].quantity = Math.min(qty, product.quantity);
    }
    await cart.save();
    const populated = await cart.populate('items.product');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// List cart
router.get('/', async (req, res) => {
  try {
    const sessionId = (req as any).sessionId as string;
    const cart = await getOrCreateCart(sessionId);
    const populated = await cart.populate('items.product');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

export default router;


