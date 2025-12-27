import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesThunks';
import { CategoriesState } from './types';

const initialState: CategoriesState = {
  categoriesItems: [],
  categoriesStatus: 'idle',
  categoriesError: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categoriesItems = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.categoriesError = action.error.message || 'Failed to load categories';
      });
  },
});

export default categoriesSlice.reducer;
