import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePatch } from "../../utils";

export const fetchWithrowRequest = createAsyncThunk(
  "fetchWithrowRequest",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/payment/withraw/request", token);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const approveWithrawRequest = createAsyncThunk(
  "approve withraw",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(
        `/payment/withraw/approve/${id}`,
        token,
        { status: "APPROVED" }
      );
      return response.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const cancelWithrawRequest = createAsyncThunk(
  "cancelWithraw",
  async ({ id, vendorId, token }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(
        `/payment/withraw/reject/${id}/${vendorId}`,
        token,
        { status: "CANCEL" }
      );
      return response.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const withrowSlice = createSlice({
  name: "vendorRequestList",
  initialState: {
    isLoading: false,
    withrowRequestList: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWithrowRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWithrowRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.withrowRequestList = action.payload;
    });
    builder.addCase(fetchWithrowRequest.rejected, (state, action) => {
      state.withrowRequestList = [];
      state.error = action.error?.message;
      state.isLoading = false;
    });
    builder.addCase(approveWithrawRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(approveWithrawRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(approveWithrawRequest.rejected, (state, action) => {
      state.withrowRequestList = [];
      state.error = action.error?.message;
      state.isLoading = false;
    });
    builder.addCase(cancelWithrawRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelWithrawRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(cancelWithrawRequest.rejected, (state, action) => {
      state.withrowRequestList = [];
      state.error = action.error?.message;
      state.isLoading = false;
    });
  },
});

export default withrowSlice.reducer;
