import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet } from "../../utils";
export const fetchAdminDetails = createAsyncThunk(
  "admin/fetchDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/admin/details/${id}`, token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const singleAdmin = createSlice({
  name: "singleAdmin",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    adminFetch: false,
    selectedAdmin: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdminDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
      state.adminFetch = true;
    });
    builder.addCase(fetchAdminDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
      state.adminFetch = false;
    });
  },

  reducers: {
    setClickedAdmin: (state, { payload }) => {
      state.selectedAdmin = payload;
    },
    clearSetSelectedProject: (state) => {
      state.selectedAdmin = null;
    },
  },
});
export const { setClickedAdmin, clearSetSelectedAdmin } = singleAdmin.actions;
export default singleAdmin.reducer;
