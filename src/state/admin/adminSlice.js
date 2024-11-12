import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePatch, privatePut } from "../../utils";

// Your existing fetchAdminList async thunk
export const fetchAdminList = createAsyncThunk(
  "adminList/fetchList",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/admin/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchAdminDetails = createAsyncThunk(
  "adminList/fetchDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/admin/details/${id}`, token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// New deleteAdmin async thunk
export const deleteAdmin = createAsyncThunk(
  "adminList/deleteAdmin",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privatePut(`/admin/delete/${id}`, token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateAdmin = createAsyncThunk(
  "adminList/updateAdmin",
  async ({ id, data, token }, { rejectWithValue }) => {
  
    try {
      const response = await privatePatch(`/admin/update/${id}`, token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "reset pass",
  async ({ adminId, data, token }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(`/admin/reset/password/${adminId}`, token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const adminSignupSlice = createSlice({
  name: "adminList",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    adminFetch: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdminList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
      state.adminFetch = true;
    });
    builder.addCase(fetchAdminList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response?.data?.message;
      state.adminFetch = false;
    });

    // DETAILS

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
      state.error = action.payload.response?.data?.message;
      state.adminFetch = false;
    });

    // DELETE

    builder.addCase(deleteAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });

    // UPDATE

    builder.addCase(updateAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default adminSignupSlice.reducer;
