/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePatch, privatePost } from "../../utils";


export const createStorePrice = createAsyncThunk(
  "store store_price",
  async ({ token, createStorePriceInfo }, { rejectWithValue }) => {
    try {
      const response = await privatePost(
        "/store/price/add",
        token,
        createStorePriceInfo
      );
      return response.payload.admin;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// end of ===>
export const storePriceList = createAsyncThunk(
  "store store_price_list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/store/price/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// ===>
export const priceListUpdate = createAsyncThunk(
  "Update Price List",
  async ({ id, token, data }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await privatePatch(
        `/store/price/update/${id}`,
        token,
        data
      );
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createStorePriceSlice = createSlice({
  name: "createStorePrice",
  initialState: {
    isLoading: false,
    data: null,
    errorMessage: false,
    successMessage: false,
    priceList: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(createStorePrice.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createStorePrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = true;
      state.errorMessage = false;
    });

    builder.addCase(createStorePrice.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = true;
      state.successMessage = false;
    });
    builder.addCase(storePriceList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(storePriceList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.priceList = action.payload;
      state.error = null;
    });

    builder.addCase(storePriceList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // ===

    builder.addCase(priceListUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(priceListUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(priceListUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = false;
      state.errorMessage = false;
    },
  },
});

export default createStorePriceSlice.reducer;
export const { messageClear } = createStorePriceSlice.actions;
