import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5001/api/cart";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addToCart = createAsyncThunk("cart/add", async (productId: string) => {
  const res = await axios.post(API, { productId });
  return res.data;
});

export const updateCartQuantity = createAsyncThunk("cart/updateQuantity", async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
  const res = await axios.put(`${API}/${cartItemId}`, { quantity });
  return res.data;
});

export const removeFromCart = createAsyncThunk("cart/remove", async (cartItemId: string) => {
  const res = await axios.delete(`${API}/${cartItemId}`);
  return res.data;
});

const slice = createSlice({
  name: "cart",
  initialState: { items: [] as any[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default slice.reducer;