import { createAsyncThunk } from '@reduxjs/toolkit';

export const createProduct = createAsyncThunk(
  'crud/create',
  async (newProduct: { title: string }) => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    return await response.json();
  }
);

interface UpdateProductArgs {
  id: number;
  title: string;
}

export const updateProduct = createAsyncThunk(
  'crud/update',
  async ({ id, title }: UpdateProductArgs) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'crud/delete',
  async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }
);
