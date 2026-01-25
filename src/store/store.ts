import { productsReducer } from '../features/products';
import { categoriesReducer } from '../features/categories';
import cartReducer from "../features/cart/cartSlice"
import { configureStore } from '@reduxjs/toolkit';

import themeReducer from "../features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    theme:themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
