// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { doc, setDoc, getDocs, collection } from "firebase/firestore";
// import { firestore } from "../../config/firebase";

// const initialState = {
//   orders: {}, // Store orders as an object
//   loading: false,
//   error: null,
// };

// // Async action to place order in Firestore
// export const placeOrderAsync = createAsyncThunk(
//   "order/placeOrderAsync",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const orderNumber = Math.floor(100000 + Math.random() * 900000);
//       const orderRef = doc(firestore, "orders", orderNumber.toString());
//       const timestamp = new Date().toISOString();

//       await setDoc(orderRef, {
//         ...orderData,
//         orderNumber,
//         status: "placed",
//         timestamp,
//       });
//       return { orderNumber, orderData };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async action to fetch orders from Firestore
// export const getOrders = createAsyncThunk(
//   "order/getOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const ordersRef = collection(firestore, "orders");
//       const querySnapshot = await getDocs(ordersRef);
//       const orders = {};
//       querySnapshot.forEach((doc) => {
//         orders[doc.id] = doc.data();
//       });
//       return orders;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     updateOrderStatus: (state, action) => {
//       const { orderNumber, status } = action.payload;
//       if (state.orders[orderNumber]) {
//         state.orders[orderNumber].status = status;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(placeOrderAsync.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(placeOrderAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         const { orderNumber, orderData } = action.payload;
//         state.orders[orderNumber] = { ...orderData, orderNumber };
//       })
//       .addCase(placeOrderAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(getOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateOrderStatus } = orderSlice.actions;
// export default orderSlice.reducer;
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { doc, setDoc, getDocs, collection } from "firebase/firestore";
// // import { firestore } from "../../config/firebase";

// // const initialState = {
// //   orders: {}, // Store orders as an object
// //   loading: false,
// //   error: null,
// // };

// // // Async action to place order in Firestore
// // export const placeOrderAsync = createAsyncThunk(
// //   "order/placeOrderAsync",
// //   async (orderData, { rejectWithValue }) => {
// //     try {
// //       const orderNumber = Math.floor(100000 + Math.random() * 900000);
// //       const orderRef = doc(firestore, "orders", orderNumber.toString());
// //       const timestamp = new Date().toISOString(); // Get current date and time

// //       await setDoc(orderRef, {
// //         ...orderData,
// //         orderNumber,
// //         status: "placed",
// //         timestamp, // Add timestamp field
// //       });

// //       return { orderNumber, orderData: { ...orderData, timestamp } };
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // // Async action to fetch orders from Firestore
// // export const getOrders = createAsyncThunk(
// //   "order/getOrders",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const ordersRef = collection(firestore, "orders");
// //       const querySnapshot = await getDocs(ordersRef);
// //       const orders = {};
// //       querySnapshot.forEach((doc) => {
// //         orders[doc.id] = doc.data();
// //       });
// //       return orders;
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const orderSlice = createSlice({
// //   name: "order",
// //   initialState,
// //   reducers: {
// //     updateOrderStatus: (state, action) => {
// //       const { orderNumber, status } = action.payload;
// //       if (state.orders[orderNumber]) {
// //         state.orders[orderNumber].status = status;
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(placeOrderAsync.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(placeOrderAsync.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const { orderNumber, orderData } = action.payload;
// //         state.orders[orderNumber] = { ...orderData, orderNumber };
// //       })
// //       .addCase(placeOrderAsync.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(getOrders.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getOrders.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.orders = action.payload;
// //       })
// //       .addCase(getOrders.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { updateOrderStatus } = orderSlice.actions;
// // export default orderSlice.reducer;

// order delet code

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";

const initialState = {
  orders: {}, // Store orders as an object
  loading: false,
  error: null,
};

// Async action to place order in Firestore
export const placeOrderAsync = createAsyncThunk(
  "order/placeOrderAsync",
  async (orderData, { rejectWithValue }) => {
    try {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      const orderRef = doc(firestore, "orders", orderNumber.toString());
      const timestamp = new Date().toISOString();

      await setDoc(orderRef, {
        ...orderData,
        orderNumber,
        status: "placed",
        timestamp,
      });
      return { orderNumber, orderData };
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
      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to delete an order from Firestore
export const deleteOrderAsync = createAsyncThunk(
  "order/deleteOrderAsync",
  async (orderNumber, { rejectWithValue }) => {
    try {
      const orderRef = doc(firestore, "orders", orderNumber.toString());
      await deleteDoc(orderRef); // Delete the order from Firestore
      return orderNumber; // Return the orderNumber to remove it from the Redux store
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
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        delete state.orders[action.payload]; // Remove the deleted order from the store
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
