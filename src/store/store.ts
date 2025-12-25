import { productsReducer } from '../features/products';
import { categoriesReducer } from '../features/categories';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
