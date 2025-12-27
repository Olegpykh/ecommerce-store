import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
} from './productsThunks';
import { ProductsState } from './types';

const initialState: ProductsState = {
  productsItems: [],
  currentProduct: null,

  productsStatus: 'idle',
  productStatus: 'idle',
  categoryProductsStatus: 'idle',

  productsError: null,
  productError: null,
  categoryProductsError: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.productsItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = 'failed';
        state.productsError = action.error.message || 'Failed to load products';
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = 'loading';
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productStatus = 'failed';
        state.productError = action.error.message || 'Failed to load product';
      });

    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.categoryProductsStatus = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.categoryProductsStatus = 'succeeded';
        state.productsItems = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.categoryProductsStatus = 'failed';
        state.categoryProductsError =
          action.error.message || 'Failed to load category products';
      });
  },
});

export default productsSlice.reducer;
