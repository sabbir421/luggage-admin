import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePost } from "../../utils";

export const createCountry = createAsyncThunk(
  "Add country",
  async (params, { rejectWithValue }) => {
    try {
      const response = await privatePost(
        "/country/create",
        params.token,
        params.data
      );

      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCountry = createAsyncThunk(
  "Fetch country",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/country/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchCity = createAsyncThunk(
  "Fetch city",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/city/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const cityAndCountrySlice = createSlice({
  name: "country and city list",
  initialState: {
    isLoading: false,
    country: null,
    city: null,
    error: null,
    countryFetch: false,
    cityFetch: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.country = action.payload;
      state.error = null;
      state.countryFetch = true;
    });
    builder.addCase(fetchCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.countryFetch = false;
      state.country = [];
    });
    builder.addCase(fetchCity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.city = action.payload;
      state.error = null;
      state.cityFetch = true;
    });
    builder.addCase(fetchCity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.cityFetch = false;
      state.city = [];
    });
    builder.addCase(createCountry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCountry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default cityAndCountrySlice.reducer;
