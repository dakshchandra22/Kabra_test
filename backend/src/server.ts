import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

// Basic setup
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartaRoutes);

// Database
mongoose
  .connect("mongodb://127.0.0.1:27017/kabra_ts_shop")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// Start server
app.listen(5001, () => console.log("Server running on port 5001"));
