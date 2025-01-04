import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    updateItemQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (increment) {
          item.quantity += 1;
        } else if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, updateItemQuantity, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
