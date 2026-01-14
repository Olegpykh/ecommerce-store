import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../../api/productsApi';
import type { RootState } from '../../store/store';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await productsApi.getAll(0);
    return res.data.products;
  }
);

export const loadMoreProducts = createAsyncThunk(
  'products/loadMoreProducts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const skip = state.products.productsItems.length;
    const res = await productsApi.getAll(skip);
    return res.data.products;
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
  async (slug: string) => {
    const res = await productsApi.getByCategory(slug);
    return res.data.products;
  }
);
