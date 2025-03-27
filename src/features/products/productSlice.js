import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

// Async thunk to fetch product details using your existing service
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(productId);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    currentProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    updateProductStock: (state, action) => {
      if (state.currentProduct) {
        const newStock = state.currentProduct.stock + action.payload;
        state.currentProduct.stock = newStock >= 0 ? newStock : 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Product Cases
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      })
  },
});

export const { updateProductStock } = productSlice.actions;
export default productSlice.reducer;
