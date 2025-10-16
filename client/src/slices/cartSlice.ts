import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE ;

export interface CartItem {
  product: {
    _id: string;
    name: string;
    imagePath: string;
    description: string;
    quantity: number;
    unitPrice: number;
  };
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

interface CartState {
  cart?: Cart;
  loading: boolean;
}

const initialState: CartState = { loading: false };

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await axios.get(`${API_BASE}/cart`, { withCredentials: true });
  return res.data as Cart;
});

export const addToCart = createAsyncThunk('cart/add', async (data: { productId: string; quantity?: number }) => {
  const res = await axios.post(`${API_BASE}/cart/add`, data, { withCredentials: true });
  return res.data as Cart;
});

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async (data: { productId: string; quantity: number }) => {
    const res = await axios.post(`${API_BASE}/cart/update`, data, { withCredentials: true });
    return res.data as Cart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export default cartSlice.reducer;



