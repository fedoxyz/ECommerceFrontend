import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';

// Async Thunks
export const verifyEmail = createAsyncThunk(
  'profile/verifyEmail', 
  async (otp, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/auth/verify-email', { otpCode: otp });
      // Return both the response and the original OTP for use in the reducer
      return { response, otp };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeEmail = createAsyncThunk(
  'profile/changeEmail', 
  async ({ newEmail, otps }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/users/change-email', { newEmail, otps });
      return { response, otps };  // Success
    } catch (error) {
      // Ensure we're capturing the error properly and rejecting
      return rejectWithValue(error.response?.data || error.message);  // Reject with error data
    }
  }
);

export const changePassword = createAsyncThunk('profile/changePassword', async ({ currentPassword, newPassword }, { rejectWithValue }) => {
  try {
    const response = await apiService.post('/users/change-password', { currentPassword, newPassword });
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`/users/profile`, { firstName, lastName });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile.");
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: { status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.fulfilled, (state, action) => {
        if (action.payload.otp === "send") {
          state.status = 'email-verification-sent';
        } else {
          state.status = 'email-verified';
        }
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        console.log(action)
        if (action.payload.otps === "send") {
          state.status = "email-changing-sent";
        } else {
          state.status = 'email-changed';
        }
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'password-changed';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        console.log("changeEmail rejected")
        // Ensure status is null on error
        state.status = null;
        state.error = action.payload;  // Capture the error message
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'profile-updated';
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

