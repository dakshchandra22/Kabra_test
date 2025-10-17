import express from "express";
import Product from "../models/Product";
import { upload } from "../middleware/upload";

const router = express.Router();

// Get all products
router.get("/", async (_req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
  
  const product = new Product({ name, description, price, quantity, imagePath });
  await product.save();
  res.json(product);
});

export default router;