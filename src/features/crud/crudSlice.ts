import { createSlice } from '@reduxjs/toolkit';
import { createProduct, updateProduct, deleteProduct } from './crudThunks';

interface CrudState {
  result: Record<string, unknown> | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: CrudState = {
  result: null,
  status: 'idle',
};

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload;
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { clearResult } = crudSlice.actions;
export default crudSlice.reducer;
