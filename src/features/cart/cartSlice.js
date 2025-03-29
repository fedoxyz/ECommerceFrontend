import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

// Helper functions for localStorage
const getGuestCartFromStorage = () => {
  try {
    const guestCartStr = localStorage.getItem('guestCart');
    return guestCartStr ? JSON.parse(guestCartStr) : [];
  } catch (error) {
    console.error('Error parsing guest cart', error);
    return [];
  }
};

const saveGuestCartToStorage = (cart) => {
  try {
    localStorage.setItem('guestCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving guest cart', error);
  }
};

export const syncGuestCart = createAsyncThunk(
  "cart/syncGuestCart",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const cartItems = state.cart.items; 

      if (!Array.isArray(cartItems) || cartItems.length === 0) return [];

      const results = await Promise.allSettled(
        cartItems.map((item) =>
          cartService.addItem({
            productId: item.ProductId,
            quantity: item.quantity,
          })
        )
      );

      const syncedItems = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const failedItems = results
        .filter((result) => result.status === "rejected")
        .map((result, index) => ({
          error: result.reason.response?.data || "Unknown error",
          ProductId: cartItems[index].ProductId,
        }));

      return { syncedItems, failedItems }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to sync guest cart");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart", 
  async (isAuthenticated, thunkAPI) => {
    try {
      if (isAuthenticated) {
        return await cartService.getCart();
      } else {
        // Return cart items as an array directly
        return {
          CartItems: getGuestCartFromStorage()
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart", 
  async (itemData, thunkAPI) => {
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth.isAuthenticated;
    
    // For guest users, handle cart in local storage
    if (!isAuthenticated) {
      try {
        const guestCart = getGuestCartFromStorage();
        
        const existingItemIndex = guestCart.findIndex(
          item => item.productId === itemData.productId
        );

        let updatedItem;
        
        if (existingItemIndex !== -1) {
          guestCart[existingItemIndex].quantity += itemData.quantity;
          updatedItem = guestCart[existingItemIndex];
        } else {
          const newItem = {
            id: Date.now().toString(), // Generate a temporary ID
            ProductId: itemData.productId,
            quantity: itemData.quantity,
            price: itemData.price,
            Product: itemData.Product || {} // Include product info if available
          };
          guestCart.push(newItem);
          updatedItem = newItem;
        }

        saveGuestCartToStorage(guestCart);
        return updatedItem;
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to add item to guest cart");
      }
    }

    // For authenticated users, use the existing service call
    try {
      return await cartService.addItem(itemData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem", 
  async (itemData, thunkAPI) => {
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    // For guest users, handle cart in local storage
    if (!isAuthenticated) {
      try {
        const guestCart = getGuestCartFromStorage();
        const itemIndex = guestCart.findIndex(item => item.id === itemData.id);
        console.log(guestCart)
        console.log(itemData)
        console.log("itemIndex", itemIndex)
        if (itemIndex != -1) {
          console.log(itemData.quantity, "quantity")
          console.log(guestCart[itemIndex], "item in guestCart")
          guestCart[itemIndex].quantity = itemData.quantity;
          saveGuestCartToStorage(guestCart);

          return guestCart[itemIndex];
        }

        return thunkAPI.rejectWithValue("Item not found in guest cart");
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update guest cart item");
      }
    }

    // For authenticated users, use the existing service call
    try {
      console.log("trying to update with quantitiy", itemData.quantity)
      return await cartService.updateItem(itemData.id, itemData.quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update item");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart", 
  async (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    // For guest users, handle cart in local storage
    if (!isAuthenticated) {
      try {
        const guestCart = getGuestCartFromStorage();
        const updatedGuestCart = guestCart.filter(item => item.id !== itemId);
        
        saveGuestCartToStorage(updatedGuestCart);
        return { itemId };
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to remove item from guest cart");
      }
    }

    // For authenticated users, use the existing service call
    try {
      const result = await cartService.removeItem(itemId);
      return { result, itemId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart", 
  async (onLogout=false, thunkAPI) => {
    if (onLogout) { return []; };
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    // Clear local storage for guest users
    if (!isAuthenticated) {
      localStorage.removeItem('guestCart');
      console.log("clearning cart")
      return [];
    }

    // For authenticated users, use the existing service call
    try {
      return await cartService.clearCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null, hasFetchedCart: false },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    loadGuestCart: (state) => {
      state.items = getGuestCartFromStorage();
    },
    setHasFetchedCart: (state, action) => {
      state.status = "idle";
      state.hasFetchedCart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.CartItems || [];
        state.status = "succeeded";
        state.hasFetchedCart = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log(action, 'action add to cart fulfilled')
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
        console.log(action)
        state.items = state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedItemId = action.payload.itemId;
        state.items = state.items.filter(item => item.id !== removedItemId);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(syncGuestCart.fulfilled, (state, action) => {
        state.items = action.payload.syncedItems;
      })
      .addCase(syncGuestCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCart, loadGuestCart, setHasFetchedCart } = cartSlice.actions;
export default cartSlice.reducer;
