import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./features/adminAuthSlice";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
