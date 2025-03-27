import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// Import other reducers as your app grows
import profileReducer from '../features/profile/profileSlice';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/products/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  product: productReducer,
  // Add other reducers here
  // products: productsReducer,
  // cart: cartReducer,
});

export default rootReducer;

