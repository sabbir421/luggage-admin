import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formDataPost, privateGet, privatePost } from "../../utils";

export const addCategory = createAsyncThunk(
  "add category",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/category/create", token, data);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addSubCategory = createAsyncThunk(
  "add sub category",
  async ({ data, token }, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await formDataPost(
        "/category/sub-category",
        data,
        token
      );
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category list",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/category/list", token);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSubCategory = createAsyncThunk(
  "sub category list",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await privateGet(
        `/category/sub-category/list/${id}`,
        token
      );

      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",

  initialState: {
    isLoading: false,
    error: null,
    fail: false,
    success: false,
    categoryList: [],
    selectedCategory: {},
    subCategoryList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(addSubCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSubCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });

    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
    builder.addCase(getSubCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subCategoryList = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.subCategoryList = [];
      state.error = action?.payload?.response?.data?.message;
      state.fail = true;
      state.success = false;
    });
  },
  reducers: {
    setClickedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});

export default categorySlice.reducer;
export const { setClickedCategory } = categorySlice.actions;
