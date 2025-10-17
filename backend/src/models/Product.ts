import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  quantity: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imagePath: String,
  quantity: { type: Number, default: 0 },
});

export default mongoose.model<IProduct>("Product", ProductSchema);