import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE ;

export interface Product {
  _id: string;
  name: string;
  imagePath: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = { items: [], loading: false };

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(`${API_BASE}/products`, { withCredentials: true });
  return res.data as Product[];
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (data: { name: string; description: string; quantity: number; unitPrice: number; image: File }) => {
    const form = new FormData();
    form.append('name', data.name);
    form.append('description', data.description);
    form.append('quantity', String(data.quantity));
    form.append('unitPrice', String(data.unitPrice));
    form.append('image', data.image);
    const res = await axios.post(`${API_BASE}/products`, form, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data as Product;
  }
);

export const updateProductQuantity = createAsyncThunk(
  'products/updateQuantity',
  async (data: { id: string; quantity: number }) => {
    const res = await axios.patch(`${API_BASE}/products/${data.id}/quantity`, { quantity: data.quantity }, { withCredentials: true });
    return res.data as Product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  }
});

export default productsSlice.reducer;


