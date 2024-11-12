import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePut } from "../../utils";

export const fetchStoreList = createAsyncThunk(
  "store list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/luggage/store`, token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchStoreListByPartner = createAsyncThunk(
  "partner store list",
  async ({ token, providerId }, { rejectWithValue }) => {
    try {
      const response = await privateGet(
        `/luggage/store/provider/${providerId}`,
        token
      );
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateLuggageStatus = createAsyncThunk(
  "update luggage status",
  async (params, { rejectWithValue }) => {
    try {
      const response = await privatePut(
        `/luggage/store/status/${params.id}`,
        params.token,
        params.data
      );

      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const storeListSlice = createSlice({
  name: "store list",
  initialState: {
    isLoading: false,
    storeList: [],
    error: null,
    storeListGetSuccess: false,
    partnerStoreList: [],
    selectedVendor: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoreList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoreList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storeList = action.payload;
      state.error = null;
      state.storeListGetSuccess = true;
    });
    builder.addCase(fetchStoreList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.storeListGetSuccess = false;
      state.storeList = [];
    });
    builder.addCase(fetchStoreListByPartner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoreListByPartner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.partnerStoreList = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStoreListByPartner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.partnerStoreList = [];
    });
    builder.addCase(updateLuggageStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLuggageStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateLuggageStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
    });
  },
  reducers: {
    setClickedVendor: (state, { payload }) => {
      state.selectedVendor = payload;
    },
  },
});
export const { setClickedVendor } = storeListSlice.actions;
export default storeListSlice.reducer;
