import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5001/api/products";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imagePath?: string;
  quantity: number;
}

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get<Product[]>(API);
  return res.data;
});

export const createProduct = createAsyncThunk("products/create", async (formData: FormData) => {
  const res = await axios.post<Product>(API, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
});

const slice = createSlice({
  name: "products",
  initialState: { items: [] as Product[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});

export default slice.reducer;