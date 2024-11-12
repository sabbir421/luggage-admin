import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePatch, privatePost } from "../../utils";

export const addPromo = createAsyncThunk(
  "add promo",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/offer/promo", token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const bagDiscount = createAsyncThunk(
  "bag discount",
  async ({ data, token }, { rejectWithValue }) => {

    try {
      const response = await privatePost("/offer/bag", token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getPercentageDiscount = createAsyncThunk(
  "percentage discount list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/offer/percentage", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getBagDiscount = createAsyncThunk(
  "bag discount list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/offer/bag", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const changeBagOfferStatus = createAsyncThunk(
  "change bag discount status",
  async ({ token, id,status }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(`/offer/bag/status/${id}`, token,status);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const changePercentageOfferStatus = createAsyncThunk(
  "change percentage discount status",
  async ({ token, id,status }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(`/offer/percentage/status/${id}`, token,status);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getAllOferList = createAsyncThunk(
  "get offer list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/offer/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const changeOfferStatus = createAsyncThunk(
  "change offer status",
  async ({ token, id, data }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(`/offer/status/${id}`, token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const offerSlice = createSlice({
  name: "offer",

  initialState: {
    isLoading: false,
    error: null,
    fail: false,
    success: false,
    percentageDiscountList: [],
    bagDiscountList: [],
    offerList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(addPromo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPromo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addPromo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(bagDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(bagDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(bagDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(getPercentageDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPercentageDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.percentageDiscountList = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getPercentageDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(getBagDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBagDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bagDiscountList = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getBagDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(changeBagOfferStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeBagOfferStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(changeBagOfferStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(changePercentageOfferStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePercentageOfferStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(changePercentageOfferStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(getAllOferList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOferList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.offerList = action.payload;
    });
    builder.addCase(getAllOferList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(changeOfferStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeOfferStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(changeOfferStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload.response.data.message;
      state.fail = true;
      state.success = false;
    });
  },
});

export default offerSlice.reducer;
