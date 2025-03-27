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

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ pageNum, reset = false, limit = 10, filters = {} }, { rejectWithValue, getState }) => {
    try {
      const response = await productService.getAllProducts({ 
        ...filters, 
        page: pageNum, 
        limit: limit 
      });
      
      console.log("response", response);
      
      // If reset is true, return all new products
      if (reset) {
        return {
          products: response.products,
          hasMore: response.products.length > 0 && 
                   (!response.totalItems || (pageNum * limit) < response.totalItems),
          totalItems: response.totalItems
        };
      }
      
      // If not resetting, handle potential duplicates
      const state = getState().product;
      const existingIds = new Set(state.products.map(p => p.id));
      const uniqueNewProducts = response.products.filter(p => !existingIds.has(p.id));
      
      return {
        products: [...state.products, ...uniqueNewProducts],
        hasMore: uniqueNewProducts.length > 0 && 
                 (!response.totalItems || (pageNum * limit) < response.totalItems),
        totalItems: response.totalItems
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    currentProduct: null,
    products: [],
    loading: false,
    error: null,
    hasMore: true,
    totalItems: 0
  },
  reducers: {
    updateProductStock: (state, action) => {
      const { productId, stockChange } = action.payload;
      console.log("action.payload", action.payload)
      
      // Update current product if it matches
      if (state.currentProduct && state.currentProduct.id === productId) {
        const newStock = state.currentProduct.stock + stockChange;
        state.currentProduct.stock = newStock >= 0 ? newStock : 0;
      }
      console.log("updating prodcut stock") 
      if (state.products) {
        // Update product in products array
        console.log(state.products, productId)
        const productIndex = state.products.findIndex(product => product.id === productId);
        console.log("productIndex", productIndex)
        if (productIndex !== -1) {
          const newStock = state.products[productIndex].stock + stockChange;
          console.log("newStock", newStock)
          state.products[productIndex].stock = newStock >= 0 ? newStock : 0;
        }
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
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.hasMore = action.payload.hasMore;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false;
      })
  },
});

export const { updateProductStock } = productSlice.actions;
export default productSlice.reducer;
