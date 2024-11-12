import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePatch } from "../../utils";

export const fetchPendingCompany = createAsyncThunk(
  "pending compaany",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/company/inactive", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const approveCompany = createAsyncThunk(
  "approve company",
  async ({ token, companyId }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(
        `/company/approve/${companyId}`,
        token,
        {}
      );
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const rejectCompany = createAsyncThunk(
  "reject company",
  async ({ token, companyId, data }, { rejectWithValue }) => {
    try {
      const response = await privatePatch(
        `/company/reject/${companyId}`,
        token,
        data
      );
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const companySlice = createSlice({
  name: "pending company",

  initialState: {
    isLoading: false,
    error: null,
    fail: false,
    success: false,
    approved: false,
    reject: false,
    pendingCompany: [],
    selectedPendingCompany: {},
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPendingCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPendingCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pendingCompany = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchPendingCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(approveCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(approveCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.approved = true;
    });
    builder.addCase(approveCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(rejectCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rejectCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.reject = true;
    });
    builder.addCase(rejectCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
  },
  reducers: {
    setClickedCategory: (state, { payload }) => {
      state.selectedPendingCompany = payload;
    },
    resetCompanyStatus: (state) => {
      state.success = false;
      state.fail = false;
      state.approved = false;
      state.reject = false;
    },
  },
});
export const { resetCompanyStatus } = companySlice.actions;
export default companySlice.reducer;
