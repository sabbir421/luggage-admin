// adminSignupSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicPost } from "../../utils";

export const adminSignup = createAsyncThunk(
  "admin signup",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await publicPost("/admin/signup", adminData);
      
      return response.payload.admin;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const adminSignupSlice = createSlice({
  name: "adminSignup",
  initialState: {
    isLoading: false,
    data: null, // Now 'data' includes the admin information
    error: null,
    signupSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(adminSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(adminSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
      state.signupSuccess = true;
    });
    builder.addCase(adminSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.signupSuccess = false;
    });
  },
});

export default adminSignupSlice.reducer;
