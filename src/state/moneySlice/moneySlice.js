import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet } from "../../utils";

export const vendorBalanceHistory = createAsyncThunk(
  "vendorBalance",
  async ({ vendorId, token }) => {
    try {
      const response = await privateGet(
        `/payment/vendor/balance/${vendorId}`,
        token
      );
      return response.payload;
    } catch (err) {
      return { error: err.message };
    }
  }
);

const moneyDetailsSlice = createSlice({
  name: "vendorDetails",
  initialState: {
    status: "idle",
    error: null,
    balance: null,
  },

  extraReducers: (builder) => {
    builder.addCase(vendorBalanceHistory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(vendorBalanceHistory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.balance = action.payload;
    });
    builder.addCase(vendorBalanceHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export default moneyDetailsSlice.reducer;
