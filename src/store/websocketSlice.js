import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    messages: [],
    isConnected: false,
  },
  reducers: {
    websocketConnected: (state) => {
      state.isConnected = true;
    },
    websocketDisconnected: (state) => {
      state.isConnected = false;
    },
    websocketMessageReceived: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { websocketConnected, websocketDisconnected, websocketMessageReceived } = websocketSlice.actions;
export default websocketSlice.reducer;
