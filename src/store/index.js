import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import websocketMiddleware from '../middleware/websocketMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(websocketMiddleware), 
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

