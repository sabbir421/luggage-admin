import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet } from "../../utils";

// fetching user's api

export const fetchUserList = createAsyncThunk(
  "userList",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/user/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// defining the user slice

export const userSlice = createSlice({
    name: "userList",
    initialState: {
      isLoading: false,
      userList: null,
      error: null,
      userFetch: false,
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserList.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUserList.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userList = action.payload;
          state.error = null;
          state.userFetch = true;
        })
        .addCase(fetchUserList.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.response?.data?.message;
          state.userFetch = false;
          state.userList = []; 
        });
    },
  });

  
export default userSlice.reducer;