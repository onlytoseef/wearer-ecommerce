import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  getDoc,
  writeBatch,
} from "firebase/firestore";

// Async thunk to add a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(firestore, "products"), product);
      return { id: docRef.id, ...product };
    } catch (error) {
      return rejectWithValue(`Error adding product: ${error.message}`);
    }
  }
);

// Async thunk to fetch products with pagination (to handle large datasets)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (pageSize = 10, { rejectWithValue }) => {
    try {
      const productsRef = collection(firestore, "products");
      const firstPageQuery = query(productsRef, limit(pageSize)); // Limit to `pageSize` products
      const querySnapshot = await getDocs(firstPageQuery);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return products;
    } catch (error) {
      return rejectWithValue(`Error fetching products: ${error.message}`);
    }
  }
);

// Async thunk to update a product (optimized with batch write)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const productDocRef = doc(firestore, "products", id);
      const batch = writeBatch(firestore);
      batch.update(productDocRef, updatedProduct); // Update the product with new data
      await batch.commit(); // Commit the batch
      return { id, ...updatedProduct }; // Return updated product
    } catch (error) {
      return rejectWithValue(`Error updating product: ${error.message}`);
    }
  }
);

// Async thunk to delete a product (optimized with batch write)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const productDocRef = doc(firestore, "products", id);
      const batch = writeBatch(firestore);
      batch.delete(productDocRef); // Delete the product
      await batch.commit(); // Commit the batch
      return id; // Return the ID of the deleted product
    } catch (error) {
      return rejectWithValue(`Error deleting product: ${error.message}`);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
