import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '../../api/categoriesApi';
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await categoriesApi.getAll();
    return res.data;
  }
);
export const fetchCategoriesById = createAsyncThunk(
  'categories/fetchCategoriesById',
  async (id: number) => {
    const res = await categoriesApi.getOne(id);
    return res.data;
  }
);
