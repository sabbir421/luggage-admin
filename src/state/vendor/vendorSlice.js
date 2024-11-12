import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateDelete, privateGet, privatePut, privatePost } from "../../utils";

export const fetchVendorRequest = createAsyncThunk(
  "fetchVendorRequest",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/user/vendor/pending/list", token);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveVendorRequst = createAsyncThunk(
  "approveVendor",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privatePut(`/user/vendor/approve/${id}`, token);
      return response.payload;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// show vendor bank informations by one's id
export const showVendorId = createAsyncThunk(
  "showVendorId",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/bank/account/${id}`, token);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// show vendor balance
export const showVendorBalance = createAsyncThunk(
  "showVendorBalance",
  async ({ vendorId, token }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/payment/vendor/balance/${vendorId}`, token);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// vendor make payment
export const vendorMakePayment = createAsyncThunk(
  "vendorMakePayment",
  async ({ vendorId, token, data}, { rejectWithValue }) => {
    try {
      const response = await privatePost(`/payment/vendor/${vendorId}`, token, data);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectVendorRequest = createAsyncThunk(
  "rejectVendorRequest",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privateDelete(`/user/vendor/reject/${id}`, token);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const vendorSlice = createSlice({
  name: "vendorRequestList",
  initialState: {
    isLoading: false,
    selectedVendor: null,
    data: null,
    bankInfo:{},
    error: null,
    fetchVendorRequest: false,
    vendorBalance: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVendorRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVendorRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchVendorRequest.rejected, (state, action) => {
      state.data = null;
      state.error = action.error?.message;
      state.isLoading = false;
    });

    // show vendor informations by id

    builder.addCase(showVendorId.pending, (state) => {
      state.isLoading = true;
      state.error = null; 
    });
  
    builder.addCase(showVendorId.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.error = null;
      state.bankInfo = action.payload;
    });
  
    builder.addCase(showVendorId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      state.bankInfo = {}; 
    });


    // show vendor balance 
    builder.addCase(showVendorBalance.pending, (state) => {
      state.isLoading = true;
      state.error = null; 
    });
  
    builder.addCase(showVendorBalance.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.error = null;
      state.vendorBalance = action.payload;
    });
  
    builder.addCase(showVendorBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      state.vendorBalance = null; 
    });
    

    // Reject vendor request

    builder.addCase(rejectVendorRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rejectVendorRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(rejectVendorRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    // vendor payment 

    
    builder.addCase(vendorMakePayment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(vendorMakePayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.vendorBalance = action.payload;
    });
    builder.addCase(vendorMakePayment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.rejected;
      state.vendorBalance = null
    });
  


    // approve vendor

    builder.addCase(approveVendorRequst.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(approveVendorRequst.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(approveVendorRequst.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });
  },
  reducers: {
    setClickedVendor: (state, { payload }) => {
      state.selectedVendor = payload;
    },
  },
 
});

export const { setClickedVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
