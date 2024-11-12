import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePatch, privatePost, privatePut } from "../../utils";

export const addFacility = createAsyncThunk(
  "Add luggage facility",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/luggage/facility", token, data);

      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const facilityStatusChange = createAsyncThunk(
  "change facility status",
  async ({id, token, status }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(`/luggage/facility/status/${id}`, token, status);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const facilityUpdate = createAsyncThunk(
  "Update facility",
  async ({id, token, facility }, { rejectWithValue }) => {
   
    try {
      const response = await privatePut(`/luggage/facility/${id}`, token, facility);

      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getFacility = createAsyncThunk(
  "get luggage facility",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await privateGet("/luggage/facility", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const luggageSlice = createSlice({
  name: "facility create",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    createSuccess: false,
    providerStoreList: null,
    selectedStore: null,
    luggageDetails: null,
    facilites: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addFacility.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFacility.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addFacility.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getFacility.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFacility.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createSuccess = true;
      state.error = null;
      state.facilites = action.payload;
    });
    builder.addCase(getFacility.rejected, (state, action) => {
      state.isLoading = false;
      state.createSuccess = false;
      state.error = action.payload;
    });
    builder.addCase(facilityStatusChange.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(facilityStatusChange.fulfilled, (state, ) => {
      state.isLoading = false;
    });
    builder.addCase(facilityStatusChange.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(facilityUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(facilityUpdate.fulfilled, (state, ) => {
      state.isLoading = false;
    });
    builder.addCase(facilityUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
  reducers: {
    setClickedStore: (state, { payload }) => {
      state.selectedStore = payload;
    },
    clearSetSelectedStore: (state) => {
      state.selectedStore = null;
    },
  },
});
export const { setClickedStore, clearSetSelectedStore } = luggageSlice.actions;
export default luggageSlice.reducer;
