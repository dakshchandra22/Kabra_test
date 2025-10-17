import express from "express";
import Cart from "../models/Cart";

const router = express.Router();

// Get cart
router.get("/", async (_req, res) => {
  const cart = await Cart.find().populate("productId");
  res.json(cart);
});

// Add to cart
router.post("/", async (req, res) => {
  const { productId } = req.body;
  const existing = await Cart.findOne({ productId });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
  } else {
    await Cart.create({ productId, quantity: 1 });
  }

  const updated = await Cart.find().populate("productId");
  res.json(updated);
});

// Update quantity
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    await Cart.findByIdAndDelete(id);
  } else {
    await Cart.findByIdAndUpdate(id, { quantity });
  }

  const updated = await Cart.find().populate("productId");
  res.json(updated);
});

// Remove item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  
  const updated = await Cart.find().populate("productId");
  res.json(updated);
});

export default router;