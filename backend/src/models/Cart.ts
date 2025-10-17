import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

const CartSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model<ICartItem>("Cart", CartSchema);