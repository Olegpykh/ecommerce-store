import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from './types';

const saved = localStorage.getItem('cart');

const initialState: CartState = {
  items: saved ? JSON.parse(saved) : [],
};

const save = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
      save(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      save(state);
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      save(state);
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      save(state);
    },

    clearCart: (state) => {
      state.items = [];
      save(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
