import mongoose, { Schema, InferSchemaType } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    imagePath: { type: String, required: true },
    description: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof productSchema> & { _id: mongoose.Types.ObjectId };

export const ProductModel = mongoose.model('Product', productSchema);



