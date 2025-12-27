import { productsReducer } from '../features/products';
import { categoriesReducer } from '../features/categories';
import cartReducer from "../features/cart/cartSlice"
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
