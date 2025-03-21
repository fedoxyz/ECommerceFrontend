import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = authService.getUser();

const initialState = {
  user: user,
  isAuthenticated: !!user,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  message: '',
  otp: {
    required: false,
    message: '',
  }
};

// Helper function for error handling in thunks
const handleError = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      
      if (response.otpRequired) {
        return {
          otp: {
            required: true,
            message: response.message || 'Please enter the OTP sent to your device.'
          }
        };
      }
      
      return {
        user: response.user,
        otp: { required: false, message: '' }
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.message = '';
      state.otp = { required: false, message: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
        state.user = null;
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.user;
        state.otp = action.payload.otp || { required: false, message: '' };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
        state.user = null;
        state.otp = { required: state.otp.required, message: '' };
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.otp = { required: false, message: '' };
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload || 'Logout failed';
      });
      
    // Note: We removed the addMatcher approach since addCase must come first
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
