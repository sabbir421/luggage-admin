import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet } from "../../utils";

export const fetchActiveVendorList = createAsyncThunk(
  "activeVendorList",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/vendor/active/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchActiveVendorListSlice = createSlice({
  name: "activeVendorList",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActiveVendorList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchActiveVendorList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
     
    });
    builder.addCase(fetchActiveVendorList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response?.data?.message;
     
    });
  },
});


export default fetchActiveVendorListSlice.reducer;