import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// Import other reducers as your app grows
// import productsReducer from '../features/products/productsSlice';
// import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
  // products: productsReducer,
  // cart: cartReducer,
});

export default rootReducer;

