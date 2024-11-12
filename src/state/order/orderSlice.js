import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet } from "../../utils";

export const fetchOrder = createAsyncThunk(
  "order list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/luggage/store/booking/list`, token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const orderSlice = createSlice({
  name: "order list",
  initialState: {
    isLoading: false,
    orders: null,
    error: null,
    orderGetSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
      state.orderGetSuccess = true;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.orderGetSuccess = false;
      state.orders = [];
    });
  },
  //   reducers: {
  //     signupData: (state, { payload }) => {
  //       state.signupData = payload;
  //     },
  //     clearSignupData: (state) => {
  //       state.signupData = null;
  //     },
  //   },
});
// export const { signupData, clearSignupData } = otpSlice.actions;
export default orderSlice.reducer;
