import mongoose, { Schema, InferSchemaType } from 'mongoose';

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    sessionId: { type: String, required: true, index: true, unique: true },
    items: { type: [cartItemSchema], default: [] }
  },
  { timestamps: true }
);

export type Cart = InferSchemaType<typeof cartSchema> & { _id: mongoose.Types.ObjectId };

export const CartModel = mongoose.model('Cart', cartSchema);



