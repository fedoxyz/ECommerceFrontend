import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (itemData, thunkAPI) => {
  try {
    return await cartService.addItem(itemData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to add item");
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ itemId, quantity }, thunkAPI) => {
  try {
    return await cartService.updateItem(itemId, quantity);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to update item");
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId, thunkAPI) => {
  try {
    const result = await cartService.removeItem(itemId);
    return { result, itemId }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to remove item");
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    return await cartService.clearCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to clear cart");
  }
});


const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.CartItems;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
          console.log(action)
          const existingItemIndex = state.items.findIndex(
              item => item.id === action.payload.id
          );
          if (existingItemIndex !== -1) {
              state.items = state.items.map(item => 
                  item.id === action.payload.id ? action.payload : item
              );
          } else {
              state.items.push(action.payload);
          }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log(action);
        state.items = state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedItemId = action.payload.itemId;
        state.items = state.items.filter(item => (item.id !== removedItemId));
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
