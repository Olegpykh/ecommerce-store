import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../../api/productsApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await productsApi.getAll();
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const res = await productsApi.getOne(id);
    return res.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (id: number) => {
    const res = await productsApi.getByCategory(id);
    return res.data;
  }
);
