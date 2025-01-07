import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { firestore } from "../../config/firebase"; // Import firestore

const initialState = {
  orders: {}, // Ensure it's an empty object initially
  loading: false,
  error: null,
};

// Async action to place order and store in Firestore
export const placeOrderAsync = createAsyncThunk(
  "order/placeOrderAsync",
  async (orderData, { rejectWithValue }) => {
    try {
      const orderNumber = Math.random().toString(36).substr(2, 9); // Generate random order number
      const orderRef = doc(firestore, "orders", orderNumber);
      await setDoc(orderRef, {
        ...orderData,
        orderNumber,
        status: "placed", // Default status is "placed"
      });

      return { orderNumber, orderData }; // Return order number and order data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to fetch orders from Firestore
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const ordersRef = collection(firestore, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const orders = {};
      querySnapshot.forEach((doc) => {
        orders[doc.id] = doc.data();
      });
      return orders; // Return all orders
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderNumber, status } = action.payload;
      if (state.orders[orderNumber]) {
        state.orders[orderNumber].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { orderNumber, orderData } = action.payload;
        state.orders[orderNumber] = { ...orderData, orderNumber };
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Set orders in Redux store
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
