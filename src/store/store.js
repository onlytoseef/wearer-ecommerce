import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./features/adminAuthSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});

export default store;
