import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./features/adminAuthSlice";
import productReducer from "./features/productSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    products: productReducer,
  },
});

export default store;
