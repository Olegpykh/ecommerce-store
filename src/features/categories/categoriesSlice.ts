import { fetchCategories, fetchCategoriesById } from './categoriesThunks';
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesState } from './types';

const initialState: CategoriesState = {
  categoryItems: [],
  currentCategory: null,
  status: 'idle',
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryItems = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load categories';
      });

    builder
      .addCase(fetchCategoriesById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoriesById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load category';
      });
  },
});

export default categoriesSlice.reducer;
